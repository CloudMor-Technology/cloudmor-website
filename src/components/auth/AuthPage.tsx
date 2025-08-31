import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export const AuthPage = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat relative" style={{
      backgroundImage: 'url(/lovable-uploads/20cd0b55-8167-4f6a-acfc-85fe6cab38a2.png)'
    }}>
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Logo positioned at center top */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <img src="/lovable-uploads/d7e7b224-06ca-4c59-a5df-1699995031a9.png" alt="CloudMor Logo" className="h-20 w-auto" />
      </div>
      
      {/* Centered content container */}
      <div className="flex flex-col items-center relative z-10 max-w-2xl mx-auto px-8 space-y-8">
        {/* Welcome Text - Top */}
        <div className="text-center">
          <h1 className="text-5xl mb-8 leading-tight text-[#183a85] font-bold lg:text-6xl">
            Welcome to CloudMor Client Portal
          </h1>
        </div>

        {/* Login form - Center */}
        <div className="w-full max-w-lg">
          {showForgotPassword ? (
            <ForgotPasswordForm onBackToLogin={() => setShowForgotPassword(false)} />
          ) : (
            <LoginForm onForgotPassword={() => setShowForgotPassword(true)} />
          )}
        </div>

        {/* Description Text - Bottom */}
        <div className="text-center">
          <p className="text-2xl leading-relaxed text-orange-500 font-semibold lg:text-3xl">
            Access Company info, services, billing, and support in one secure place
          </p>
        </div>
      </div>
    </div>
  );
};