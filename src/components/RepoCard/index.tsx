// Componente otimizado com lazy loading para melhor performance
import React from 'react';
import clsx from 'clsx';
import BaseCard from '../common/BaseCard';
import TagList from '../common/TagList';
import IonicIcon from '../IonicIcon';
import styles from './styles.module.css';

interface RepoCardProps {
  name: string;
  description: string;
  url: string;
  stars?: number;
  forks?: number;
  language?: string;
  topics?: string[];
  lastUpdated?: string;
  className?: string;
}

const RepoCard: React.FC<RepoCardProps> = ({
  name,
  description,
  url,
  stars = 0,
  forks = 0,
  language,
  topics = [],
  lastUpdated,
  className,
}) => {
  const footerContent = (
    <div className={styles.footer}>
      <div className={styles.stats}>
        {stars > 0 && (
          <span className={styles.stat}>
            <IonicIcon name="star-outline" size={16} />
            {stars.toLocaleString()}
          </span>
        )}
        {forks > 0 && (
          <span className={styles.stat}>
            <IonicIcon name="git-branch-outline" size={16} />
            {forks.toLocaleString()}
          </span>
        )}
        {language && (
          <span className={styles.language}>
            <span className={styles.languageDot} />
            {language}
          </span>
        )}
      </div>
      {topics.length > 0 && (
        <TagList 
          tags={topics} 
          maxVisible={3} 
          size="small"
          variant="secondary"
          className={styles.topics}
        />
      )}
      {lastUpdated && (
        <div className={styles.lastUpdated}>
          <IonicIcon name="time-outline" size={14} />
          <span>Atualizado {lastUpdated}</span>
        </div>
      )}
    </div>
  );

  return (
    <BaseCard
      title={name}
      description={description}
      icon="logo-github"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(styles.repoCard, className)}
      dataTestId="repo-card"
    >
      {footerContent}
    </BaseCard>
  );
};

export default RepoCard; 