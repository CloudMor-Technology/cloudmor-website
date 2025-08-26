
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
        backgroundImage: 'url(/lovable-uploads/cf3a7359-194e-4af0-8d9b-fb91c73020fc.png)'
      }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Left side content */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 relative z-10">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/c4a02f46-a725-41de-865e-2a53e399e8a5.png" 
            alt="CloudMor Logo" 
            className="h-16 w-auto"
          />
        </div>
        
        {/* Welcome Text */}
        <div className="max-w-lg">
          <h1 className="text-5xl lg:text-6xl font-bold text-blue-600 mb-4 leading-tight">
            Welcome to CloudMor Client Portal
          </h1>
          <p className="text-xl text-blue-500 mb-8 leading-relaxed">
            Access Company info, services, billing, and support in one secure place
          </p>
        </div>
      </div>

      {/* Right side login form */}
      <div className="w-full max-w-md mx-auto lg:mx-8 relative z-10 p-4">
        {isLogin ? (
          <LoginForm onToggleMode={toggleMode} />
        ) : (
          <SignUpForm onToggleMode={toggleMode} />
        )}
      </div>
    </div>
  );
};
