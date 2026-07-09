import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, RefreshCcw, Check } from 'lucide-react';
import { Modal } from './Modal';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Image: string) => void;
}

export function CameraModal({ isOpen, onClose, onCapture }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      setError(null);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      setError('Could not access camera. Please check permissions.');
    }
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      setCapturedImage(null);
    }
    
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen, facingMode]);

  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        setCapturedImage(canvas.toDataURL('image/webp', 0.8));
      }
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Capture Photo" maxWidth="500px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {error ? (
          <div style={{ padding: 20, textAlign: 'center', color: '#e10600', background: 'rgba(225,6,0,0.1)', borderRadius: 12 }}>
            <p>{error}</p>
          </div>
        ) : (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4/3',
              background: '#000',
              borderRadius: 16,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {capturedImage ? (
              <img src={capturedImage} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
              />
            )}

            {!capturedImage && (
              <button
                onClick={toggleCamera}
                className="btn-ghost"
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 36,
                  height: 36,
                  padding: 0,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <RefreshCcw size={18} color="#fff" />
              </button>
            )}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
          {capturedImage ? (
            <>
              <button onClick={handleRetake} className="btn-ghost" style={{ flex: 1, padding: '12px' }}>
                <RefreshCcw size={16} style={{ marginRight: 8 }} /> Retake
              </button>
              <button onClick={handleConfirm} className="btn-primary" style={{ flex: 1, padding: '12px', background: '#22c55e' }}>
                <Check size={16} style={{ marginRight: 8 }} /> Use Photo
              </button>
            </>
          ) : (
            <button
              onClick={takePhoto}
              disabled={!!error}
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'transparent',
                border: '4px solid #fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: error ? 'not-allowed' : 'pointer',
                opacity: error ? 0.5 : 1,
              }}
            >
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#e10600', transition: 'all 0.2s' }} />
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}
