import React from 'react';
import styles from './styles.module.css';
import IonicIcon from '@site/src/components/IonicIcon';

interface RepoCardProps {
  url: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  author: string;
}

const RepoCard: React.FC<RepoCardProps> = ({ url, name, description, stars, forks, author }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.repoCard}>
      <div className={styles.cardHeader}>
        <IonicIcon name="logo-github" size={24} />
        <h3 className={styles.repoName}>{name}</h3>
      </div>
      <p className={styles.repoDescription}>{description}</p>
      <div className={styles.repoFooter}>
        <div className={styles.repoStats}>
          <IonicIcon name="star-outline" size={16} />
          <span>{stars}</span>
          <IonicIcon name="git-branch-outline" size={16} />
          <span>{forks}</span>
        </div>
        <span className={styles.repoAuthor}>{author}</span>
      </div>
    </a>
  );
};

export default RepoCard; 