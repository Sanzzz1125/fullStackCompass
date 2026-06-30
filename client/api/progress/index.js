const db=require('../lib/db'),Progress=require('../lib/models/Progress'),{verify,extract}=require('../lib/auth');
module.exports=async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    if(req.method==='OPTIONS')return res.status(200).end();
    const d=verify(extract(req));
    if(!d)return res.status(401).json({error:'Unauthorized'});
    await db();
    if(req.method==='GET'){
        return res.json(await Progress.findOne({userId:d.id})||{});
    }
    if(req.method==='POST'){
        const{action,page,itemId,text,noteKey,noteText,timeSpent}=req.body;
        const upd={};
        if(action==='complete_page'&&page){upd.$addToSet={completedPages:page};upd.$inc={xp:10};}
        if(action==='uncomplete_page'&&page)upd.$pull={completedPages:page};
        if(action==='star'&&page&&itemId)upd.$push={starredItems:{page,id:itemId,text:text||'',createdAt:new Date()}};
        if(action==='unstar'&&itemId)upd.$pull={starredItems:{id:itemId}};
        if(action==='note'&&noteKey)upd.$set={[`notes.${noteKey}`]:noteText||''};
        if(timeSpent)upd.$inc={...(upd.$inc||{}),totalTime:timeSpent};
        const ex=await Progress.findOne({userId:d.id});
        if(ex?.lastVisit){const diff=Math.floor((new Date()-ex.lastVisit)/86400000);if(diff===1)upd.$inc={...(upd.$inc||{}),streakDays:1};else if(diff>1)upd.$set={...(upd.$set||{}),streakDays:0};}
        upd.$set={...(upd.$set||{}),lastVisit:new Date()};
        const p=await Progress.findOneAndUpdate({userId:d.id},upd,{new:true,upsert:true});
        if(p.xp>=p.level*100)await Progress.findOneAndUpdate({userId:d.id},{$inc:{level:1}});
        return res.json({success:true,progress:p});
    }
    res.status(405).end();
};
