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
    <div className={styles.videoCard}>
      <Link to={`https://www.youtube.com/watch?v=${videoId}`} className={styles.videoContainer}>
        <img 
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
          alt={title} 
          className={styles.thumbnail}
        />
        <div className={styles.playIcon}>
          <IonicIcon name="play-circle-outline" size={64} />
        </div>
      </Link>
      <div className={styles.videoInfo}>
        <Link to={`https://www.youtube.com/watch?v=${videoId}`} className={styles.titleLink}>
          <h3 className={styles.videoTitle}>{title}</h3>
        </Link>
        <a href={channelUrl} target="_blank" rel="noopener noreferrer" className={styles.channelLink}>
          <IonicIcon name="logo-youtube" size={16} />
          <span>{channel}</span>
        </a>
      </div>
    </div>
  );
};

export default VideoCard; 