import jwt from 'jsonwebtoken';
import userModel from '../Model/UserModel.js';

const UserAuth = async (req,resp,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return resp.json({success:false,message:"Not Authorizes,login again"});
        }
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded?.id){
         return resp.json({success:false,message:"Not Authorizes,login again"})
        }
        const user = await userModel.findById(decoded.id);
        if(!user){
            return resp.json({success:false,message:"user not found,login again"})
        }
        req.user=user;
        next();
    } catch (error) {
        return resp.json({success:false,message:error.message})
    }
}
export default UserAuth;