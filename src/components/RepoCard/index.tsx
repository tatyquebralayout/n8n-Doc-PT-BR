import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import styles from './styles.module.css';
import IonicIcon from '@site/src/components/IonicIcon';
import LoadingSkeleton from '@site/src/components/LoadingSkeleton';

interface RepoData {
  name: string;
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  owner: string;
  url: string;
}

interface RepoCardProps {
  repoUrl: string;
  icon?: string;
}

const octokit = new Octokit();

const RepoCard: React.FC<RepoCardProps> = ({ repoUrl, icon = 'logo-github' }) => {
  const [data, setData] = useState<RepoData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const url = new URL(repoUrl);
        const pathParts = url.pathname.split('/').filter(Boolean);
        
        if (pathParts.length < 2) {
          throw new Error('URL do repositório GitHub inválida');
        }
        
        const [owner, repo] = pathParts;

        const { data: repoData } = await octokit.repos.get({
          owner,
          repo,
        });

        setData({
          name: repoData.name,
          description: repoData.description,
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          watchers: repoData.subscribers_count,
          owner: repoData.owner.login,
          url: repoData.html_url,
        });
      } catch (err) {
        console.error(`Erro ao buscar dados para ${repoUrl}:`, err);
        setError('Não foi possível carregar os dados.');
      }
    };

    fetchRepoData();
  }, [repoUrl]);

  if (error) {
    return (
      <div className={`${styles['repo-card']} ${styles['repo-card__error']}`}>
        <IonicIcon name="warning-outline" size={40} color="var(--ifm-color-danger)" />
        <h4 className={styles['repo-card__error-title']}>Erro ao Carregar</h4>
        <p className={styles['repo-card__error-message']}>{error}</p>
        <a href={repoUrl} className={styles['repo-card__button']} target="_blank" rel="noopener noreferrer">
          Acessar Repositório
        </a>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`${styles['repo-card']} ${styles['repo-card__loading']}`}>
        <LoadingSkeleton variant="circle" width={40} height={40} style={{ marginBottom: 16 }} />
        <LoadingSkeleton variant="rect" width="80%" height={24} style={{ marginBottom: 8 }} />
        <LoadingSkeleton variant="line" width="60%" height={16} style={{ marginBottom: 8 }} />
        <LoadingSkeleton variant="line" width="90%" height={16} />
      </div>
    );
  }

  return (
    <div
      className={styles['repo-card']}
      tabIndex={0}
      role="link"
      aria-label={`Acessar repositório: ${data?.name || ''}`}
      onClick={() => data && window.open(data.url, '_blank', 'noopener noreferrer')}
      onKeyDown={e => {
        if ((e.key === 'Enter' || e.key === ' ') && data) {
          e.preventDefault();
          window.open(data.url, '_blank', 'noopener noreferrer');
        }
      }}
    >
      <div className={styles['repo-card__header']}>
        <div className={styles['repo-card__icon']}>
          <IonicIcon name={icon} size={40} />
          aria-hidden="true"
        </div>
        <div className={styles['repo-card__title-container']}>
          <h3 className={styles['repo-card__title']}>{data.name}</h3>
          <p className={styles['repo-card__description']}>{data.description}</p>
        </div>
      </div>
      <div className={styles['repo-card__stats']}>
        <div className={styles['repo-card__stat']}>
          <IonicIcon name="star-outline" size={16} />
          aria-hidden="true"
          <span>{data.stars.toLocaleString('pt-BR')}</span>
        </div>
        <div className={styles['repo-card__stat']}>
          <IonicIcon name="git-branch-outline" size={16} />
          aria-hidden="true"
          <span>{data.forks.toLocaleString('pt-BR')}</span>
        </div>
        <div className={styles['repo-card__stat']}>
          <IonicIcon name="eye-outline" size={16} />
          aria-hidden="true"
          <span>{data.watchers.toLocaleString('pt-BR')}</span>
        </div>
      </div>
      <div className={styles['repo-card__footer']}>
        <a href={data.url} className={styles['repo-card__button']} target="_blank" rel="noopener noreferrer">
          <IonicIcon name="logo-github" size={18} />
          aria-hidden="true"
        </a>
      </div>
    </div>
  );
};

export default React.memo(RepoCard); 