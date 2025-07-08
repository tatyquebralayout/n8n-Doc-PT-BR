import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface VideoCardProps {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration?: string;
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  description,
  thumbnail,
  videoUrl,
  duration,
  className,
}) => {
  return (
    <div className={clsx(styles.videoCard, className)}>
      <div className={styles.thumbnailContainer}>
        <img 
          src={thumbnail} 
          alt={title} 
          className={styles.thumbnail}
        />
        <div className={styles.playOverlay}>
          <ion-icon name="play-circle-outline" style={{fontSize: 48, color: 'white'}} aria-hidden="true" />
        </div>
        {duration && (
          <div className={styles.duration}>
            {duration}
          </div>
        )}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.meta}>
          <ion-icon name="logo-youtube" style={{fontSize: 24, color: 'var(--ifm-color-primary)'}} aria-hidden="true" />
          <span>YouTube</span>
        </div>
        <a 
          href={videoUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.watchButton}
        >
          Assistir Vídeo
        </a>
      </div>
    </div>
  );
};

export default VideoCard; 