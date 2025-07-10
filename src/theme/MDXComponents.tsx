import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import IonicIcon from '@site/src/components/IonicIcon';
import HighlightCard from '@site/src/components/HighlightCard';
import CardGrid from '@site/src/components/CardGrid';
import ArticleCard from '@site/src/components/ArticleCard';
import RepoCard from '@site/src/components/RepoCard';
import GuidanceCard from '@site/src/components/GuidanceCard';
import CommunityStats from '@site/src/components/CommunityStats';
import BlogHero from '@site/src/components/BlogHero';
import BlogCard from '@site/src/components/BlogCard';
import BlogGrid from '@site/src/components/BlogGrid';

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
  BlogHero,
  BlogCard,
  BlogGrid,
  
  // Native HTML elements with uppercase (MDX v3 requirement)
  Details: (props) => <details {...props} />,
  Summary: (props) => <summary {...props} />,
  // Admonition components (MDX v3 PascalCase requirement)
  MdxAdmonitionTitle: (props) => <div className="admonition-heading" {...props} />,
  Admonition: (props) => <div className="theme-admonition" {...props} />,
}; 