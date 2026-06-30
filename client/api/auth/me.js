const db=require('../lib/db'),User=require('../lib/models/User'),{verify,extract}=require('../lib/auth');
module.exports=async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Methods','GET,OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    if(req.method==='OPTIONS')return res.status(200).end();
    try{
        const d=verify(extract(req));
        if(!d)return res.status(401).json({error:'Unauthorized'});
        await db();
        const user=await User.findById(d.id).select('-password');
        if(!user)return res.status(404).json({error:'Not found'});
        res.json({user:{id:user._id,name:user.name,email:user.email}});
    }catch(e){res.status(500).json({error:'Server error'});}
};
