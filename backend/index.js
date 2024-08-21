const port=4000;
const express = require('express');
const app =express();
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const multer=require('multer');
const path= require('path');
const cors = require('cors');
const { error, log } = require('console');
const { type } = require('os');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://Bharath:Bkreddy0415*@cluster0.7ryctm9.mongodb.net/e-commerce');

//api creation

app.get("/",(req,res)=>{
    res.send("welcome to e-commerce");
})

//image storage engine

const storage = multer.diskStorage({
    destination: './Upload/images',
    filename: (req, file, cb)=> {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }

})

const upload = multer({ storage: storage });
app.use('/images', express.static('Upload/images'))
//creating upload endpoint for images
app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })

})

// schema for creating products

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
        },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})

app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0){
        id=products[products.length-1].id+1;
    }
    else{
        id=1;
        }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    })
    console.log(product);
    await product.save();
    res.json({
        success:true,
        name:req.body.name,
    });
})

// creating api for deleting products

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({
        id:req.body.id
    });
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

// creating api to get all products

app.get('/allproducts',async (req,res)=>{
    let products=await Product.find({});
    console.log("all products fetched")
    res.send(products);
})

// Schema for creeating user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
        required:true
        },
    email:{
        type:String,
        required:true,
        unique:true,
        },
    password:{
        type:String,
        required:true
        },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
       
})

// Creating endpoint for registering the user
app.post('/signup',async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,error:"Existing User Found With Same Email"})
        }
        let cart={};
        for (let i=0;i<300;i++){
            cart[i]=0;
        }
        const user = new Users({
            name:req.body.username,
            email:req.body.email,
            password:req.body.password,
            cartData:cart,
        })
        try{
            await user.save();
        }
        catch(err){
            return res.status(400).json({success:false,error:err})
            }
        
        const data={
            user:{
                id:user.id
            }
        }

        const token= jwt.sign(data,'secret_ecom');
        res.json({success:true,message:"User Registered Successfully",token:token})
})

// Creating endpoint for user login
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
                }
                const token= jwt.sign(data,'secret_ecom');
                res.json({success:true,message:"User Logged In Successfully",token})
            }
            else{
                return res.status(400).json({success:false,error:"Invalid Password"})
                }

    }
    else{
         res.json({success:false,error:"User Not Found"})
    }
})

app.get('/newcollection',async (req,res)=>{
    let products =await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    res.send(newcollection);
})

app.get('/popularinwomen',async (req,res)=>{
    let products =await Product.find({category:'women'});
    let popularinwomen=products.slice(0,4);
    res.send(popularinwomen);
})

// creating a middleware to fetch user

const fetchUser = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){ 
         res.status(401).send({success:false,error:"Access Denied"})
}
else{
    try{
        const decoded = jwt.verify(token,'secret_ecom');
        req.user = decoded.user;
        next();
    }
    catch(ex){
        res.status(401).send({success:false,error:"Invalid Token"})
}
}
}

app.post('/addtocart',fetchUser,async (req,res)=>{
    let userData = await Users.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send({success:true})
})

//creating end point to remove product from cart
app.post('/removefromcart',fetchUser,async (req,res)=>{
    let userData = await Users.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId]>0)
        userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send({success:true})
})


// Creating endpoint to get cartdata

app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("getcart");
    let userData= await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

app.listen(port,(error)=>{
    if(!error){
        console.log(`server is running on port ${port}`)
    }
    else{
        console.log(error);
    }
})