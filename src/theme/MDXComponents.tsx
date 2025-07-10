import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import HighlightCard from '@site/src/components/HighlightCard';
import GuidanceCard from '@site/src/components/GuidanceCard';
import ProgressGoal from '@site/src/components/ProgressGoal';
import KpiCard from '@site/src/components/CustomComponents/KpiCard';
import CommunityStats from '@site/src/components/CommunityStats';
import ArticleCard from '@site/src/components/ArticleCard';
import AnimatedImpactList from '@site/src/components/AnimatedImpactList';
import VideoCard from '@site/src/components/VideoCard';
import RepoCard from '@site/src/components/RepoCard';
import CardGrid from '@site/src/components/CardGrid';
import FeedbackWidget from '@site/src/components/FeedbackWidget';
import LoadingSkeleton from '@site/src/components/LoadingSkeleton';
import BaseCard from '@site/src/components/CustomComponents/BaseCard';
import BoxNote from '@site/src/components/CustomComponents/BoxNote';
import BulletList from '@site/src/components/CustomComponents/BulletList';
import FadeContent from '@site/src/components/CustomComponents/FadeContent';
import GradientText from '@site/src/components/CustomComponents/GradientText';
import Highlight from '@site/src/components/CustomComponents/Highlight';
import ShinyText from '@site/src/components/CustomComponents/ShinyText';
import SplitSection from '@site/src/components/CustomComponents/SplitSection';
import SplitText from '@site/src/components/CustomComponents/SplitText';
import IonicIcon from '@site/src/components/IonicIcon';

// Novos componentes para API
import ApiEndpoint from '@site/src/components/ApiEndpoint';
import CodeExample from '@site/src/components/CodeExample';

// Novos componentes para Workflows
import WorkflowDiagram from '@site/src/components/WorkflowDiagram';

// Novos componentes para Tutoriais
import StepWizard from '@site/src/components/StepWizard';
import BeforeAfter from '@site/src/components/BeforeAfter';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Custom components
  HighlightCard,
  GuidanceCard,
  ProgressGoal,
  KpiCard,
  CommunityStats,
  ArticleCard,
  AnimatedImpactList,
  VideoCard,
  RepoCard,
  CardGrid,
  FeedbackWidget,
  LoadingSkeleton,
  BaseCard,
  BoxNote,
  BulletList,
  FadeContent,
  GradientText,
  Highlight,
  ShinyText,
  SplitSection,
  SplitText,
  IonicIcon,
  
  // Novos componentes para API
  ApiEndpoint,
  CodeExample,
  
  // Novos componentes para Workflows
  WorkflowDiagram,
  
  // Novos componentes para Tutoriais
  StepWizard,
  BeforeAfter,
  
  // Native HTML elements with uppercase (MDX v3 requirement)
  Details: (props) => <details {...props} />,
  Summary: (props) => <summary {...props} />,
  // Admonition components (MDX v3 PascalCase requirement)
  MdxAdmonitionTitle: (props) => <div className="admonition-heading" {...props} />,
  Admonition: (props) => <div className="theme-admonition" {...props} />,
}; 