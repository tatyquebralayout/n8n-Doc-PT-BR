import React, { useState } from 'react';
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
      <div className={styles.feedbackWidget}>
        <div className={styles.feedbackSubmitted}>
          <span>Obrigado pelo seu feedback!</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.feedbackWidget}>
      {!isOpen ? (
        <button 
          className={styles.feedbackTrigger}
          onClick={() => setIsOpen(true)}
          aria-label="Enviar feedback sobre esta página"
        >
          <span>Feedback</span>
        </button>
      ) : (
        <div className={styles.feedbackPanel}>
          <div className={styles.feedbackHeader}>
            <h4>Esta página foi útil?</h4>
            <button 
              className={styles.feedbackClose}
              onClick={() => setIsOpen(false)}
              aria-label="Fechar feedback"
            >
              ×
            </button>
          </div>
          
          <div className={styles.feedbackOptions}>
            <button 
              className={`${styles.feedbackOption} ${selectedFeedback === 'positive' ? styles.selected : ''}`}
              onClick={() => setSelectedFeedback('positive')}
            >
              <span>Sim, foi útil</span>
            </button>
            <button 
              className={`${styles.feedbackOption} ${selectedFeedback === 'negative' ? styles.selected : ''}`}
              onClick={() => setSelectedFeedback('negative')}
            >
              <span>Não foi útil</span>
            </button>
          </div>

          {selectedFeedback && (
            <div className={styles.feedbackComment}>
              <textarea
                placeholder={selectedFeedback === 'positive' 
                  ? "O que você mais gostou nesta página? (opcional)"
                  : "Como podemos melhorar esta página? (opcional)"
                }
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className={styles.feedbackTextarea}
              />
              <button 
                className={styles.feedbackSubmit}
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