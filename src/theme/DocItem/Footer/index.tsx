import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import FeedbackWidget from '@site/src/components/FeedbackWidget';
import { useLocation } from '@docusaurus/router';

export default function FooterWrapper(props) {
  const location = useLocation();
  
  return (
    <>
      <Footer {...props} />
      <FeedbackWidget 
        pageId={location.pathname}
        pageTitle={document.title}
      />
    </>
  );
} 