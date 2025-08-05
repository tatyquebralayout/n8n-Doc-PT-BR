import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  author?: string;
  category?: string;
}

interface RSSFeedProps {
  feedUrl: string;
  maxItems?: number;
  showDescription?: boolean;
  showDate?: boolean;
  showAuthor?: boolean;
  className?: string;
}

const RSSFeed: React.FC<RSSFeedProps> = ({
  feedUrl,
  maxItems = 5,
  showDescription = true,
  showDate = true,
  showAuthor = false,
  className = '',
}) => {
  const [items, setItems] = useState<RSSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRSSFeed = async () => {
      try {
        setLoading(true);
        setError(null);

        // Usar um proxy CORS para evitar problemas de CORS
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(feedUrl)}`;
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
          throw new Error(`Erro ao buscar feed: ${response.status}`);
        }

        const data = await response.json();
        const xmlText = data.contents;
        
        // Parse do XML usando DOMParser
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Extrair itens do RSS
        const itemElements = xmlDoc.querySelectorAll('item');
        const feedItems: RSSItem[] = [];

        itemElements.forEach((item, index) => {
          if (index >= maxItems) return;

          const title = item.querySelector('title')?.textContent || '';
          const link = item.querySelector('link')?.textContent || '';
          const description = item.querySelector('description')?.textContent || '';
          const pubDate = item.querySelector('pubDate')?.textContent || '';
          const author = item.querySelector('author')?.textContent || '';
          const category = item.querySelector('category')?.textContent || '';

          feedItems.push({
            title: title.trim(),
            link: link.trim(),
            description: description.trim(),
            pubDate: pubDate.trim(),
            author: author.trim(),
            category: category.trim(),
          });
        });

        setItems(feedItems);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    if (feedUrl) {
      fetchRSSFeed();
    }
  }, [feedUrl, maxItems]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <div className={`${styles.rssFeed} ${className}`}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Carregando feed RSS...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.rssFeed} ${className}`}>
        <div className={styles.error}>
          <p>Erro ao carregar feed RSS: {error}</p>
          <p>URL: {feedUrl}</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={`${styles.rssFeed} ${className}`}>
        <div className={styles.empty}>
          <p>Nenhum item encontrado no feed RSS.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.rssFeed} ${className}`}>
      <div className={styles.feedHeader}>
        <h3>Últimas Atualizações</h3>
        <p>Feed RSS: {feedUrl}</p>
      </div>
      
      <div className={styles.feedItems}>
        {items.map((item, index) => (
          <article key={index} className={styles.feedItem}>
            <h4 className={styles.itemTitle}>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.itemLink}
              >
                {item.title}
              </a>
            </h4>
            
            {showDescription && item.description && (
              <p className={styles.itemDescription}>
                {truncateText(item.description)}
              </p>
            )}
            
            <div className={styles.itemMeta}>
              {showDate && item.pubDate && (
                <span className={styles.itemDate}>
                  {formatDate(item.pubDate)}
                </span>
              )}
              
              {showAuthor && item.author && (
                <span className={styles.itemAuthor}>
                  por {item.author}
                </span>
              )}
              
              {item.category && (
                <span className={styles.itemCategory}>
                  {item.category}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
      
      <div className={styles.feedFooter}>
        <a 
          href={feedUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.feedLink}
        >
          Ver feed completo
        </a>
      </div>
    </div>
  );
};

export default RSSFeed; 