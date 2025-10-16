import mongoose from "mongoose";

const TranscationSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true},
    name:{type:String},
    amount:{type:Number,required:true},
    type:{ type: String, enum: ['income','expense'], required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    date:{type:Date,default:Date.now}
})
const TransactionModel= new mongoose.model('transaction',TranscationSchema);
export default TransactionModel;