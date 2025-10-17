import UserModel from '../Model/UserModel.js'
import bcrypt,{truncates} from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const Register = async (req,resp)=>{
    const {name,email,password}=req.body;

    if(!name,!email,!password){
        return resp.json({success:false,message:"missing:name,email or password"})
    }
    try {
        const ExitingUser=await UserModel.findOne({email})
        if(ExitingUser){
            return resp.json({success:false,message:"user already exitied"})
        }
        const hashpassword=await bcrypt.hash(password,10);
        const user=new UserModel({name,email,password:hashpassword})
        await user.save();

        const token=jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'7d'});
        resp.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:'None',
            maxAge:7*24*60*60*1000
        });
        return resp.json({success:true,message:"New user is created"})
    } catch (error) {
        resp.json({success:false,message:error.message})
    }
};

export const login = async (req,resp)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return resp.json({success:false,message:"enter email or password"})
    }
    try {
        const user= await UserModel.findOne({email});
        if(!user){
            return resp.json({success:false,message:"user not found"})
        }
        const Ismatch = await bcrypt.compare(password,user.password);
        if(!Ismatch){
            return resp.json({success:false,message:"Wrong password"});
        }
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'7d'});
        resp.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:'None',
            maxAge:7*24*60*60*1000
        });
        return resp.json({success:true,message:"logining successfully"})

    } catch (error) {
        resp.json({success:false,message:error.message})
    }
};

export const logout = async (req,resp)=>{
    try {
        resp.clearCookie('token',{
            httpOnly:true,
            secure:true,
            sameSite:true
        });
        resp.json({success:true,message:"logout"})

    } catch (error) {
        resp.json({success:false,message:error.message})
    }
}
