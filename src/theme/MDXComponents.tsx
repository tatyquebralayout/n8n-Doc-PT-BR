import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import IonicIcon from '@site/src/components/IonicIcon';
import HighlightCard from '@site/src/components/HighlightCard';
import CardGrid from '@site/src/components/CardGrid';
import ArticleCard from '@site/src/components/ArticleCard';
import RepoCard from '@site/src/components/RepoCard';
import GuidanceCard from '@site/src/components/GuidanceCard';
import CommunityStats from '@site/src/components/CommunityStats';
import RSTProcessor from '@site/src/components/RSTProcessor';
import SphinxProcessor from '@site/src/components/SphinxProcessor';
import HybridProcessor from '@site/src/components/HybridProcessor';

// Componente customizado para processar blocos de código RST/Sphinx
const CustomCodeBlock = ({ children, className, ...props }) => {
  // Extrair a linguagem do className (ex: "language-rst", "language-sphinx")
  const language = className?.replace('language-', '') || '';
  
  // Se for RST ou Sphinx, usar os processadores customizados
  if (language === 'rst') {
    return <RSTProcessor content={children} className="custom-rst-block" />;
  }
  
  if (language === 'sphinx') {
    return <SphinxProcessor content={children} className="custom-sphinx-block" />;
  }
  
  // Detectar automaticamente se o conteúdo é RST ou Sphinx baseado no conteúdo
  const content = children?.toString() || '';
  const lines = content.split('\n');
  
  // Detectar RST
  let hasRST = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('.. note::') || 
        trimmed.startsWith('.. warning::') || 
        trimmed.startsWith('.. tip::') ||
        trimmed.startsWith('.. code-block::') ||
        trimmed.startsWith('.. table::')) {
      hasRST = true;
      break;
    }
  }
  
  // Detectar Sphinx
  let hasSphinx = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('.. n8n-workflow::') || 
        trimmed.startsWith('.. graphviz::') ||
        trimmed.startsWith('.. http:')) {
      hasSphinx = true;
      break;
    }
  }
  
  // Se detectou RST ou Sphinx, usar os processadores
  if (hasRST) {
    return <RSTProcessor content={content} className="auto-detected-rst" />;
  }
  
  if (hasSphinx) {
    return <SphinxProcessor content={content} className="auto-detected-sphinx" />;
  }
  
  // Para outras linguagens, usar o componente padrão
  return (
    <pre className={className} {...props}>
      <code>{children}</code>
    </pre>
  );
};

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Custom components
  IonicIcon,
  HighlightCard,
  CardGrid,
  ArticleCard,
  RepoCard,
  GuidanceCard,
  CommunityStats,
  RSTProcessor,
  SphinxProcessor,
  HybridProcessor,
  // Override code block to handle RST/Sphinx
  code: CustomCodeBlock,

  
  // Native HTML elements with uppercase (MDX v3 requirement)
  Details: (props) => <details {...props} />,
  Summary: (props) => <summary {...props} />,
  // Admonition components (MDX v3 PascalCase requirement)
  MdxAdmonitionTitle: (props) => <div className="admonition-heading" {...props} />,
  Admonition: (props) => <div className="theme-admonition" {...props} />,
}; 