import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import ImageZoom from '../../components/ImageZoom';

export default function Layout(props: any) {
  return (
    <ImageZoom>
      <OriginalLayout {...props} />
    </ImageZoom>
  );
}