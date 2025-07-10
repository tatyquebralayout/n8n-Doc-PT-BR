import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  blog?: string;
  bio?: string;
}

interface FooterAuthorsProps {
  usernames: string[];
}

const FooterAuthors: React.FC<FooterAuthorsProps> = ({ usernames }) => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const userPromises = usernames.map(async (username) => {
          const response = await fetch(`https://api.github.com/users/${username}`);
          if (!response.ok) {
            throw new Error(`Erro ao buscar usuário ${username}`);
          }
          return response.json();
        });

        const userData = await Promise.all(userPromises);
        setUsers(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [usernames]);

  if (loading) {
    return (
      <div className={styles.footerAuthors}>
        <h3>Projeto concebido por</h3>
        <div className={styles.authorsGrid}>
          {usernames.map((username) => (
            <div key={username} className={styles.authorSkeleton}>
              <div className={styles.avatarSkeleton}></div>
              <div className={styles.nameSkeleton}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.footerAuthors}>
        <h3>Projeto concebido por</h3>
        <p className={styles.error}>Erro ao carregar informações dos desenvolvedores</p>
      </div>
    );
  }

  return (
    <div className={styles.footerAuthors}>
      <h3>Projeto concebido por</h3>
      <div className={styles.authorsGrid}>
        {users.map((user) => (
          <div key={user.login} className={styles.author}>
            <a 
              href={user.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.authorLink}
            >
              <img 
                src={user.avatar_url} 
                alt={`Avatar de ${user.name || user.login}`}
                className={styles.avatar}
              />
              <div className={styles.authorInfo}>
                <span className={styles.name}>{user.name || user.login}</span>
                <span className={styles.username}>@{user.login}</span>
                {user.blog && (
                  <a 
                    href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedin}
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterAuthors; 