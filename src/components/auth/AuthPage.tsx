import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleMode = () => setIsLogin(!isLogin);
  return <div className="min-h-screen flex items-center justify-between bg-cover bg-center bg-no-repeat relative" style={{
    backgroundImage: 'url(/lovable-uploads/20cd0b55-8167-4f6a-acfc-85fe6cab38a2.png)'
  }}>
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Logo positioned at top left */}
      <div className="absolute top-8 left-8 z-20">
        <img src="/lovable-uploads/d7e7b224-06ca-4c59-a5df-1699995031a9.png" alt="CloudMor Logo" className="h-20 w-auto" />
      </div>
      
      {/* Left side content */}
      <div className="flex-1 flex flex-col justify-center px-8 relative z-10 max-w-2xl rounded-2xl lg:px-[23px] py-0 mx-[20px] my-0">
        {/* Welcome Text */}
        <div className="mt-20">
          <h1 className="text-6xl mb-6 leading-tight text-[#183a85] font-bold lg:text-7xl text-left">
            Welcome to CloudMor Client Portal
          </h1>
          <p className="text-xl mb-8 leading-relaxed font-extrabold text-blue-900 mx-0 py-0 text-center lg:text-7xl">Welcome to  
CloudMor 
Client Portal </p>
        </div>
      </div>

      {/* Right side login form */}
      <div className="w-full max-w-md mx-auto lg:mx-8 relative z-10 p-4 lg:mr-16">
        {isLogin ? <LoginForm onToggleMode={toggleMode} /> : <SignUpForm onToggleMode={toggleMode} />}
      </div>
    </div>;
};