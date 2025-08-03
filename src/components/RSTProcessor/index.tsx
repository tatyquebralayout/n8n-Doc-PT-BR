import React, { useEffect, useState, useCallback } from 'react';
import IonicIcon from '@site/src/components/IonicIcon';

// === LAZY LOADING OTIMIZADO ===
interface LazyModules {
  restructured?: any;
  isLoading: boolean;
  hasError: boolean;
}

// Cache global para evitar recarregamentos
const moduleCache: LazyModules = {
  restructured: null,
  isLoading: false,
  hasError: false
};

// Hook customizado para carregamento otimizado
const useRSTParser = () => {
  const [modules, setModules] = useState<LazyModules>(moduleCache);

  const loadModules = useCallback(async () => {
    // Se já carregou ou está carregando, não fazer nada
    if (moduleCache.restructured || moduleCache.isLoading || moduleCache.hasError) {
      return moduleCache;
    }

    moduleCache.isLoading = true;
    setModules({ ...moduleCache });

    try {
      // Carregamento com timeout para evitar travamento
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout ao carregar parser')), 3000)
      );

      const loadPromise = import('restructured').then(module => module.default);
      
      const restructured = await Promise.race([loadPromise, timeoutPromise]);
      
      moduleCache.restructured = restructured;
      moduleCache.isLoading = false;
      moduleCache.hasError = false;
      
      setModules({ ...moduleCache });
      return moduleCache;
    } catch (error) {
      console.warn('Não foi possível carregar restructured (usando fallback):', error);
      moduleCache.isLoading = false;
      moduleCache.hasError = true;
      setModules({ ...moduleCache });
      return moduleCache;
    }
  }, []);

  return { modules, loadModules };
};

interface RSTProcessorProps {
  content: string;
  className?: string;
  enableAdvancedParser?: boolean; // Controle manual do parser avançado
}

interface ProcessedContent {
  type: 'note' | 'warning' | 'tip' | 'important' | 'code-block' | 'table' | 'graphviz' | 'http' | 'index' | 'paragraph' | 'section' | 'title' | 'math';
  content: string;
  metadata?: Record<string, any>;
  children?: ProcessedContent[];
}

