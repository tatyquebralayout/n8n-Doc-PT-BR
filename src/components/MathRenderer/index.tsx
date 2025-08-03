import React from 'react';
import { renderMathWithUnicode } from '../../utils/katex-config';

interface MathRendererProps {
  tex: string;
  displayMode?: boolean;
  className?: string;
}

const MathRenderer: React.FC<MathRendererProps> = ({ 
  tex, 
  displayMode = false, 
  className = '' 
}) => {
  const [renderedMath, setRenderedMath] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const rendered = renderMathWithUnicode(tex, displayMode);
      setRenderedMath(rendered);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setRenderedMath(`<span class="math-error">${tex}</span>`);
    }
  }, [tex, displayMode]);

  if (error) {
    console.warn('Erro ao renderizar matemática:', error);
  }

  return (
    <div 
      className={`math-renderer ${displayMode ? 'math-display' : 'math-inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedMath }}
    />
  );
};

export default MathRenderer; 