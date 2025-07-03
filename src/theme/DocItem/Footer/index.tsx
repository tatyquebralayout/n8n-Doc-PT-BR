import React from 'react';
import Footer from '@theme-original/DocItem/Footer';
import FeedbackWidget from '@site/src/components/FeedbackWidget';
import { useLocation } from '@docusaurus/router';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function FooterWrapper(props) {
  const location = useLocation();
  
  // Só renderizar o FeedbackWidget no cliente
  if (!ExecutionEnvironment.canUseDOM) {
    return <Footer {...props} />;
  }
  
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