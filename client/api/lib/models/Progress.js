const m = require('mongoose');
const s = new m.Schema({
    userId:          { type:m.Schema.Types.ObjectId, ref:'User', unique:true },
    completedPages:  { type:[String], default:[] },
    starredItems:    { type:[Object], default:[] },  // {page, type, id, text, createdAt}
    notes:           { type:Map, of:String, default:{} }, // key: page_section
    xp:              { type:Number, default:0 },
    level:           { type:Number, default:1 },
    streakDays:      { type:Number, default:0 },
    lastVisit:       { type:Date, default:null },
}, { timestamps:true });
module.exports = m.models.Progress || m.model('Progress', s);
