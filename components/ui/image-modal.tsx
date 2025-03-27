"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageModalProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function ImageModal({ src, alt, width, height }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div 
        className="cursor-pointer rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
        onClick={openModal}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
        />
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={closeModal}
        >
          <div className="relative max-w-full max-h-[90vh] overflow-auto">
            <button 
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10"
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
            >
              <X className="h-6 w-6" />
            </button>
            <Image
              src={src}
              alt={alt}
              width={width * 2}
              height={height * 2}
              className="max-h-[85vh] w-auto object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
} 