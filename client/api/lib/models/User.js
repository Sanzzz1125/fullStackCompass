const m = require('mongoose');
const s = new m.Schema({ name:{type:String,required:true,trim:true}, email:{type:String,required:true,unique:true,lowercase:true}, password:{type:String,required:true}, role:{type:String,default:'user'} }, { timestamps:true });
module.exports = m.models.User || m.model('User', s);
