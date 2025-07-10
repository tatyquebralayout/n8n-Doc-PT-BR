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
  repoUrl?: string;
  icon?: string;
  loading?: boolean;
}

// Cache simples para evitar múltiplas requisições
const repoCache = new Map<string, RepoData>();

const octokit = new Octokit();

function isIonicon(name: string) {
  // Considera Ionicon se termina com -outline, -sharp, -filled, ou começa com logo-
  return /(-outline|-sharp|-filled)$/.test(name) || name.startsWith('logo-') || name.startsWith('cloud-') || name.startsWith('server-') || name.startsWith('play-') || name.startsWith('analytics-') || name.startsWith('add-') || name.startsWith('book-') || name.startsWith('star-') || name.startsWith('git-') || name.startsWith('eye-');
}

const RepoCard: React.FC<RepoCardProps> = ({ repoUrl, icon = 'logo-github', loading = false }) => {
  const [data, setData] = useState<RepoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Se loading=true ou não há repoUrl, mostrar skeleton
    if (loading || !repoUrl) {
      setIsLoading(loading);
      return;
    }

    const fetchRepoData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Verificar cache primeiro
        if (repoCache.has(repoUrl)) {
          setData(repoCache.get(repoUrl)!);
          setIsLoading(false);
          return;
        }

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

        const processedData: RepoData = {
          name: repoData.name,
          description: repoData.description || 'Sem descrição disponível',
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          watchers: repoData.subscribers_count,
          owner: repoData.owner.login,
          url: repoData.html_url,
        };

        // Salvar no cache
        repoCache.set(repoUrl, processedData);
        setData(processedData);
      } catch (err: any) {
        console.error(`Erro ao buscar dados para ${repoUrl}:`, err);
        
        // Tratar diferentes tipos de erro
        if (err.status === 403) {
          setError('Limite de requisições da API GitHub atingido. Tente novamente em alguns minutos.');
        } else if (err.status === 404) {
          setError('Repositório não encontrado.');
        } else if (err.status === 401) {
          setError('Repositório privado ou acesso negado.');
        } else {
          setError('Não foi possível carregar os dados. Verifique sua conexão.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepoData();
  }, [repoUrl, loading]);

  if (isLoading) {
    return (
      <div className={`${styles['repo-card']} ${styles['repo-card__loading']}`}>
        <LoadingSkeleton variant="circle" width={32} height={32} style={{ marginBottom: 16 }} />
        <LoadingSkeleton variant="rect" width="80%" height={24} style={{ marginBottom: 8 }} />
        <LoadingSkeleton variant="line" width="60%" height={16} style={{ marginBottom: 8 }} />
        <LoadingSkeleton variant="line" width="90%" height={16} />
      </div>
    );
  }

  if (error && repoUrl) {
    return (
      <div className={`${styles['repo-card']} ${styles['repo-card__error']}`}>
        <IonicIcon name="warning-outline" size={32} color="var(--ifm-color-danger)" />
        <h4 className={styles['repo-card__error-title']}>Erro ao Carregar</h4>
        <p className={styles['repo-card__error-message']}>{error}</p>
        <a href={repoUrl} className={styles['repo-card__button']} target="_blank" rel="noopener noreferrer">
          Acessar Repositório
        </a>
      </div>
    );
  }

  // Se não há dados e não há erro, não renderizar nada
  if (!data) {
    return null;
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
          {isIonicon(icon)
            ? <IonicIcon name={icon} size={32} color="var(--ifm-color-primary)" />
            : <IonicIcon name={icon} size={32} />}
        </div>
        <div className={styles['repo-card__title-container']}>
          <h3 className={styles['repo-card__title']}>{data.name}</h3>
          <p className={styles['repo-card__description']}>{data.description}</p>
        </div>
      </div>
      <div className={styles['repo-card__stats']}>
        <div className={styles['repo-card__stat']}>
          {isIonicon('star-outline')
            ? <IonicIcon name="star-outline" size={16} color="var(--ifm-color-primary)" />
            : <IonicIcon name="star-outline" size={16} />}
          <span>{data.stars.toLocaleString('pt-BR')}</span>
        </div>
        <div className={styles['repo-card__stat']}>
          {isIonicon('git-branch-outline')
            ? <IonicIcon name="git-branch-outline" size={16} color="var(--ifm-color-primary)" />
            : <IonicIcon name="git-branch-outline" size={16} />}
          <span>{data.forks.toLocaleString('pt-BR')}</span>
        </div>
        <div className={styles['repo-card__stat']}>
          {isIonicon('eye-outline')
            ? <IonicIcon name="eye-outline" size={16} color="var(--ifm-color-primary)" />
            : <IonicIcon name="eye-outline" size={16} />}
          <span>{data.watchers.toLocaleString('pt-BR')}</span>
        </div>
      </div>
      <div className={styles['repo-card__footer']}>
        <a href={data.url} className={styles['repo-card__button']} target="_blank" rel="noopener noreferrer">
          {isIonicon('logo-github')
            ? <IonicIcon name="logo-github" size={20} color="var(--ifm-color-primary)" />
            : <IonicIcon name="logo-github" size={20} />}
        </a>
      </div>
    </div>
  );
};

export default React.memo(RepoCard); 