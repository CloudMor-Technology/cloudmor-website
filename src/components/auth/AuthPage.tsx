import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleMode = () => setIsLogin(!isLogin);
  return <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative" style={{
    backgroundImage: 'url(/lovable-uploads/20cd0b55-8167-4f6a-acfc-85fe6cab38a2.png)'
  }}>
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Logo positioned at top left */}
      <div className="absolute top-8 left-8 z-20">
        <img src="/lovable-uploads/d7e7b224-06ca-4c59-a5df-1699995031a9.png" alt="CloudMor Logo" className="h-20 w-auto" />
      </div>
      
      {/* Centered login form */}
      <div className="w-full max-w-lg mx-auto relative z-10 p-8">
        {isLogin ? <LoginForm onToggleMode={toggleMode} /> : <SignUpForm onToggleMode={toggleMode} />}
      </div>
    </div>;
};