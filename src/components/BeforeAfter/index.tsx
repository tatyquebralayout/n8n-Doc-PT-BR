import React, { useState } from 'react';
import clsx from 'clsx';
import IonicIcon from '../IonicIcon';
import styles from './styles.module.css';

interface BeforeAfterProps {
  before: {
    title: string;
    content: React.ReactNode;
    description?: string;
  };
  after: {
    title: string;
    content: React.ReactNode;
    description?: string;
  };
  title?: string;
  type?: 'code' | 'image' | 'text' | 'workflow';
  className?: string;
}

const BeforeAfter: React.FC<BeforeAfterProps> = ({
  before,
  after,
  title,
  type = 'text',
  className,
}) => {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');

  const getTypeIcon = (type: string) => {
    const icons = {
      code: 'code-outline',
      image: 'image-outline',
      text: 'document-text-outline',
      workflow: 'git-network-outline',
    };
    return icons[type as keyof typeof icons] || 'document-outline';
  };

  return (
    <div className={clsx(styles.beforeAfter, className)}>
      {title && (
        <div className={styles.header}>
          <h3 className={styles.title}>
            <IonicIcon name={getTypeIcon(type)} size={24} />
            {title}
          </h3>
        </div>
      )}

      <div className={styles.tabs}>
        <button
          className={clsx(
            styles.tab,
            activeTab === 'before' && styles.tabActive
          )}
          onClick={() => setActiveTab('before')}
        >
          <IonicIcon name="time-outline" size={20} />
          Antes
        </button>
        <button
          className={clsx(
            styles.tab,
            activeTab === 'after' && styles.tabActive
          )}
          onClick={() => setActiveTab('after')}
        >
          <IonicIcon name="checkmark-circle-outline" size={20} />
          Depois
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'before' ? (
          <div className={styles.beforeContent}>
            <div className={styles.contentHeader}>
              <h4 className={styles.contentTitle}>
                <IonicIcon name="close-circle-outline" size={20} color="var(--ifm-color-danger)" />
                {before.title}
              </h4>
              {before.description && (
                <p className={styles.contentDescription}>{before.description}</p>
              )}
            </div>
            <div className={styles.contentBody}>
              {before.content}
            </div>
          </div>
        ) : (
          <div className={styles.afterContent}>
            <div className={styles.contentHeader}>
              <h4 className={styles.contentTitle}>
                <IonicIcon name="checkmark-circle-outline" size={20} color="var(--ifm-color-success)" />
                {after.title}
              </h4>
              {after.description && (
                <p className={styles.contentDescription}>{after.description}</p>
              )}
            </div>
            <div className={styles.contentBody}>
              {after.content}
            </div>
          </div>
        )}
      </div>

      <div className={styles.comparison}>
        <div className={styles.comparisonItem}>
          <div className={styles.comparisonLabel}>
            <IonicIcon name="close-circle-outline" size={16} color="var(--ifm-color-danger)" />
            Problema
          </div>
          <div className={styles.comparisonContent}>
            {before.content}
          </div>
        </div>
        
        <div className={styles.comparisonArrow}>
          <IonicIcon name="arrow-forward-outline" size={24} color="var(--ifm-color-primary)" />
        </div>
        
        <div className={styles.comparisonItem}>
          <div className={styles.comparisonLabel}>
            <IonicIcon name="checkmark-circle-outline" size={16} color="var(--ifm-color-success)" />
            Solução
          </div>
          <div className={styles.comparisonContent}>
            {after.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter; 