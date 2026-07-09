// ImageUploader component

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, X, Image as ImageIcon } from 'lucide-react';
import { compressImage } from '../../utils/imageHelper';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  label?: string;
}

export function ImageUploader({ images, onImagesChange, maxImages = 10, label = 'Upload Photos' }: ImageUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList) => {
    setProcessing(true);
    const newImages: string[] = [];

    for (let i = 0; i < files.length && images.length + newImages.length < maxImages; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        try {
          const compressed = await compressImage(file);
          newImages.push(compressed);
        } catch (err) {
          console.error('Failed to compress image:', err);
        }
      }
    }

    onImagesChange([...images, ...newImages]);
    setProcessing(false);
  }, [images, maxImages, onImagesChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: 12,
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          marginBottom: 8,
        }}
      >
        {label} ({images.length}/{maxImages})
      </label>

      {/* Drop zone */}
      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        style={{
          border: `2px dashed ${dragging ? 'var(--color-impossible-red)' : 'var(--border-color)'}`,
          borderRadius: 16,
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer',
          background: dragging ? 'rgba(225,6,0,0.05)' : 'transparent',
          transition: 'all 200ms',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'rgba(225,6,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {processing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
              <Upload size={20} color="var(--color-impossible-red)" />
            </motion.div>
          ) : (
            <Camera size={20} color="var(--color-impossible-red)" />
          )}
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>
          {processing ? 'Processing...' : 'Drop images here or click to upload'}
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', opacity: 0.7 }}>
          JPG, PNG, WebP — max {maxImages} images
        </p>
      </motion.div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        style={{ display: 'none' }}
      />

      {/* Image previews */}
      {images.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: 8,
            marginTop: 12,
          }}
        >
          <AnimatePresence>
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{
                  position: 'relative',
                  aspectRatio: '1',
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                }}
              >
                <img
                  src={img}
                  alt={`Upload ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(i);
                  }}
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <X size={10} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
