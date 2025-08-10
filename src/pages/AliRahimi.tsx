
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import QRCode from 'qrcode';

const AliRahimi = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrCodeUrl, setQrCodeUrl] = React.useState('');

  const ceoData = {
    photo: '/lovable-uploads/691e7939-254c-4028-91c9-7c00fd9a8db8.png', // CEO headshot
    fullName: 'Ali Rahimi',
    jobTitle: 'FOUNDER/CEO',
    businessPhone: '(949) 288-5312',
    directPhone: '(949) 288-5312',
    email: 'arahimi@cloudmor.com',
    website: 'cloudmor.com'
  };

  const generateVCard = () => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${ceoData.fullName}
ORG:CloudMor
TITLE:${ceoData.jobTitle}
TEL;TYPE=WORK:${ceoData.businessPhone}
TEL;TYPE=CELL:${ceoData.directPhone}
EMAIL:${ceoData.email}
URL:https://${ceoData.website}
END:VCARD`;
  };

  const generateQRCode = async () => {
    try {
      const vCard = generateVCard();
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
    img.src = ceoData.photo;

    // Draw employee name
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(ceoData.fullName, canvas.width / 2, 290);

    // Draw job title
    ctx.fillStyle = '#666666';
    ctx.font = '20px Arial, sans-serif';
    ctx.fillText(ceoData.jobTitle, canvas.width / 2, 320);

    // Draw contact information
    ctx.fillStyle = '#000000';
    ctx.font = '18px Arial, sans-serif';
    ctx.textAlign = 'left';
    
    const contactY = 380;
    const lineHeight = 30;
    
    ctx.fillText(`📞 ${ceoData.businessPhone}`, 180, contactY);
    ctx.fillText(`✉️ ${ceoData.email}`, 180, contactY + lineHeight);
    ctx.fillText(`🌐 www.${ceoData.website}`, 180, contactY + lineHeight * 2);

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

  const downloadBusinessCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${ceoData.fullName}-business-card.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  useEffect(() => {
    generateQRCode();
  }, []);

  useEffect(() => {
    if (qrCodeUrl) {
      drawBusinessCard();
    }
  }, [qrCodeUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gowith-dark-blue mb-2">CloudMor Digital Business Card</h1>
            <p className="text-xl text-gray-600">{ceoData.fullName} - {ceoData.jobTitle}</p>
          </div>
        </div>
      </div>

      {/* Business Card Display */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mb-8">
            <canvas
              ref={canvasRef}
              className="mx-auto border border-gray-200 rounded-lg shadow-lg"
              style={{ width: '525px', height: '300px', maxWidth: '100%' }}
            />
          </div>

          <div className="space-y-6">
            <Button
              onClick={downloadBusinessCard}
              className="bg-gowith-dark-blue hover:bg-gowith-medium-blue text-white px-8 py-3 text-lg"
              size="lg"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Business Card
            </Button>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="text-left space-y-4">
                <h3 className="text-xl font-semibold text-gowith-dark-blue mb-4">Contact Information</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📞</span>
                    <span>{ceoData.businessPhone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✉️</span>
                    <span>{ceoData.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌐</span>
                    <span>www.{ceoData.website}</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold text-gowith-dark-blue mb-4">Scan to Add Contact</h3>
                {qrCodeUrl && (
                  <div className="inline-block p-4 bg-white rounded-lg shadow-md">
                    <img src={qrCodeUrl} alt="QR Code" className="w-40 h-40 mx-auto" />
                    <p className="text-sm text-gowith-medium-blue font-semibold mt-2">SCAN ME</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gowith-dark-blue text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">CloudMor</h2>
          <p className="text-gowith-light-blue">Enterprise-level technology and security solutions</p>
        </div>
      </div>
    </div>
  );
};

export default AliRahimi;
