module.exports=async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    if(req.method==='OPTIONS')return res.status(200).end();
    if(req.method!=='POST')return res.status(405).end();
    const{messages,pageContext,section}=req.body;
    if(!messages?.length)return res.status(400).json({error:'messages required'});
    const sys=`You are an expert MERN stack teaching assistant for FullStack Compass.\nCurrent page: ${pageContext||'General'}${section?`\nSection: ${section}`:''}\nBe concise, use markdown with fenced code blocks, explain WHY not just HOW.`;
    try{
        const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,{
            method:'POST',headers:{'Content-Type':'application/json'},
            body:JSON.stringify({systemInstruction:{parts:[{text:sys}]},contents:messages.map(m=>({role:m.role==='assistant'?'model':'user',parts:[{text:m.content}]})),generationConfig:{temperature:0.7,maxOutputTokens:1200}})
        });
        const data=await r.json();
        if(!r.ok)return res.status(502).json({error:data.error?.message||'Gemini error'});
        const reply=data.candidates?.[0]?.content?.parts?.[0]?.text;
        if(!reply)return res.status(502).json({error:'Empty response'});
        res.json({reply});
    }catch(e){res.status(500).json({error:'Chat unavailable'});}
};
