
import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div 
      className="min-h-screen flex items-center justify-between bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: 'url(/lovable-uploads/20cd0b55-8167-4f6a-acfc-85fe6cab38a2.png)'
      }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Logo positioned at top left */}
      <div className="absolute top-8 left-8 z-20">
        <img 
          src="/lovable-uploads/d7e7b224-06ca-4c59-a5df-1699995031a9.png" 
          alt="CloudMor Logo" 
          className="h-20 w-auto"
        />
      </div>
      
      {/* Left side content */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 relative z-10 max-w-2xl">
        {/* Welcome Text */}
        <div className="mt-20">
          <h1 className="text-6xl lg:text-7xl font-bold text-blue-600 mb-6 leading-tight">
            Welcome to CloudMor Client Portal
          </h1>
          <p className="text-xl lg:text-2xl text-blue-500 mb-8 leading-relaxed font-medium">
            Access Company info, services, billing, and support in one secure place
          </p>
        </div>
      </div>

      {/* Right side login form */}
      <div className="w-full max-w-md mx-auto lg:mx-8 relative z-10 p-4 lg:mr-16">
        {isLogin ? (
          <LoginForm onToggleMode={toggleMode} />
        ) : (
          <SignUpForm onToggleMode={toggleMode} />
        )}
      </div>
    </div>
  );
};
