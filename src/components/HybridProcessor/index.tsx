import React, { useState, useCallback, useMemo, Suspense } from 'react';
import IonicIcon from '../IonicIcon';

// === LAZY LOADING COMPONENTS ===
const RSTProcessor = React.lazy(() => import('../RSTProcessor'));
const SphinxProcessor = React.lazy(() => import('../SphinxProcessor'));

// Loading fallback otimizado
const ProcessorLoadingFallback: React.FC<{ type: string }> = ({ type }) => (
  <div className="processor-loading">
    <div className="loading-content">
      <IonicIcon name="refresh-outline" />
      <span>Carregando processador {type}...</span>
    </div>
  </div>
);

// Componente de erro otimizado
const ProcessorErrorFallback: React.FC<{ error: Error, retry: () => void }> = ({ error, retry }) => (
  <div className="processor-error">
    <div className="error-content">
      <IonicIcon name="alert-circle-outline" />
      <p>Erro ao carregar processador: {error.message}</p>
      <button onClick={retry} className="retry-button">
        <IonicIcon name="refresh-outline" />
        Tentar novamente
      </button>
    </div>
  </div>
);

interface HybridProcessorProps {
  content?: string;
  type?: 'auto' | 'rst' | 'sphinx';
  className?: string;
  enableAdvancedParser?: boolean;
  lazy?: boolean; // Controle do lazy loading
}

// Detectar tipo de conteúdo de forma otimizada
const detectContentType = (content: string): 'rst' | 'sphinx' | 'unknown' => {
  if (!content || content.length === 0) return 'unknown';
  
  // Cache para detecção rápida
  const sphinxPatterns = [
    '.. n8n-workflow::',
    '.. graphviz::',
    '.. http::',
    '.. workflow-step::',
    '.. api-endpoint::'
  ];
  
  const rstPatterns = [
    '.. note::',
    '.. warning::',
    '.. tip::',
    '.. code-block::',
    '.. math::',
    '.. table::',
    '.. figure::'
  ];

  // Verificação rápida para Sphinx (específico)
  for (const pattern of sphinxPatterns) {
    if (content.includes(pattern)) return 'sphinx';
  }

  // Verificação para RST genérico
  for (const pattern of rstPatterns) {
    if (content.includes(pattern)) return 'rst';
  }

  return 'unknown';
};

const HybridProcessor: React.FC<HybridProcessorProps> = ({
  content = '',
  type = 'auto',
  className = '',
  enableAdvancedParser = true,
  lazy = true
}) => {
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Memoizar a detecção de tipo para evitar recálculos
  const detectedType = useMemo(() => {
    if (type !== 'auto') return type;
    return detectContentType(content);
  }, [content, type]);

  // Função de retry otimizada
  const handleRetry = useCallback(() => {
    setError(null);
    setRetryCount(prev => prev + 1);
  }, []);

  // Error boundary interno
  const handleError = useCallback((error: Error) => {
    console.error('Erro no HybridProcessor:', error);
    setError(error);
  }, []);

  // Se não há conteúdo, não renderizar nada
  if (!content || content.trim().length === 0) {
    return (
      <div className={`hybrid-processor empty ${className}`}>
        <div className="empty-content">
          <IonicIcon name="document-outline" />
          <p>Nenhum conteúdo para processar</p>
        </div>
      </div>
    );
  }

  // Se há erro, mostrar fallback
  if (error) {
    return (
      <div className={`hybrid-processor error ${className}`}>
        <ProcessorErrorFallback error={error} retry={handleRetry} />
      </div>
    );
  }

  // Renderizar baseado no tipo detectado
  const renderProcessor = () => {
    const commonProps = {
      content,
      enableAdvancedParser,
      key: `${detectedType}-${retryCount}` // Force re-render on retry
    };

    try {
      switch (detectedType) {
        case 'sphinx':
          if (lazy) {
            return (
              <Suspense fallback={<ProcessorLoadingFallback type="Sphinx" />}>
                <SphinxProcessor {...commonProps} />
              </Suspense>
            );
          } else {
            // Import síncrono para casos onde lazy loading não é desejado
            const SphinxProcessorSync = require('@site/src/components/SphinxProcessor').default;
            return <SphinxProcessorSync {...commonProps} />;
          }

        case 'rst':
          if (lazy) {
            return (
              <Suspense fallback={<ProcessorLoadingFallback type="RST" />}>
                <RSTProcessor {...commonProps} />
              </Suspense>
            );
          } else {
            const RSTProcessorSync = require('@site/src/components/RSTProcessor').default;
            return <RSTProcessorSync {...commonProps} />;
          }

        case 'unknown':
        default:
          // Para conteúdo desconhecido, usar RST como fallback
          if (lazy) {
            return (
              <Suspense fallback={<ProcessorLoadingFallback type="RST (fallback)" />}>
                <RSTProcessor {...commonProps} />
              </Suspense>
            );
          } else {
            const RSTProcessorSync = require('@site/src/components/RSTProcessor').default;
            return <RSTProcessorSync {...commonProps} />;
          }
      }
    } catch (err) {
      handleError(err instanceof Error ? err : new Error('Erro desconhecido'));
      return null;
    }
  };

  return (
    <div className={`hybrid-processor ${detectedType} ${className}`}>
      {/* Debug info apenas em desenvolvimento */}
      {process.env.NODE_ENV === 'development' && (
        <div className="hybrid-debug-info">
          <details>
            <summary>🔧 Hybrid Debug</summary>
            <ul>
              <li>Tipo detectado: <code>{detectedType}</code></li>
              <li>Tipo solicitado: <code>{type}</code></li>
              <li>Lazy loading: {lazy ? '✅' : '❌'}</li>
              <li>Parser avançado: {enableAdvancedParser ? '✅' : '❌'}</li>
              <li>Tamanho conteúdo: {content.length} chars</li>
              <li>Tentativas: {retryCount}</li>
            </ul>
          </details>
        </div>
      )}
      
      {/* Render do processador */}
      <ErrorBoundary onError={handleError}>
        {renderProcessor()}
      </ErrorBoundary>
    </div>
  );
};

// Error Boundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError: (error: Error) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <IonicIcon name="warning-outline" />
            <p>Algo deu errado ao processar o conteúdo</p>
            <details>
              <summary>Detalhes do erro</summary>
              <pre>{this.state.error?.message}</pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default React.memo(HybridProcessor);