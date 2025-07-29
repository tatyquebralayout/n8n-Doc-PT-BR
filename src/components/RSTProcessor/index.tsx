import React, { useEffect, useState } from 'react';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface RSTProcessorProps {
  content: string;
  className?: string;
}

interface ProcessedContent {
  type: 'note' | 'warning' | 'code-block' | 'table' | 'graphviz' | 'http' | 'index';
  content: any;
  metadata?: Record<string, any>;
}

const RSTProcessor: React.FC<RSTProcessorProps> = ({ content, className }) => {
  const [processedContent, setProcessedContent] = useState<ProcessedContent[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const processRSTContent = async () => {
      setIsProcessing(true);
      try {
        // Processar conteúdo RST usando docutils
        const { stdout } = await execAsync(`python -c "
import docutils.core
import docutils.writers.html5_polyglot
import sys
import json

# Configurar o processador
settings = docutils.core.PublishSettings(
    writer_name='html5_polyglot',
    report_level=docutils.utils.Reporter.WARNING_LEVEL,
    halt_level=docutils.utils.Reporter.SEVERE_LEVEL,
)

# Processar o conteúdo RST
content = '''${content.replace(/'/g, "\\'")}'''
document = docutils.core.publish_string(content, settings=settings)

# Extrair elementos processados
processed = []
for node in document.traverse():
    if node.tagname == 'note':
        processed.append({
            'type': 'note',
            'content': str(node),
            'metadata': {'class': 'admonition note'}
        })
    elif node.tagname == 'warning':
        processed.append({
            'type': 'warning', 
            'content': str(node),
            'metadata': {'class': 'admonition warning'}
        })
    elif node.tagname == 'literal_block':
        processed.append({
            'type': 'code-block',
            'content': str(node),
            'metadata': {'language': node.get('language', 'text')}
        })

print(json.dumps(processed))
"`);

        const processed = JSON.parse(stdout);
        setProcessedContent(processed);
      } catch (error) {
        console.error('Erro ao processar RST:', error);
        // Fallback para renderização básica
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
          <div className={`admonition note ${item.metadata?.class || ''}`}>
            <div className="admonition-heading">
              <h5>
                <ion-icon name="information-circle-outline"></ion-icon>
                Nota
              </h5>
            </div>
            <div 
              className="admonition-content"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        );

      case 'warning':
        return (
          <div className={`admonition warning ${item.metadata?.class || ''}`}>
            <div className="admonition-heading">
              <h5>
                <ion-icon name="warning-outline"></ion-icon>
                Aviso
              </h5>
            </div>
            <div 
              className="admonition-content"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        );

      case 'code-block':
        return (
          <div className="code-block">
            {item.metadata?.language && (
              <div className="code-language">
                {item.metadata.language}
              </div>
            )}
            <pre>
              <code 
                className={item.metadata?.language ? `language-${item.metadata.language}` : ''}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </pre>
          </div>
        );

      case 'table':
        return (
          <div 
            className="rst-table"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        );

      case 'graphviz':
        return (
          <div className="graphviz-diagram">
            <div className="diagram-caption">
              {item.metadata?.caption || 'Diagrama'}
            </div>
            <div 
              className="diagram-content"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        );

      case 'http':
        return (
          <div className="http-endpoint">
            <div className="endpoint-header">
              <span className="method">{item.metadata?.method || 'POST'}</span>
              <span className="path">{item.metadata?.path || ''}</span>
            </div>
            <div 
              className="endpoint-content"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        );

      default:
        return (
          <div 
            className="rst-content"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        );
    }
  };

  if (isProcessing) {
    return (
      <div className={`rst-processor loading ${className || ''}`}>
        <div className="loading-spinner">
          <ion-icon name="refresh-outline" class="spinning"></ion-icon>
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