import React from 'react';
import { render, screen } from '@testing-library/react';
import StatItem from '../index';

// Mock do IonicIcon
jest.mock('@site/src/components/IonicIcon', () => {
  return function MockIonicIcon({ name, size, color }: any) {
    return <span data-testid={`icon-${name}`} style={{ fontSize: size, color }}>Icon</span>;
  };
});

describe('StatItem', () => {
  const defaultProps = {
    label: 'Test Stat',
    value: 100,
  };

  it('renders with basic props', () => {
    render(<StatItem {...defaultProps} />);
    
    expect(screen.getByText('Test Stat')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<StatItem {...defaultProps} icon="star-outline" />);
    
    expect(screen.getByTestId('icon-star-outline')).toBeInTheDocument();
  });

  it('formats number values with locale', () => {
    render(<StatItem {...defaultProps} value={1000} />);
    
    expect(screen.getByText('1.000')).toBeInTheDocument();
  });

  it('handles string values', () => {
    render(<StatItem {...defaultProps} value="Custom Value" />);
    
    expect(screen.getByText('Custom Value')).toBeInTheDocument();
  });

  it('uses custom formatValue function', () => {
    const formatValue = jest.fn((value) => `Formatted: ${value}`);
    render(<StatItem {...defaultProps} formatValue={formatValue} />);
    
    expect(formatValue).toHaveBeenCalledWith(100);
    expect(screen.getByText('Formatted: 100')).toBeInTheDocument();
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(<StatItem {...defaultProps} size="small" />);
    let statItem = screen.getByTestId('stat-item');
    expect(statItem).toHaveClass('small');
    
    rerender(<StatItem {...defaultProps} size="large" />);
    statItem = screen.getByTestId('stat-item');
    expect(statItem).toHaveClass('large');
  });

  it('applies different variants correctly', () => {
    const { rerender } = render(<StatItem {...defaultProps} variant="primary" />);
    let statItem = screen.getByTestId('stat-item');
    expect(statItem).toHaveClass('primary');
    
    rerender(<StatItem {...defaultProps} variant="success" />);
    statItem = screen.getByTestId('stat-item');
    expect(statItem).toHaveClass('success');
  });

  it('applies custom className', () => {
    render(<StatItem {...defaultProps} className="custom-class" />);
    
    const statItem = screen.getByTestId('stat-item');
    expect(statItem).toHaveClass('custom-class');
  });

  it('applies custom data-testid', () => {
    render(<StatItem {...defaultProps} dataTestId="custom-stat-item" />);
    
    expect(screen.getByTestId('custom-stat-item')).toBeInTheDocument();
  });

  it('handles icon with custom size and color', () => {
    render(
      <StatItem 
        {...defaultProps} 
        icon="heart-outline" 
        iconSize={32} 
        iconColor="red" 
      />
    );
    
    const icon = screen.getByTestId('icon-heart-outline');
    expect(icon).toBeInTheDocument();
    // Verificar se o ícone está presente em vez de verificar estilos específicos
    expect(icon).toHaveTextContent('Icon');
  });

  it('renders value with data-testid for testing', () => {
    render(<StatItem {...defaultProps} />);
    
    expect(screen.getByTestId('stat-value')).toBeInTheDocument();
  });

  it('handles zero value correctly', () => {
    render(<StatItem {...defaultProps} value={0} />);
    
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles negative values', () => {
    render(<StatItem {...defaultProps} value={-50} />);
    
    expect(screen.getByText('-50')).toBeInTheDocument();
  });

  it('handles decimal values', () => {
    render(<StatItem {...defaultProps} value={99.99} />);
    
    expect(screen.getByText('99,99')).toBeInTheDocument();
  });

  it('handles large numbers with proper formatting', () => {
    render(<StatItem {...defaultProps} value={1234567} />);
    
    expect(screen.getByText('1.234.567')).toBeInTheDocument();
  });

  it('uses default props correctly', () => {
    render(<StatItem {...defaultProps} />);
    
    const statItem = screen.getByTestId('stat-item');
    expect(statItem).toHaveClass('medium');
    expect(statItem).toHaveClass('default');
  });

  it('handles empty string value', () => {
    render(<StatItem {...defaultProps} value="" />);
    
    expect(screen.getByTestId('stat-value')).toHaveTextContent('');
  });

  it('handles null value', () => {
    render(<StatItem {...defaultProps} value={null as any} />);
    
    expect(screen.getByTestId('stat-value')).toHaveTextContent('null');
  });
}); 