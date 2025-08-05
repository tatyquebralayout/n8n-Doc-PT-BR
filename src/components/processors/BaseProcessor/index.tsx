import React, { useState } from 'react';
import clsx from 'clsx';
import IonicIcon from '@site/src/components/IonicIcon';
import styles from './styles.module.css';

interface BaseProcessorProps {
  content: string;
  className?: string;
  onProcess?: (processedContent: any) => void;
  onError?: (error: Error) => void;
  loadingText?: string;
  errorText?: string;
  emptyText?: string;
  children?: React.ReactNode;
  dataTestId?: string;
}

interface ProcessorState {
  isProcessing: boolean;
  hasError: boolean;
  error: Error | null;
  processingTime: number;
}

const BaseProcessor: React.FC<BaseProcessorProps> = ({
  content,
  className,
  // onProcess,
  // onError,
  loadingText = 'Processando...',
  errorText = 'Erro ao processar',
  emptyText = 'Nenhum conteúdo para processar',
  children,
  dataTestId,
}) => {
  const [state] = useState<ProcessorState>({
    isProcessing: false,
    hasError: false,
    error: null,
    processingTime: 0,
  });

  // const startProcessing = () => {
  //   setState(prev => ({
  //     ...prev,
  //     isProcessing: true,
  //     hasError: false,
  //     error: null,
  //     processingTime: 0,
  //   }));
  // };

  // const finishProcessing = (processingTime: number) => {
  //   setState(prev => ({
  //     ...prev,
  //     isProcessing: false,
  //     processingTime,
  //   }));
  // };

  // Função para tratamento de erro (mantida para uso futuro)
  // const handleError = (error: Error) => {
  //   setState(prev => ({
  //     ...prev,
  //     isProcessing: false,
  //     hasError: true,
  //     error,
  //   }));
  //   onError?.(error);
  // };

  // Renderização de loading
  if (state.isProcessing) {
    return (
      <div className={clsx(styles.processor, styles.loading, className)} data-testid={dataTestId}>
        <div className={styles.loadingContent}>
          <IonicIcon name="refresh-outline" />
          <span>{loadingText}</span>
          {state.processingTime > 0 && (
            <small>({state.processingTime.toFixed(1)}ms)</small>
          )}
        </div>
      </div>
    );
  }

  // Renderização de erro
  if (state.hasError) {
    return (
      <div className={clsx(styles.processor, styles.error, className)} data-testid={dataTestId}>
        <div className={styles.errorContent}>
          <IonicIcon name="alert-circle-outline" />
          <p>{errorText}: {state.error?.message}</p>
        </div>
      </div>
    );
  }

  // Renderização de conteúdo vazio
  if (!content || content.trim().length === 0) {
    return (
      <div className={clsx(styles.processor, styles.empty, className)} data-testid={dataTestId}>
        <div className={styles.emptyContent}>
          <IonicIcon name="document-outline" />
          <p>{emptyText}</p>
        </div>
      </div>
    );
  }

  // Renderização do conteúdo processado
  return (
    <div className={clsx(styles.processor, className)} data-testid={dataTestId}>
      {children}
    </div>
  );
};

export default BaseProcessor;
export type { BaseProcessorProps }; 