import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import styles from './styles.module.css';
import IonicIcon from '@site/src/components/IonicIcon';

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
      <div className={`${styles.repoCard} ${styles.errorCard}`}>
        <IonicIcon name="warning-outline" size={40} color="var(--ifm-color-danger)" />
        <h4 className={styles.errorTitle}>Erro ao Carregar</h4>
        <p className={styles.errorMessage}>{error}</p>
        <a href={repoUrl} className={styles.button} target="_blank" rel="noopener noreferrer">
          Acessar Repositório
        </a>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`${styles.repoCard} ${styles.loadingCard}`}>
        <div className={styles.spinner}></div>
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className={styles.repoCard}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <IonicIcon name={icon} size={40} />
        </div>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{data.name}</h3>
          <p className={styles.description}>{data.description}</p>
        </div>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <IonicIcon name="star-outline" size={16} />
          <span>{data.stars.toLocaleString('pt-BR')}</span>
        </div>
        <div className={styles.stat}>
          <IonicIcon name="git-branch-outline" size={16} />
          <span>{data.forks.toLocaleString('pt-BR')}</span>
        </div>
        <div className={styles.stat}>
          <IonicIcon name="eye-outline" size={16} />
          <span>{data.watchers.toLocaleString('pt-BR')}</span>
        </div>
      </div>
      <div className={styles.footer}>
        <a href={data.url} className={styles.button} target="_blank" rel="noopener noreferrer">
          <IonicIcon name="logo-github" size={18} />
          Ver no GitHub
        </a>
      </div>
    </div>
  );
};

export default RepoCard; 