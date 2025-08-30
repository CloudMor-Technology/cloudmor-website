import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleMode = () => setIsLogin(!isLogin);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative" style={{
      backgroundImage: 'url(/lovable-uploads/20cd0b55-8167-4f6a-acfc-85fe6cab38a2.png)'
    }}>
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Logo positioned at top left */}
      <div className="absolute top-8 left-8 z-20">
        <img src="/lovable-uploads/d7e7b224-06ca-4c59-a5df-1699995031a9.png" alt="CloudMor Logo" className="h-20 w-auto" />
      </div>
      
      {/* Centered content container */}
      <div className="flex flex-col items-center relative z-10 max-w-2xl mx-auto px-8 space-y-8">
        {/* Welcome Text - Top */}
        <div className="text-center">
          <h1 className="text-7xl mb-8 leading-tight text-[#183a85] font-bold lg:text-8xl">
            Welcome to CloudMor Client Portal
          </h1>
        </div>

        {/* Login form - Center */}
        <div className="w-full max-w-lg">
          {isLogin ? <LoginForm onToggleMode={toggleMode} /> : <SignUpForm onToggleMode={toggleMode} />}
        </div>

        {/* Description Text - Bottom */}
        <div className="text-center">
          <p className="text-2xl leading-relaxed text-[#397ee6] font-semibold lg:text-3xl">
            Access Company info, services, billing, and support in one secure place
          </p>
        </div>
      </div>
    </div>
  );
};