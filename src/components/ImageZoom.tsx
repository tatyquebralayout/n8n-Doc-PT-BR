import React, { useEffect } from 'react';
import mediumZoom from 'medium-zoom';

interface ImageZoomProps {
  children: React.ReactNode;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ children }) => {
  useEffect(() => {
    // Configurar medium-zoom para todas as imagens
    mediumZoom('[data-zoomable]', {
      margin: 24,
      background: 'rgba(0, 0, 0, 0.8)',
      scrollOffset: 0,
    });
  }, []);

  return <>{children}</>;
};

export default ImageZoom; 