import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './styles.module.css';

interface FeedbackWidgetProps {
  pageId?: string;
  pageTitle?: string;
}

const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ pageId, pageTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<'positive' | 'negative' | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Refs para acessibilidade
  const panelRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
    if (e.key === 'Tab' && panelRef.current) {
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (firstButtonRef.current) firstButtonRef.current.focus();
      }, 0);
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const handleFeedbackSubmit = async () => {
    if (!selectedFeedback) return;

    // Aqui você pode integrar com sua API de feedback
    console.log('Feedback enviado:', {
      pageId,
      pageTitle,
      feedback: selectedFeedback,
      comment,
      timestamp: new Date().toISOString()
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setSelectedFeedback(null);
      setComment('');
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className={styles['feedback-widget']}>
        <div className={styles['feedback-widget__submitted']}>
          <span>Obrigado pelo seu feedback!</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['feedback-widget']}>
      {!isOpen ? (
        <button 
          className={styles['feedback-widget__trigger']}
          onClick={() => setIsOpen(true)}
          aria-label="Enviar feedback sobre esta página"
        >
          <span>Feedback</span>
        </button>
      ) : (
        <div
          className={styles['feedback-widget__panel']}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Enviar feedback sobre esta página"
        >
          <div className={styles['feedback-widget__header']}>
            <h4 className={styles['feedback-widget__header-title']}>Esta página foi útil?</h4>
            <button 
              className={styles['feedback-widget__close']}
              onClick={() => setIsOpen(false)}
              aria-label="Fechar feedback"
              ref={closeButtonRef}
            >
              ×
            </button>
          </div>
          <div className={styles['feedback-widget__options']}>
            <button 
              className={[
                styles['feedback-widget__option'],
                selectedFeedback === 'positive' ? styles['feedback-widget__option--selected'] : ''
              ].join(' ')}
              onClick={() => setSelectedFeedback('positive')}
              ref={firstButtonRef}
            >
              <span>Sim, foi útil</span>
            </button>
            <button 
              className={[
                styles['feedback-widget__option'],
                selectedFeedback === 'negative' ? styles['feedback-widget__option--selected'] : ''
              ].join(' ')}
              onClick={() => setSelectedFeedback('negative')}
            >
              <span>Não foi útil</span>
            </button>
          </div>
          {selectedFeedback && (
            <div className={styles['feedback-widget__comment']}>
              <textarea
                placeholder={selectedFeedback === 'positive' 
                  ? "O que você mais gostou nesta página? (opcional)"
                  : "Como podemos melhorar esta página? (opcional)"
                }
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className={styles['feedback-widget__textarea']}
              />
              <button 
                className={styles['feedback-widget__submit']}
                onClick={handleFeedbackSubmit}
              >
                Enviar Feedback
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedbackWidget; 