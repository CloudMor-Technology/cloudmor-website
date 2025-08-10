
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, Download, Phone, Mail, Globe, User } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'qrcode';

interface EmployeeData {
  photo: string;
  fullName: string;
  jobTitle: string;
  businessPhone: string;
  directPhone: string;
  email: string;
  website: string;
}

const BusinessCards = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [employeeData, setEmployeeData] = useState<EmployeeData>({
    photo: '',
    fullName: '',
    jobTitle: '',
    businessPhone: '',
    directPhone: '',
    email: '',
    website: 'cloudmor.com'
  });
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'arahimi@cloudmor.com' && loginData.password === 'Xeryus!2016') {
      setIsAuthenticated(true);
      toast.success('Login successful!');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const generateVCard = (data: EmployeeData) => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${data.fullName}
ORG:CloudMor
TITLE:${data.jobTitle}
TEL;TYPE=WORK:${data.businessPhone}
TEL;TYPE=CELL:${data.directPhone}
EMAIL:${data.email}
URL:https://${data.website}
END:VCARD`;
  };

  const generateQRCode = async (data: EmployeeData) => {
    if (!data.fullName) return;
    
    try {
      const vCard = generateVCard(data);
      const qrUrl = await QRCode.toDataURL(vCard, {
        width: 200,
        margin: 1,
        color: {
          dark: '#003366',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setEmployeeData(prev => ({ ...prev, photo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof EmployeeData, value: string) => {
    const newData = { ...employeeData, [field]: value };
    setEmployeeData(newData);
    generateQRCode(newData);
  };

  const drawBusinessCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (3.5" x 2" at 300 DPI)
    canvas.width = 1050;
    canvas.height = 600;

    // Clear canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw geometric shapes in corners
    ctx.fillStyle = '#3498db';
    
    // Top left corner shape
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(150, 0);
    ctx.lineTo(0, 100);
    ctx.closePath();
    ctx.fill();

    // Top right corner shape
    ctx.beginPath();
    ctx.moveTo(canvas.width, 0);
    ctx.lineTo(canvas.width - 150, 0);
    ctx.lineTo(canvas.width, 100);
    ctx.closePath();
    ctx.fill();

    // Bottom left corner shape
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    ctx.lineTo(150, canvas.height);
    ctx.lineTo(0, canvas.height - 100);
    ctx.closePath();
    ctx.fill();

    // Bottom right corner shape
    ctx.beginPath();
    ctx.moveTo(canvas.width, canvas.height);
    ctx.lineTo(canvas.width - 150, canvas.height);
    ctx.lineTo(canvas.width, canvas.height - 100);
    ctx.closePath();
    ctx.fill();

    // Draw CloudMor logo text
    ctx.fillStyle = '#3498db';
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CloudMor', canvas.width / 2, 60);

    // Draw employee photo (circular)
    if (employeeData.photo) {
      const img = new Image();
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvas.width / 2, 180, 60, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, canvas.width / 2 - 60, 120, 120, 120);
        ctx.restore();
        
        // Draw photo border
        ctx.strokeStyle = '#3498db';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, 180, 60, 0, 2 * Math.PI);
        ctx.stroke();
      };
      img.src = employeeData.photo;
    }

    // Draw employee name
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(employeeData.fullName, canvas.width / 2, 290);

    // Draw job title
    ctx.fillStyle = '#666666';
    ctx.font = '20px Arial, sans-serif';
    ctx.fillText(employeeData.jobTitle, canvas.width / 2, 320);

    // Draw contact information
    ctx.fillStyle = '#000000';
    ctx.font = '18px Arial, sans-serif';
    ctx.textAlign = 'left';
    
    const contactY = 380;
    const lineHeight = 30;
    
    if (employeeData.businessPhone) {
      ctx.fillText(`📞 ${employeeData.businessPhone}`, 180, contactY);
    }
    if (employeeData.email) {
      ctx.fillText(`✉️ ${employeeData.email}`, 180, contactY + lineHeight);
    }
    if (employeeData.website) {
      ctx.fillText(`🌐 www.${employeeData.website}`, 180, contactY + lineHeight * 2);
    }

    // Draw QR code
    if (qrCodeUrl) {
      const qrImg = new Image();
      qrImg.onload = () => {
        ctx.drawImage(qrImg, canvas.width - 180, contactY - 20, 120, 120);
        
        // Draw "SCAN ME" text
        ctx.fillStyle = '#3498db';
        ctx.font = 'bold 14px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SCAN ME', canvas.width - 120, contactY + 130);
      };
      qrImg.src = qrCodeUrl;
    }
  };

  React.useEffect(() => {
    drawBusinessCard();
  }, [employeeData, qrCodeUrl]);

  const downloadBusinessCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${employeeData.fullName || 'business-card'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-gowith-dark-blue">CloudMor Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="email"
                  value={loginData.username}
                  onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-gowith-dark-blue hover:bg-gowith-medium-blue">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gowith-dark-blue mb-2">CloudMor Business Card Generator</h1>
          <p className="text-gray-600">Create professional digital business cards with QR codes</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Employee Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Photo Upload */}
              <div>
                <Label htmlFor="photo">Employee Photo</Label>
                <div className="mt-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                  {employeeData.photo && (
                    <div className="mt-4 flex justify-center">
                      <img
                        src={employeeData.photo}
                        alt="Preview"
                        className="w-24 h-24 rounded-full object-cover border-2 border-gowith-medium-blue"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={employeeData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter full name"
                />
              </div>

              {/* Job Title */}
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={employeeData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  placeholder="Enter job title"
                />
              </div>

              {/* Business Phone */}
              <div>
                <Label htmlFor="businessPhone">Business Phone</Label>
                <Input
                  id="businessPhone"
                  value={employeeData.businessPhone}
                  onChange={(e) => handleInputChange('businessPhone', e.target.value)}
                  placeholder="(949) 288-5312"
                />
              </div>

              {/* Direct Phone */}
              <div>
                <Label htmlFor="directPhone">Direct Phone</Label>
                <Input
                  id="directPhone"
                  value={employeeData.directPhone}
                  onChange={(e) => handleInputChange('directPhone', e.target.value)}
                  placeholder="Enter direct phone"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={employeeData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="email@cloudmor.com"
                />
              </div>

              {/* Website (pre-filled) */}
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={employeeData.website}
                  readOnly
                  className="bg-gray-100"
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Card Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Business Card Preview</span>
                <Button
                  onClick={downloadBusinessCard}
                  className="bg-gowith-dark-blue hover:bg-gowith-medium-blue"
                  disabled={!employeeData.fullName}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  className="border border-gray-300 max-w-full h-auto"
                  style={{ width: '525px', height: '300px' }}
                />
              </div>
              {qrCodeUrl && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">QR Code for Contact Import:</p>
                  <img src={qrCodeUrl} alt="QR Code" className="mx-auto w-32 h-32" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BusinessCards;
