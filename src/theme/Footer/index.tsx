import React, { useState, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import styles from './styles.module.css';
import ThemedImage from '@theme/ThemedImage';
import { useThemeConfig } from '@docusaurus/theme-common';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  blog?: string;
}

function FooterLink({ to, href, label, prependBaseUrlToHref, ...props }) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
  const hreff = href ? normalizedHref : toUrl;
  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
    >
      {label}
    </Link>
  );
}

const FooterLogo = ({ url, alt }: { url: string; alt: string }) => {
  const { colorMode } = useColorMode();
  const sources = {
    light: useBaseUrl(url),
    dark: useBaseUrl(url.replace(/\.svg$/, '-dark.svg')),
  };
  return <ThemedImage alt={alt} sources={sources} />;
};

function Footer(): React.JSX.Element | null {
  const { footer } = useThemeConfig();
  const { colorMode } = useColorMode();
  const [developers, setDevelopers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const usernames = ['tatyquebralayout', 'CJBiohacker'];
        const userPromises = usernames.map(async (username) => {
          const response = await fetch(`https://api.github.com/users/${username}`);
          if (!response.ok) {
            throw new Error(`Erro ao buscar usuário ${username}`);
          }
          return response.json();
        });

        const userData = await Promise.all(userPromises);
        setDevelopers(userData);
      } catch (err) {
        console.error('Erro ao buscar desenvolvedores:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  if (!footer) {
    return null;
  }

  const { copyright, links = [], logo = {} } = footer;

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': colorMode === 'dark',
      })}
    >
      <div className="container margin-vert--lg">
        <div className="row">
          {links.map((item, i) => (
            <div key={i} className="col footer__col">
              {item.title != null && (
                <div className="footer__title">{item.title}</div>
              )}
              {item.title === 'Projeto concebido por' ? (
                <div className="footer__items">
                  {loading ? (
                    <div className={styles.developerSkeleton}>
                      <div className={styles.avatarSkeleton}></div>
                      <div className={styles.nameSkeleton}></div>
                    </div>
                  ) : (
                    developers.map((dev) => (
                      <div key={dev.login} className={styles.developer}>
                        <a
                          href={dev.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.developerLink}
                        >
                          <img
                            src={dev.avatar_url}
                            alt={`Avatar de ${dev.name || dev.login}`}
                            className={styles.developerAvatar}
                          />
                          <div className={styles.developerInfo}>
                            <span className={styles.developerName}>
                              {dev.name || dev.login}
                            </span>
                            <span className={styles.developerUsername}>
                              @{dev.login}
                            </span>
                          </div>
                        </a>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <ul className="footer__items clean-list">
                  {item.items?.map((child, j) => {
                    if (typeof child === 'object' && child !== null) {
                      return (
                        <li key={j}>
                          <FooterLink {...child} />
                        </li>
                      );
                    }
                    return child;
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
                 {copyright && (
           <div className="footer__bottom text--center">
             <div
               className="footer__copyright"
               dangerouslySetInnerHTML={{
                 __html: copyright,
               }}
             />
           </div>
         )}
      </div>
    </footer>
  );
}

export default Footer; 