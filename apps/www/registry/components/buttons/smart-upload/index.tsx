'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  CloudUploadIcon,
  File02Icon,
  CheckmarkCircle04Icon,
  FolderCheckIcon,
  ScanIcon,
} from '@hugeicons/core-free-icons';

type UploadStatus = 'idle' | 'scanning' | 'encrypting' | 'uploading' | 'done';

const SmartUpload: React.FC = () => {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (status !== 'idle') return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));

    // Reset input so the same file can be re-selected
    e.target.value = '';

    // Sequence of animations
    setStatus('scanning');
    setTimeout(() => setStatus('encrypting'), 1800);
    setTimeout(() => setStatus('uploading'), 3200);
    setTimeout(() => {
      setStatus('done');
      setTimeout(() => {
        setStatus('idle');
        setPreviewUrl(null);
      }, 3000);
    }, 4500);
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {/* Main Container */}
      <motion.div
        layout
        className={`
            relative bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl
            flex flex-col items-center
            transition-all duration-500 ease-[0.23,1,0.32,1]
        `}
        animate={{
          width: status === 'idle' || status === 'done' ? 240 : 280,
          height: status === 'idle' || status === 'done' ? 60 : 320,
          borderRadius: 24,
        }}
      >
        {/* State: Idle / Button */}
        {status === 'idle' && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleButtonClick}
            className="absolute inset-0 w-full h-full flex items-center justify-center gap-3 group cursor-pointer"
          >
            <div className="p-2 bg-neutral-800 rounded-full group-hover:bg-neutral-700 transition-colors">
              <HugeiconsIcon
                icon={CloudUploadIcon}
                strokeWidth={2}
                className="w-5 h-5 text-neutral-300"
              />
            </div>
            <span className="text-neutral-200 font-medium">
              Upload Document
            </span>
          </motion.button>
        )}

        {/* State: Processing (Scanning/Encrypting/Uploading) */}
        {(status === 'scanning' ||
          status === 'encrypting' ||
          status === 'uploading') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full p-6 flex flex-col items-center"
          >
            {/* Document Visual */}
            <div className="relative w-32 h-40 bg-neutral-800 rounded-xl border border-neutral-700 shadow-inner flex items-center justify-center mb-6 overflow-hidden">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <HugeiconsIcon
                  icon={File02Icon}
                  strokeWidth={2}
                  className="w-12 h-12 text-neutral-600"
                />
              )}

              {/* Scanning Beam */}
              {status === 'scanning' && (
                <motion.div
                  className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0 border-b border-blue-400/50"
                  animate={{ top: ['-20%', '120%'] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              )}

              {/* Encryption Grid Overlay */}
              {status === 'encrypting' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-emerald-900/10 grid grid-cols-6 grid-rows-8 gap-1"
                >
                  {Array.from({ length: 48 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 0.5,
                        delay: Math.random() * 1,
                        repeat: Infinity,
                      }}
                      className="bg-emerald-500/30 rounded-[1px]"
                    />
                  ))}
                </motion.div>
              )}

              {/* Upload Progress Fill */}
              {status === 'uploading' && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full bg-blue-500/10"
                  initial={{ height: '0%' }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
              )}
            </div>

            {/* Status Text & Icon */}
            <div className="flex flex-col items-center gap-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={status}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  {status === 'scanning' && (
                    <HugeiconsIcon
                      icon={ScanIcon}
                      strokeWidth={2}
                      className="w-4 h-4 text-blue-400 animate-pulse"
                    />
                  )}
                  {status === 'encrypting' && (
                    <HugeiconsIcon
                      icon={FolderCheckIcon}
                      strokeWidth={2}
                      className="w-4 h-4 text-emerald-400"
                    />
                  )}
                  {status === 'uploading' && (
                    <HugeiconsIcon
                      icon={CloudUploadIcon}
                      strokeWidth={2}
                      className="w-4 h-4 text-purple-400 animate-bounce"
                    />
                  )}

                  <span className="text-sm font-mono text-neutral-400 uppercase tracking-wider">
                    {status === 'scanning' && 'Virus Scan...'}
                    {status === 'encrypting' && 'Encrypting...'}
                    {status === 'uploading' && 'Uploading...'}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Progress Bar Container */}
              <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden mt-2">
                <motion.div
                  className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  initial={{ width: '0%' }}
                  animate={{
                    width:
                      status === 'scanning'
                        ? '30%'
                        : status === 'encrypting'
                          ? '65%'
                          : status === 'uploading'
                            ? '100%'
                            : '0%',
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* State: Done */}
        {status === 'done' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 w-full h-full flex items-center justify-center gap-2 overflow-hidden bg-green-metallic"
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative flex items-center gap-2">
              <HugeiconsIcon
                icon={CheckmarkCircle04Icon}
                strokeWidth={2}
                className="w-5 h-5 text-white"
              />
              <span className="text-white font-semibold">Complete</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Reflection/Shadow */}
      <div
        className={`
        h-4 w-48 mx-auto mt-4 rounded-[100%] blur-xl transition-all duration-500
        ${status === 'idle' ? 'bg-black/10' : 'bg-black/20 scale-x-110'}
      `}
      />
    </div>
  );
};

export default SmartUpload;