const RSTProcessor: React.FC<RSTProcessorProps> = ({ 
  content, 
  className, 
  enableAdvancedParser = true 
}) => {
  const [processedContent, setProcessedContent] = useState<ProcessedContent[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [useAdvancedParser, setUseAdvancedParser] = useState(false);
  const [processingTime, setProcessingTime] = useState<number>(0);
  
  const { modules, loadModules } = useRSTParser();

  // Parser manual otimizado com cache
  const processRSTManually = useCallback((content: string): ProcessedContent[] => {
    const lines = content.split('\n');
    const processed: ProcessedContent[] = [];
    let currentDirective = '';
    let currentContent = '';
    let currentMetadata: Record<string, any> = {};

    // Regex patterns pré-compiladas para melhor performance
    const patterns = [
      { pattern: /^\.\.?\s*(note|warning|tip|important|caution|danger)::\s*(.*)$/, type: 'admonition' },
      { pattern: /^\.\.?\s*code-block::\s*(\w+)?/, type: 'code-block' },
      { pattern: /^\.\.?\s*math::\s*/, type: 'math' },
      { pattern: /^\.\.?\s*table::\s*/, type: 'table' }
    ];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      let matchedDirective = false;
      
      for (const { pattern, type } of patterns) {
        const match = line.match(pattern);
        if (match) {
          // Finalizar diretiva anterior
          if (currentDirective && currentContent) {
            processed.push({
              type: currentDirective as any,
              content: currentContent.trim(),
              metadata: currentMetadata
            });
          }

          if (type === 'admonition') {
            currentDirective = match[1];
            currentContent = match[2] || '';
          } else if (type === 'code-block') {
            currentDirective = 'code-block';
            currentContent = '';
            currentMetadata = { language: match[1] || 'text' };
          } else {
            currentDirective = type;
            currentContent = '';
          }
          
          currentMetadata = { ...currentMetadata };
          matchedDirective = true;
          break;
        }
      }
      
      if (!matchedDirective) {
        if (currentDirective) {
          currentContent += line + '\n';
        } else if (line.length > 0) {
          processed.push({
            type: 'paragraph',
            content: line
          });
        }
      }
    }
    
    // Finalizar último item
    if (currentDirective && currentContent) {
      processed.push({
        type: currentDirective as any,
        content: currentContent.trim(),
        metadata: currentMetadata
      });
    }
    
    return processed;
  }, []);

  // Extrair texto (otimizado)
  const extractTextContent = useCallback((node: any): string => {
    if (typeof node === 'string') return node;
    if (node.value) return node.value;
    if (node.children) {
      return node.children.map((child: any) => extractTextContent(child)).join('');
    }
    return '';
  }, []);

  // Converter saída do restructured (otimizado)
  const convertStructuredToProcessed = useCallback((parsed: any): ProcessedContent[] => {
    const processed: ProcessedContent[] = [];
    
    const processNode = (node: any): ProcessedContent | null => {
      if (!node || typeof node !== 'object') return null;

      switch (node.type) {
        case 'document': {
          if (node.children) {
            node.children.forEach((child: any) => {
              const processedChild = processNode(child);
              if (processedChild) processed.push(processedChild);
            });
          }
          return null;
        }

        case 'section': {
          return {
            type: 'section',
            content: extractTextContent(node),
            children: node.children?.map(processNode).filter(Boolean) || []
          };
        }

        case 'title': {
          return {
            type: 'title',
            content: extractTextContent(node),
            metadata: { depth: node.depth || 1 }
          };
        }

        case 'paragraph': {
          return {
            type: 'paragraph',
            content: extractTextContent(node)
          };
        }

        case 'literal_block': {
          return {
            type: 'code-block',
            content: extractTextContent(node),
            metadata: { language: node.language || 'text' }
          };
        }

        case 'note':
        case 'warning':
        case 'tip': {
          return {
            type: node.type,
            content: extractTextContent(node)
          };
        }

        case 'math_block': {
          return {
            type: 'math',
            content: extractTextContent(node),
            metadata: { display: true }
          };
        }

        default: {
          const textContent = extractTextContent(node);
          if (textContent) {
            return {
              type: 'paragraph',
              content: textContent
            };
          }
          return null;
        }
      }
    };

    if (parsed) processNode(parsed);
    return processed;
  }, [extractTextContent]);

  // Função de processamento memoizada
  const processRSTContent = useCallback((
    content: string, 
    modules: LazyModules, 
    enableAdvanced: boolean
  ): { processed: ProcessedContent[], useAdvanced: boolean } => {
    // Tentar usar parser avançado apenas se disponível e habilitado
    if (enableAdvanced && modules.restructured && !modules.hasError) {
      try {
        const parsed = modules.restructured.parse(content);
        const processed = convertStructuredToProcessed(parsed);
        return { processed, useAdvanced: true };
      } catch (error) {
        console.warn('Erro no parser restructured, usando fallback:', error);
      }
    }

    // Usar parser manual otimizado como fallback
    const processed = processRSTManually(content);
    return { processed, useAdvanced: false };
  }, [convertStructuredToProcessed, processRSTManually]);

  useEffect(() => {
    const processContent = async () => {
      const startTime = performance.now();
      setIsProcessing(true);

      try {
        // Só carregar parser avançado se habilitado e conteúdo complexo
        const needsAdvancedParser = enableAdvancedParser && 
          (content.includes('.. math::') || 
           content.includes('.. figure::') || 
           content.includes('.. table::') ||
           content.length > 500);

        if (needsAdvancedParser && !modules.restructured && !modules.hasError) {
          await loadModules();
        }

        // Processar conteúdo diretamente
        const result = processRSTContent(content, modules, enableAdvancedParser);
        setProcessedContent(result.processed);
        setUseAdvancedParser(result.useAdvanced);

      } catch (error) {
        console.error('Erro ao processar RST:', error);
        setProcessedContent([{
          type: 'code-block',
          content: content,
          metadata: { language: 'rst' }
        }]);
        setUseAdvancedParser(false);
      } finally {
        const endTime = performance.now();
        setProcessingTime(endTime - startTime);
        setIsProcessing(false);
      }
    };

    if (content) {
      processContent();
          }
    }, [content, modules, enableAdvancedParser, loadModules]);

  // Renderização otimizada com React.memo interno
  const renderProcessedContent = useCallback((item: ProcessedContent) => {
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

      case 'important':
        return (
          <div className="admonition important">
            <div className="admonition-heading">
              <h5>
                <IonicIcon name="alert-circle-outline" />
                Importante
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

      case 'math':
        return (
          <div className="math-block">
            <div dangerouslySetInnerHTML={{ 
              __html: item.metadata?.display 
                ? `$$${item.content}$$` 
                : `$${item.content}$` 
            }} />
          </div>
        );

      case 'title': {
        const HeadingTag = `h${Math.min(item.metadata?.depth || 1, 6)}` as keyof JSX.IntrinsicElements;
        return React.createElement(HeadingTag, { className: 'rst-title' }, item.content);
      }

      case 'section':
        return (
          <div className="rst-section">
            {item.children?.map((child, index) => (
              <div key={index} className="rst-section-item">
                {renderProcessedContent(child)}
              </div>
            ))}
          </div>
        );

      case 'paragraph':
        return <p className="rst-paragraph">{item.content}</p>;
      
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
  }, []);

  // Loading state otimizado
  if (isProcessing) {
    return (
      <div className={`rst-processor loading ${className || ''}`}>
        <div className="loading-spinner">
          <IonicIcon name="refresh-outline" />
          <span>Processando RST...</span>
          {processingTime > 0 && (
            <small>({processingTime.toFixed(1)}ms)</small>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`rst-processor ${useAdvancedParser ? 'advanced' : 'fallback'} ${className || ''}`}>
      {process.env.NODE_ENV === 'development' && (
        <div className="rst-debug-info">
          <details>
            <summary>🔧 Debug Info</summary>
            <ul>
              <li>Parser: {useAdvancedParser ? '⚡ Avançado (restructured)' : '🔄 Manual (fallback)'}</li>
              <li>Tempo: {processingTime.toFixed(1)}ms</li>
              <li>Items: {processedContent.length}</li>
              <li>Cache: {modules.restructured ? '✅' : '❌'}</li>
            </ul>
          </details>
        </div>
      )}
      
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

export default React.memo(RSTProcessor);