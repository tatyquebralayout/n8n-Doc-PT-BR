import React, { useEffect, useState } from 'react';
import IonicIcon from '@site/src/components/IonicIcon';

interface RSTProcessorProps {
  content: string;
  className?: string;
}

interface ProcessedContent {
  type: 'note' | 'warning' | 'tip' | 'code-block' | 'table' | 'graphviz' | 'http' | 'index';
  content: string;
  metadata?: Record<string, any>;
}

const RSTProcessor: React.FC<RSTProcessorProps> = ({ content, className }) => {
  const [processedContent, setProcessedContent] = useState<ProcessedContent[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const processRSTContent = () => {
      setIsProcessing(true);
      try {
        const lines = content.split('\n');
        const processed: ProcessedContent[] = [];
        let currentDirective = '';
        let currentContent = '';
        let currentMetadata: Record<string, any> = {};

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          
          // Detectar diretivas RST
          if (line.startsWith('.. note::')) {
            if (currentDirective && currentContent) {
              processed.push({
                type: currentDirective as any,
                content: currentContent.trim(),
                metadata: currentMetadata
              });
            }
            currentDirective = 'note';
            currentContent = '';
            currentMetadata = {};
            // Pular a linha da diretiva
            continue;
          }
          
          if (line.startsWith('.. warning::')) {
            if (currentDirective && currentContent) {
              processed.push({
                type: currentDirective as any,
                content: currentContent.trim(),
                metadata: currentMetadata
              });
            }
            currentDirective = 'warning';
            currentContent = '';
            currentMetadata = {};
            continue;
          }
          
          if (line.startsWith('.. tip::')) {
            if (currentDirective && currentContent) {
              processed.push({
                type: currentDirective as any,
                content: currentContent.trim(),
                metadata: currentMetadata
              });
            }
            currentDirective = 'tip';
            currentContent = '';
            currentMetadata = {};
            continue;
          }
          
          if (line.startsWith('.. code-block::')) {
            if (currentDirective && currentContent) {
              processed.push({
                type: currentDirective as any,
                content: currentContent.trim(),
                metadata: currentMetadata
              });
            }
            currentDirective = 'code-block';
            currentContent = '';
            currentMetadata = {};
            // Extrair linguagem
            const langMatch = line.match(/\.\. code-block::\s*(\w+)/);
            if (langMatch) {
              currentMetadata.language = langMatch[1];
            }
            continue;
          }
          
          if (line.startsWith('.. table::')) {
            if (currentDirective && currentContent) {
              processed.push({
                type: currentDirective as any,
                content: currentContent.trim(),
                metadata: currentMetadata
              });
            }
            currentDirective = 'table';
            currentContent = '';
            currentMetadata = {};
            continue;
          }
          
          // Se não é uma diretiva, adicionar ao conteúdo atual
          if (currentDirective) {
            currentContent += line + '\n';
          }
        }
        
        // Adicionar o último item processado
        if (currentDirective && currentContent) {
          processed.push({
            type: currentDirective as any,
            content: currentContent.trim(),
            metadata: currentMetadata
          });
        }
        
        setProcessedContent(processed);
      } catch (error) {
        console.error('Erro ao processar RST:', error);
        setProcessedContent([{
          type: 'code-block',
          content: content,
          metadata: { language: 'rst' }
        }]);
      } finally {
        setIsProcessing(false);
      }
    };

    if (content) {
      processRSTContent();
    }
  }, [content]);

  const renderProcessedContent = (item: ProcessedContent) => {
    switch (item.type) {
      case 'note':
        return (
          <div className="admonition note">
            <div className="admonition-heading">
              <h5>
                <IonicIcon name="information-circle-outline" />
                Nota
              </h5>
            </div>
            <div className="admonition-content">
              <p>{item.content}</p>
            </div>
          </div>
        );
      
      case 'warning':
        return (
          <div className="admonition warning">
            <div className="admonition-heading">
              <h5>
                <IonicIcon name="warning-outline" />
                Aviso
              </h5>
            </div>
            <div className="admonition-content">
              <p>{item.content}</p>
            </div>
          </div>
        );
      
      case 'tip':
        return (
          <div className="admonition tip">
            <div className="admonition-heading">
              <h5>
                <IonicIcon name="bulb-outline" />
                Dica
              </h5>
            </div>
            <div className="admonition-content">
              <p>{item.content}</p>
            </div>
          </div>
        );
      
      case 'code-block':
        return (
          <div className="code-block">
            {item.metadata?.language && (
              <div className="code-language">{item.metadata.language}</div>
            )}
            <pre>
              <code className={item.metadata?.language ? `language-${item.metadata.language}` : ''}>
                {item.content}
              </code>
            </pre>
          </div>
        );
      
      case 'table':
        return (
          <div className="rst-table">
            <pre>
              <code>{item.content}</code>
            </pre>
          </div>
        );
      
      default:
        return (
          <div className="rst-fallback">
            <pre>
              <code>{item.content}</code>
            </pre>
          </div>
        );
    }
  };

  if (isProcessing) {
    return (
      <div className={`rst-processor loading ${className || ''}`}>
        <div className="loading-spinner">
          <IonicIcon name="refresh-outline" />
          Processando conteúdo RST...
        </div>
      </div>
    );
  }

  return (
    <div className={`rst-processor ${className || ''}`}>
      {processedContent.length > 0 ? (
        processedContent.map((item, index) => (
          <div key={index} className="rst-item">
            {renderProcessedContent(item)}
          </div>
        ))
      ) : (
        <div className="rst-fallback">
          <pre className="language-rst">
            <code>{content}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default RSTProcessor;