import mongoose from "mongoose";

const CategorySchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    name:{type:String,required:true},
    type:{tpye:String,enum:['income','expanse'],required:true}
})
const categoryModel = new mongoose.model('category',CategorySchema);
export default categoryModel;