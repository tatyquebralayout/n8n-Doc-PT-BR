import React, { useState } from 'react';
import clsx from 'clsx';
import IonicIcon from '../IonicIcon';
import styles from './styles.module.css';

interface CodeExampleProps {
  title?: string;
  language: 'javascript' | 'json' | 'bash' | 'typescript' | 'python' | 'yaml' | 'sql';
  code: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  collapsed?: boolean;
  className?: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({
  title,
  language,
  code,
  showLineNumbers = false,
  showCopyButton = true,
  collapsed = false,
  className,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar código:', err);
    }
  };

  const languageLabels = {
    javascript: 'JavaScript',
    json: 'JSON',
    bash: 'Bash',
    typescript: 'TypeScript',
    python: 'Python',
    yaml: 'YAML',
    sql: 'SQL',
  };

  const lines = code.split('\n');

  return (
    <div className={clsx(styles.codeExample, className)}>
      {(title || showCopyButton) && (
        <div className={styles.header}>
          {title && (
            <div className={styles.title}>
              <IonicIcon name="code-outline" size={20} />
              {title}
            </div>
          )}
          <div className={styles.controls}>
            <span className={styles.languageBadge}>
              {languageLabels[language]}
            </span>
            {showCopyButton && (
              <button
                className={clsx(styles.copyButton, copied && styles.copied)}
                onClick={handleCopy}
                aria-label="Copiar código"
              >
                <IonicIcon 
                  name={copied ? "checkmark-outline" : "copy-outline"} 
                  size={16} 
                />
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            )}
            <button
              className={styles.collapseButton}
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? "Expandir código" : "Recolher código"}
            >
              <IonicIcon 
                name={isCollapsed ? "chevron-down-outline" : "chevron-up-outline"} 
                size={16} 
              />
            </button>
          </div>
        </div>
      )}
      
      <div className={clsx(styles.codeContainer, isCollapsed && styles.collapsed)}>
        <pre className={styles.codeBlock}>
          <code className={`language-${language}`}>
            {showLineNumbers ? (
              <div className={styles.lineNumbers}>
                {lines.map((_, index) => (
                  <span key={index} className={styles.lineNumber}>
                    {index + 1}
                  </span>
                ))}
              </div>
            ) : null}
            <div className={styles.codeContent}>
              {lines.map((line, index) => (
                <div key={index} className={styles.codeLine}>
                  {line || '\u00A0'}
                </div>
              ))}
            </div>
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeExample; 