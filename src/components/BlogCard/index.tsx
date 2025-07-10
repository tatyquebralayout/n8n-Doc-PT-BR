import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import IonicIcon from '@site/src/components/IonicIcon';

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  authors: Array<{
    name: string;
    url?: string;
    image_url?: string;
  }>;
  tags: string[];
  readingTime?: string;
  image?: string;
  slug: string;
  featured?: boolean;
}

export default function BlogCard({
  title,
  description,
  date,
  authors,
  tags,
  readingTime,
  image,
  slug,
  featured = false,
}: BlogCardProps): JSX.Element {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTagIcon = (tag: string) => {
    const iconMap: Record<string, string> = {
      'tutorial': 'school-outline',
      'caso-uso': 'bulb-outline',
      'automação': 'settings-outline',
      'pix': 'card-outline',
      'docker': 'cube-outline',
      'npm': 'terminal-outline',
      'comunidade': 'people-outline',
      'n8n': 'logo-github',
      'brasil': 'flag-outline',
      'financeiro': 'wallet-outline',
      'webhook': 'git-network-outline',
      'instalação': 'download-outline',
    };
    return iconMap[tag.toLowerCase()] || 'bookmark-outline';
  };

  return (
    <article className={clsx(styles.blogCard, featured && styles.featured)}>
      <Link to={`/blog/${slug}`} className={styles.cardLink}>
        <div className={styles.cardImage}>
          {image ? (
            <img src={image} alt={title} />
          ) : (
            <div className={styles.imagePlaceholder}>
              <IonicIcon name="newspaper-outline" />
            </div>
          )}
          {featured && <span className={styles.featuredBadge}>Destaque</span>}
        </div>
        
        <div className={styles.cardContent}>
          <div className={styles.cardMeta}>
            <time className={styles.cardDate} dateTime={date}>
              {formatDate(date)}
            </time>
                         {readingTime && (
               <span className={styles.readingTime}>
                 <IonicIcon name="time-outline" />
                 {readingTime}
               </span>
             )}
          </div>
          
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDescription}>{description}</p>
          
          <div className={styles.cardFooter}>
            <div className={styles.authors}>
              {authors.map((author, index) => (
                <div key={index} className={styles.author}>
                  {author.image_url && (
                    <img 
                      src={author.image_url} 
                      alt={author.name}
                      className={styles.authorImage}
                    />
                  )}
                  <span className={styles.authorName}>{author.name}</span>
                </div>
              ))}
            </div>
            
                           <div className={styles.tags}>
                 {tags.slice(0, 3).map((tag) => (
                   <span key={tag} className={styles.tag}>
                     <IonicIcon name={getTagIcon(tag)} />
                     {tag}
                   </span>
                 ))}
                 {tags.length > 3 && (
                   <span className={styles.moreTags}>+{tags.length - 3}</span>
                 )}
               </div>
          </div>
        </div>
        
                 <div className={styles.cardHover}>
           <IonicIcon name="arrow-forward-outline" />
         </div>
      </Link>
    </article>
  );
} 