import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative" style={{
      backgroundImage: 'url(/lovable-uploads/20cd0b55-8167-4f6a-acfc-85fe6cab38a2.png)'
    }}>
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Logo positioned at top left */}
      <div className="absolute top-8 left-8 z-20">
        <img src="/lovable-uploads/d7e7b224-06ca-4c59-a5df-1699995031a9.png" alt="CloudMor Logo" className="h-20 w-auto" />
      </div>
      
      {/* Centered content container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
        <div className="flex items-center justify-center gap-12 lg:gap-16">
          
          {/* Left side - Welcome Content */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl mb-6 leading-tight text-[#183a85] font-bold">
              Welcome to CloudMor Client Portal
            </h1>
            <p className="text-xl lg:text-2xl mb-8 leading-relaxed text-[#397ee6] font-semibold">
              Access Company info, services, billing, and support in one secure place
            </p>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full max-w-md flex-shrink-0">
            {isLogin ? <LoginForm onToggleMode={toggleMode} /> : <SignUpForm onToggleMode={toggleMode} />}
          </div>
          
        </div>
      </div>
    </div>
  );
};