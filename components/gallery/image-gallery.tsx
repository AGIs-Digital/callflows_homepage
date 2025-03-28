"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export function ImageGallery({ images, className = "" }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Erkennung von mobilen Geräten
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const openImage = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-video overflow-hidden rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openImage(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && closeImage()}>
        <DialogContent className={`p-0 border-none max-w-[95vw] max-h-[90vh] overflow-hidden ${isMobile ? 'w-full h-auto' : ''}`}>
          {selectedImage && (
            <div className="relative w-full h-full">
              <div className="absolute top-2 right-2 z-10">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={closeImage}
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full h-8 w-8"
                >
                  <X size={18} />
                </Button>
              </div>
              
              <div className={`relative ${isMobile ? 'w-full h-auto' : 'w-full h-full min-h-[50vh]'}`}>
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className={`object-contain ${isMobile ? 'max-h-[80vh]' : ''}`}
                  fill={!isMobile}
                  width={isMobile ? selectedImage.width : undefined}
                  height={isMobile ? selectedImage.height : undefined}
                  sizes="95vw"
                  priority
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 