import React from 'react';
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
      <div className={styles.videoContainer}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={styles.videoIframe}
        ></iframe>
      </div>
      <div className={styles.videoInfo}>
        <h3 className={styles.videoTitle}>{title}</h3>
        <a href={channelUrl} target="_blank" rel="noopener noreferrer" className={styles.channelLink}>
          <IonicIcon name="logo-youtube" size={16} />
          <span>{channel}</span>
        </a>
      </div>
    </div>
  );
};

export default VideoCard; 