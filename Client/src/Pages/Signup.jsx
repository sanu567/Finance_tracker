import React, { useContext, useState } from 'react'
import { data, useNavigate } from 'react-router-dom';
import { Appcontent } from '../Context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate=useNavigate()
  const {backendUrl,setIsloggedin}=useContext(Appcontent);

  const [user, setUser] = useState(null);
  const [state,setState]=useState('signup');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  const onSubmithandler= async (e)=>{
    try {
      e.preventDefault();
      axios.defaults.withCredentials=true
      if(state==='signup'){
       const {data}= await axios.post(backendUrl+'/api/auth/register',{name,email,password})
       if(data.success){
        setUser(data.user || data);
        setIsloggedin(true)
        navigate('/')
       }
       else{
        toast.error(data.message)
       }
      }
      else{
          const {data}= await axios.post(backendUrl+'/api/auth/login',{email,password})
       if(data.success){
        setUser(data.user || data);
        setIsloggedin(true)
        navigate('/')
       }
       else{
        toast.error(data.message)
       }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <div className='bg-red-300 p-10 rounded-lg shadow-lg text-black w-full sm:w-96 sm:text-sm'>
     <h2 className='text-3xl font-semibold text-center mb-3'>{state=='signup'?'create your account':'login your account'}</h2>
     <p  className=' font-semibold text-center mb-6'>{state=='signup'?'create your account':'login your account'}</p>

     <form onSubmit={onSubmithandler}>
      {state=='signup' &&
       <div className='flex items-center mb-4 gap-3 px-5 py-2.5 rounded-full w-full bg-[#645]'>
        <input type="text" placeholder='Enter your name'value={name}
        className='bg-transparent outline-none' 
         onChange={e=>setName(e.target.value)}/>
      </div>
      }
  
       <div className='flex items-center mb-4 gap-3 px-5 py-2.5 rounded-full  w-full bg-[#645]'>
        <input type="text" placeholder='Enter your email'value={email}
        className='bg-transparent outline-none' 
        onChange={e=>setEmail(e.target.value)}/>
      </div>

       <div className='flex items-center mb-4 gap-3 px-5 py-2.5 rounded-full w-full bg-[#645]'>
        <input type="password" placeholder='Enter your password' value={password}
        className='bg-transparent outline-none' 
        onChange={e=>setPassword(e.target.value)}/>
      </div>

      <button className='w-full bg-orange-300 rounded-full
       px-2 py-1.5 mt-4 text-black font-medium'>{state}</button>
       {state=='signup'? ( <p className='m-3 text-red-800 '>Already have account ?
        <span onClick={()=>setState('login')} className='text-blue-600 font-medium cursor-pointer underline'>Login</span>
       </p>):
       <p className='m-3 text-red-800 '>Register here-<span  onClick={()=>setState('signup')}
        className='text-blue-600 font-medium cursor-pointer underline'>Signup</span></p>
       }
      
     </form>
     </div>
    </div>
  )
}

export default Signup
