import React from 'react';
import styles from './styles.module.css';

interface ProgressGoalProps {
  currentProgress: number;
  targetProgress: number;
  targetDate: string;
  title: string;
  description: string;
}

export default function ProgressGoal({
  currentProgress,
  targetProgress,
  targetDate,
  title,
  description
}: ProgressGoalProps): React.ReactElement {
  const progressPercentage = Math.min((currentProgress / targetProgress) * 100, 100);
  
  return (
    <section className={styles.progressSection}>
      <div className="container">
        <div className={styles.progressContent}>
          <div className={styles.progressHeader}>
            <h2 className={styles.progressTitle}>
              <ion-icon name="trending-up-outline" style={{fontSize: 24, color: 'var(--ifm-color-primary)', marginRight: 8}} />
              {title}
            </h2>
            <p className={styles.progressDescription}>{description}</p>
          </div>
          
          <div className={styles.progressBarContainer}>
            <div className={styles.progressStats}>
              <div className={styles.progressStat}>
                <span className={styles.progressNumber}>{currentProgress}%</span>
                <span className={styles.progressLabel}>Atual</span>
              </div>
              <div className={styles.progressStat}>
                <span className={styles.progressNumber}>{targetProgress}%</span>
                <span className={styles.progressLabel}>Meta</span>
              </div>
              <div className={styles.progressStat}>
                <span className={styles.progressDate}>{targetDate}</span>
                <span className={styles.progressLabel}>Prazo</span>
              </div>
            </div>
            
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            
            <div className={styles.progressInfo}>
              <div className={styles.progressRemaining}>
                <ion-icon name="time-outline" style={{fontSize: 16, color: 'var(--ifm-color-primary)'}} />
                <span>Faltam {targetProgress - currentProgress}% para completar</span>
              </div>
              <div className={styles.progressDays}>
                <ion-icon name="calendar-outline" style={{fontSize: 16, color: 'var(--ifm-color-primary)'}} />
                <span>Meta: {targetDate}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.progressMotivation}>
            <ion-icon name="heart-outline" style={{fontSize: 20, color: 'var(--ifm-color-primary)'}} />
            <p>Ajude-nos a alcançar 100%! Contribua com traduções, correções ou novos conteúdos.</p>
            <a 
              href="https://github.com/n8n-brasil/n8n-Doc-PT-BR"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contributeButton}
            >
              <ion-icon name="logo-github" style={{fontSize: 16, color: 'white'}} />
              Contribuir no GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 