import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import './QRCodePage.css';
import Navbar from '../Navbar';

const QRCodePage = () => {
  const location = useLocation();
  const qrCode = location.state?.qrCode;

  if (!qrCode) {
    return <div>No QR code available</div>;
  }

  return (
    <div>
    <Navbar/>
    <div className="qr-code-container">
      <Card className="qr-code-card">
        <CardContent>
          <Typography variant="h5" component="h2" className="qr-code-title">
            Your Restaurant QR Code
          </Typography>
          <img src={qrCode} alt="Generated QR Code" className="qr-code-image" />
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default QRCodePage;
