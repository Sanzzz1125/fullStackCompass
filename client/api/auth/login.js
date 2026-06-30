const bcrypt=require('bcryptjs'),db=require('../lib/db'),User=require('../lib/models/User'),{sign}=require('../lib/auth');
module.exports=async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    if(req.method==='OPTIONS')return res.status(200).end();
    if(req.method!=='POST')return res.status(405).end();
    try{
        await db();
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user||!await bcrypt.compare(password,user.password))return res.status(401).json({error:'Invalid credentials'});
        res.json({token:sign({id:user._id}),user:{id:user._id,name:user.name,email}});
    }catch(e){res.status(500).json({error:'Server error'});}
};
