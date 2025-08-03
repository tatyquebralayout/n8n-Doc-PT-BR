import React from 'react';
import { render, screen } from '@testing-library/react';
import IntegrationSearch from '../index';

// Mock do IonicIcon se necessário
jest.mock('@site/src/components/IonicIcon', () => {
  return function MockIonicIcon({ name, size, color }: any) {
    return <span data-testid={`icon-${name}`} style={{ fontSize: size, color }}>Icon</span>;
  };
});

describe('IntegrationSearch', () => {
  const defaultProps = {
    // IntegrationSearch não recebe props
  };

  it('renderiza com props básicas', () => {
    render(<IntegrationSearch />);
    
    // Verificar se o componente está presente
    expect(screen.getByTestId('integration-search')).toBeInTheDocument();
  });

  it('renderiza conteúdo corretamente', () => {
    render(<IntegrationSearch />);
    
    // Verificar se o conteúdo principal está presente
    expect(screen.getByText('Digite um termo de busca ou selecione um filtro para encontrar integrações.')).toBeInTheDocument();
  });

  it('renderiza filtros de busca', () => {
    render(<IntegrationSearch />);
    
    expect(screen.getByTestId('filter-all')).toBeInTheDocument();
    expect(screen.getByTestId('filter-popular')).toBeInTheDocument();
    expect(screen.getByTestId('filter-new')).toBeInTheDocument();
    expect(screen.getByTestId('filter-brazilian')).toBeInTheDocument();
  });

  it('renderiza estado inicial corretamente', () => {
    render(<IntegrationSearch />);
    
    // Verificar se o estado inicial está presente
    expect(screen.getByText('Digite um termo de busca ou selecione um filtro para encontrar integrações.')).toBeInTheDocument();
  });
});
