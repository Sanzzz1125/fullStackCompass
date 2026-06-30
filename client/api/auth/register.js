const bcrypt=require('bcryptjs'),db=require('../lib/db'),User=require('../lib/models/User'),Progress=require('../lib/models/Progress'),{sign}=require('../lib/auth');
module.exports=async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    if(req.method==='OPTIONS')return res.status(200).end();
    if(req.method!=='POST')return res.status(405).end();
    try{
        await db();
        const{name,email,password}=req.body;
        if(!name||!email||!password)return res.status(400).json({error:'All fields required'});
        if(password.length<6)return res.status(400).json({error:'Password min 6 chars'});
        if(await User.findOne({email}))return res.status(409).json({error:'Email already registered'});
        const user=await User.create({name,email,password:await bcrypt.hash(password,12)});
        await Progress.create({userId:user._id});
        res.status(201).json({token:sign({id:user._id}),user:{id:user._id,name,email}});
    }catch(e){console.error(e);res.status(500).json({error:'Server error'});}
};
