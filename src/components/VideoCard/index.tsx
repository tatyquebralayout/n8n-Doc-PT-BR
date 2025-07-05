import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import IonicIcon from '@site/src/components/IonicIcon';

interface VideoCardProps {
  videoId: string;
  title: string;
  channel: string;
  channelUrl: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoId, title, channel, channelUrl }) => {
  return (
    <div
      className={styles['video-card']}
      tabIndex={0}
      role="link"
      aria-label={`Assistir vídeo: ${title}`}
      onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener noreferrer')}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener noreferrer');
        }
      }}
    >
      <Link to={`https://www.youtube.com/watch?v=${videoId}`} className={styles['video-card__container']}>
        <img 
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
          alt={title} 
          className={styles['video-card__thumbnail']}
        />
        <div className={styles['video-card__play-icon']}>
          <IonicIcon name="play-circle-outline" size={48} aria-hidden="true" />
        </div>
      </Link>
      <div className={styles['video-card__info']}>
        <Link to={`https://www.youtube.com/watch?v=${videoId}`} className={styles['video-card__title-link']}>
          <h3 className={styles['video-card__title']}>{title}</h3>
        </Link>
        <a href={channelUrl} target="_blank" rel="noopener noreferrer" className={styles['video-card__channel-link']}>
          <IonicIcon name="logo-youtube" size={24} aria-hidden="true" />
          <span>{channel}</span>
        </a>
      </div>
    </div>
  );
};

export default VideoCard; 