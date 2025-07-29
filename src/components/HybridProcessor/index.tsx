import React, { useState, useEffect } from 'react';
import RSTProcessor from '../RSTProcessor';
import SphinxProcessor from '../SphinxProcessor';
import IonicIcon from '@site/src/components/IonicIcon';

interface HybridProcessorProps {
  content: string;
  className?: string;
  type?: 'auto' | 'rst' | 'sphinx' | 'markdown';
}

const HybridProcessor: React.FC<HybridProcessorProps> = ({ 
  content, 
  className, 
  type = 'auto' 
}) => {
  const [detectedType, setDetectedType] = useState<'rst' | 'sphinx' | 'markdown'>('markdown');
  const [processedContent, setProcessedContent] = useState<string>('');

  useEffect(() => {
    if (type === 'auto') {
      // Auto-detect content type
      const lines = content.split('\n');
      let hasRST = false;
      let hasSphinx = false;

      for (const line of lines) {
        const trimmed = line.trim();
        
        // Detect RST directives (but not Sphinx-specific ones)
        if (trimmed.startsWith('.. ') && 
            !trimmed.startsWith('.. http:') &&
            !trimmed.startsWith('.. n8n-workflow::') &&
            !trimmed.startsWith('.. graphviz::') &&
            !trimmed.startsWith('.. index::')) {
          hasRST = true;
        }
        
        // Detect Sphinx-specific directives
        if (trimmed.startsWith('.. n8n-workflow::') || 
            trimmed.startsWith('.. graphviz::') ||
            trimmed.startsWith('.. http:') ||
            trimmed.startsWith('.. index::')) {
          hasSphinx = true;
        }
      }

      if (hasSphinx) {
        setDetectedType('sphinx');
      } else if (hasRST) {
        setDetectedType('rst');
      } else {
        setDetectedType('markdown');
      }
    } else {
      setDetectedType(type as 'rst' | 'sphinx' | 'markdown');
    }
  }, [content, type]);

  const renderContent = () => {
    switch (detectedType) {
      case 'rst':
        return (
          <RSTProcessor 
            content={content} 
            className={`hybrid-rst ${className || ''}`}
          />
        );
      
      case 'sphinx':
        return (
          <SphinxProcessor 
            content={content} 
            className={`hybrid-sphinx ${className || ''}`}
          />
        );
      
      case 'markdown':
      default:
        return (
          <div className={`hybrid-markdown ${className || ''}`}>
            <div 
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        );
    }
  };

  return (
    <div className={`hybrid-processor ${detectedType} ${className || ''}`}>
      {detectedType !== 'markdown' && (
        <div className="processor-badge">
          <IonicIcon name="construct-outline" />
          {detectedType.toUpperCase()} Processado
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default HybridProcessor;