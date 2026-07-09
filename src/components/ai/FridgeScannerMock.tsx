import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Sparkles, Loader2, Scan } from 'lucide-react';
import { CameraModal } from '../ui/CameraModal';
import { AIRecipeGenerator } from './AIRecipeGenerator';

export function FridgeScannerMock() {
  const [image, setImage] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [ingredientsFound, setIngredientsFound] = useState<string[]>([]);
  const [showGenerator, setShowGenerator] = useState(false);

  const handleCapture = (base64: string) => {
    setImage(base64);
    simulateScan();
  };

  const simulateScan = () => {
    setScanning(true);
    setShowGenerator(false);
    setIngredientsFound([]);
    
    // Simulate AI vision processing time
    setTimeout(() => {
      setScanning(false);
      setIngredientsFound(['Tomato', 'Onion', 'Eggs', 'Cheese', 'Bell Pepper']);
    }, 2000);
  };

  return (
    <div style={{ background: 'var(--bg-secondary)', borderRadius: 16, padding: 24, border: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(225,6,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Scan size={24} color="#e10600" />
        </div>
        <div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 18, textTransform: 'uppercase' }}>
            Fridge <span style={{ color: '#e10600' }}>Scanner</span>
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Snap a photo of your ingredients and AI will build a recipe.</p>
        </div>
      </div>

      {!image ? (
        <div style={{ display: 'flex', gap: 16 }}>
          <button
            onClick={() => setCameraOpen(true)}
            className="glass-card"
            style={{ flex: 1, height: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}
          >
            <Camera size={28} color="#e10600" />
            <span style={{ fontSize: 14, fontWeight: 600 }}>Open Camera</span>
          </button>
          
          <button
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => handleCapture(reader.result as string);
                  reader.readAsDataURL(file);
                }
              };
              input.click();
            }}
            className="glass-card"
            style={{ flex: 1, height: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}
          >
            <Upload size={28} color="var(--text-secondary)" />
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Upload Photo</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 150, height: 150, borderRadius: 12, overflow: 'hidden', border: '2px solid var(--border-color)', flexShrink: 0, position: 'relative' }}>
              <img src={image} alt="Scanned" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {scanning && (
                <motion.div
                  initial={{ top: 0 }}
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  style={{ position: 'absolute', left: 0, right: 0, height: 2, background: '#e10600', boxShadow: '0 0 10px #e10600' }}
                />
              )}
            </div>
            
            <div style={{ flex: 1 }}>
              {scanning ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--text-secondary)' }}>
                  <Loader2 size={16} className="spin" />
                  <span style={{ fontSize: 14 }}>Analyzing image...</span>
                </div>
              ) : (
                <div>
                  <h4 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: 8 }}>Found Ingredients</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {ingredientsFound.map(ing => (
                      <span key={ing} style={{ fontSize: 12, padding: '4px 10px', background: 'rgba(225,6,0,0.1)', color: '#e10600', borderRadius: 12, fontWeight: 600 }}>
                        {ing}
                      </span>
                    ))}
                  </div>
                  
                  {!showGenerator && (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => setShowGenerator(true)} className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>
                        <Sparkles size={14} style={{ marginRight: 6 }} /> Generate Recipe
                      </button>
                      <button onClick={() => setImage(null)} className="btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }}>
                        Retake
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {showGenerator && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: 16, borderRadius: 12 }}>
                <AIRecipeGenerator initialInput={ingredientsFound.join(', ')} />
              </div>
            </motion.div>
          )}
        </div>
      )}

      <CameraModal
        isOpen={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={handleCapture}
      />
    </div>
  );
}
