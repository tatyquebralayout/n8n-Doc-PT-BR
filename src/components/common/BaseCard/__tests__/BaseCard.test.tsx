import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BaseCard from '../index';

// Mock do IonicIcon
jest.mock('@site/src/components/IonicIcon', () => {
  return function MockIonicIcon({ name, size, color }: any) {
    return <span data-testid={`icon-${name}`} style={{ fontSize: size, color }}>Icon</span>;
  };
});

describe('BaseCard', () => {
  const defaultProps = {
    title: 'Test Card',
    description: 'Test description',
  };

  it('renders with basic props', () => {
    render(<BaseCard {...defaultProps} />);
    
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders as a div by default', () => {
    render(<BaseCard {...defaultProps} />);
    
    const card = screen.getByTestId('base-card');
    expect(card.tagName).toBe('DIV');
  });

  it('renders as a link when href is provided', () => {
    render(<BaseCard {...defaultProps} href="/test-link" />);
    
    const card = screen.getByTestId('base-card');
    expect(card.tagName).toBe('A');
    expect(card).toHaveAttribute('href', '/test-link');
  });

  it('renders as a button when onClick is provided', () => {
    const handleClick = jest.fn();
    render(<BaseCard {...defaultProps} onClick={handleClick} />);
    
    const card = screen.getByTestId('base-card');
    expect(card.tagName).toBe('BUTTON');
    
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders icon when provided', () => {
    render(<BaseCard {...defaultProps} icon="star-outline" />);
    
    expect(screen.getByTestId('icon-star-outline')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <BaseCard {...defaultProps}>
        <div data-testid="child-content">Child content</div>
      </BaseCard>
    );
    
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<BaseCard {...defaultProps} className="custom-class" />);
    
    const card = screen.getByTestId('base-card');
    expect(card).toHaveClass('custom-class');
  });

  it('applies custom data-testid', () => {
    render(<BaseCard {...defaultProps} dataTestId="custom-test-id" />);
    
    expect(screen.getByTestId('custom-test-id')).toBeInTheDocument();
  });

  it('handles link with target and rel', () => {
    render(
      <BaseCard 
        {...defaultProps} 
        href="/external-link" 
        target="_blank" 
        rel="noopener noreferrer" 
      />
    );
    
    const link = screen.getByTestId('base-card');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('handles button with type', () => {
    const handleClick = jest.fn();
    render(<BaseCard {...defaultProps} onClick={handleClick} />);
    
    const button = screen.getByTestId('base-card');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('does not render description when not provided', () => {
    render(<BaseCard title="Test Card" />);
    
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });

  it('handles icon with custom size and color', () => {
    render(
      <BaseCard 
        {...defaultProps} 
        icon="heart-outline" 
        iconSize={32} 
        iconColor="red" 
      />
    );
    
    const icon = screen.getByTestId('icon-heart-outline');
    expect(icon).toHaveStyle({ fontSize: 32, color: 'red' });
  });

  it('prioritizes href over onClick', () => {
    const handleClick = jest.fn();
    render(
      <BaseCard 
        {...defaultProps} 
        href="/test-link" 
        onClick={handleClick} 
      />
    );
    
    const element = screen.getByTestId('base-card');
    expect(element.tagName).toBe('A');
    expect(element).toHaveAttribute('href', '/test-link');
  });
}); 