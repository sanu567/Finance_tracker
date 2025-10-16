import Transaction from '../Model/Transcation.js'

export const createtranction = async (req,resp)=>{
    const {name,amount,type,category,date}=req.body;
    if(!amount||!type){
        return resp.json({success:false,message:"missing requried field"})
    }
    try {
        const t = new Transaction({
            user:req.user,
            name,
            amount,
            type,
            category,
            date:date?new Date(date):new Date()
        })
        await t.save()
        const populated = await Transaction.findById(t._id).populate('category')
        return resp.json({populated,success:true,message:"list created"})
    } catch (error) {
        return resp.json({success:false,message:error.message})
    }
}

export const gettranction = async (req,resp)=>{
    try {
        const t= await Transaction.find({user:req.user._id}).populate('category').sort({ date: -1 }); 
        if(!t){
            return resp.json({success:false,message:'not found'});
        }
      
        return resp.json({t,success:true,message:'get the transaction'});
        
    } catch (error) {
        return resp.json({success:false,message:error.message})
    }
}

export const deleteTransaction = async (req,resp)=>{
   try {
     const t= await Transaction.findOneAndDelete({_id: req.params.id,user:req.user._id});
    if(!t){
        return resp.json({success:false,message:"not found"});
    }
    return resp.json({t,success:true,message:"deleted"});
    
   } catch (error) {
    return resp.json({success:false,message:error.message})
   }
}