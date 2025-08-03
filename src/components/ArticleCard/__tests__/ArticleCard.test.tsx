import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleCard from '../index';

describe('ArticleCard', () => {
  const defaultProps = {
    title: 'Título do Artigo',
    description: 'Descrição do artigo para teste',
    link: '/teste-artigo',
  };

  it('renderiza com props básicas', () => {
    render(<ArticleCard {...defaultProps} />);
    
    expect(screen.getByText('Título do Artigo')).toBeInTheDocument();
    expect(screen.getByText('Descrição do artigo para teste')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/teste-artigo');
  });

  it('renderiza ícone padrão quando não especificado', () => {
    render(<ArticleCard {...defaultProps} />);
    const icon = screen.getByTestId('ion-icon');
    expect(icon).toHaveAttribute('name', 'document-outline');
  });

  it('renderiza ícone customizado', () => {
    render(<ArticleCard {...defaultProps} icon="star-outline" />);
    const icon = screen.getByTestId('ion-icon');
    expect(icon).toHaveAttribute('name', 'star-outline');
  });

  it('renderiza informações do autor quando fornecidas', () => {
    render(<ArticleCard {...defaultProps} author="João Silva" />);
    expect(screen.getByText('João Silva')).toBeInTheDocument();
  });

  it('renderiza data quando fornecida', () => {
    render(<ArticleCard {...defaultProps} date="2024-01-15" />);
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
  });

  it('renderiza visualizações quando fornecidas', () => {
    render(<ArticleCard {...defaultProps} views={150} />);
    expect(screen.getByText('150')).toBeInTheDocument();
    const icons = screen.getAllByTestId('ion-icon');
    expect(icons.some(icon => icon.getAttribute('name') === 'eye-outline')).toBe(true);
  });

  it('renderiza tags quando fornecidas', () => {
    const tags = ['n8n', 'automação', 'workflow'];
    render(<ArticleCard {...defaultProps} tags={tags} />);
    
    expect(screen.getByText('n8n')).toBeInTheDocument();
    expect(screen.getByText('automação')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument(); // Mostra que há mais tags
  });

  it('renderiza apenas as duas primeiras tags', () => {
    const tags = ['tag1', 'tag2', 'tag3', 'tag4'];
    render(<ArticleCard {...defaultProps} tags={tags} />);
    
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument(); // Mostra que há 2 tags extras
  });

  it('aplica className customizada', () => {
    render(<ArticleCard {...defaultProps} className="custom-card" />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom-card');
  });

  it('não renderiza elementos opcionais quando não fornecidos', () => {
    render(<ArticleCard {...defaultProps} />);
    
    expect(screen.queryByText(/autor/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/data/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/visualizações/i)).not.toBeInTheDocument();
  });
}); 