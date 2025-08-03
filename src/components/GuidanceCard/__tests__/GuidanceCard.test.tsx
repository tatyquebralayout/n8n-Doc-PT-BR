import React from 'react';
import { render, screen } from '@testing-library/react';
import GuidanceCard from '../index';

// Mock do IonicIcon se necessário
jest.mock('@site/src/components/IonicIcon', () => {
  return function MockIonicIcon({ name, size, color }: any) {
    return <span data-testid={`icon-${name}`} style={{ fontSize: size, color }}>Icon</span>;
  };
});

describe('GuidanceCard', () => {
  const defaultProps = {
    title: 'Test Guidance',
    description: 'Test description',
    level: 'beginner',
    difficulty: 2,
  };

  it('renderiza com props básicas', () => {
    render(<GuidanceCard {...defaultProps} />);
    
    // Verificar se o componente está presente
    expect(screen.getByTestId('guidance-card')).toBeInTheDocument();
  });

  it('renderiza conteúdo corretamente', () => {
    render(<GuidanceCard {...defaultProps} />);
    
    // Verifique se o conteúdo principal está presente
    // expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('aplica className customizada', () => {
    render(<GuidanceCard {...defaultProps} className="custom-class" />);
    
    const element = screen.getByTestId('guidance-card');
    expect(element).toHaveClass('custom-class');
  });

  it('aplica data-testid customizado', () => {
    render(<GuidanceCard {...defaultProps} dataTestId="custom-guidancecard" />);
    
    expect(screen.getByTestId('custom-guidance-card')).toBeInTheDocument();
  });

  it('manipula props opcionais corretamente', () => {
    render(<GuidanceCard {...defaultProps} />);
    
    // Teste props opcionais específicas do componente
    // expect(screen.queryByText('Optional Text')).not.toBeInTheDocument();
  });

  it('renderiza elementos condicionais quando fornecidos', () => {
    const propsWithConditional = {
      ...defaultProps,
      // Adicione props que renderizam elementos condicionais
    };
    
    render(<GuidanceCard {...propsWithConditional} />);
    
    // Verifique se elementos condicionais são renderizados
    // expect(screen.getByText('Conditional Text')).toBeInTheDocument();
  });
});
