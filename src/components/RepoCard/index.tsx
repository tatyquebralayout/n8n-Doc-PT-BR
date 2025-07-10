import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import IonicIcon from '@site/src/components/IonicIcon';
import styles from './styles.module.css';

interface RepoCardProps {
  title: string;
  description: string;
  url: string;
  stars?: number;
  forks?: number;
  language?: string;
  topics?: string[];
  className?: string;
}

const RepoCard: React.FC<RepoCardProps> = ({
  title,
  description,
  url,
  stars = 0,
  forks = 0,
  language,
  topics = [],
  className,
}) => {
  return (
    <Link to={url} className={clsx(styles.repoCard, className)} target="_blank" rel="noopener">
      <div className={styles.header}>
        <div className={styles.icon}>
          <IonicIcon name="logo-github" size={24} color="currentColor" />
        </div>
        <div className={styles.stats}>
          {stars > 0 && (
            <span className={styles.stat}>
              <IonicIcon name="star-outline" size={16} />
              {stars}
            </span>
          )}
          {forks > 0 && (
            <span className={styles.stat}>
              <IonicIcon name="git-branch-outline" size={16} />
              {forks}
            </span>
          )}
        </div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      
      <div className={styles.footer}>
        {language && (
          <span className={styles.language}>
            <span className={styles.languageDot}></span>
            {language}
          </span>
        )}
        {topics.length > 0 && (
          <div className={styles.topics}>
            {topics.slice(0, 3).map((topic, index) => (
              <span key={index} className={styles.topic}>
                {topic}
              </span>
            ))}
            {topics.length > 3 && (
              <span className={styles.moreTopics}>+{topics.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default RepoCard; 