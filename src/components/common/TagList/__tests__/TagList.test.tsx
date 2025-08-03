import React from 'react';
import { render, screen } from '@testing-library/react';
import TagList from '../index';

describe('TagList', () => {
  const defaultTags = ['n8n', 'automação', 'workflow', 'api'];

  it('renders tags correctly', () => {
    render(<TagList tags={defaultTags} />);
    
    expect(screen.getByText('n8n')).toBeInTheDocument();
    expect(screen.getByText('automação')).toBeInTheDocument();
    expect(screen.getByText('workflow')).toBeInTheDocument();
  });

  it('does not render when tags array is empty', () => {
    render(<TagList tags={[]} />);
    
    expect(screen.queryByTestId('tag-list')).not.toBeInTheDocument();
  });

  it('does not render when tags is null or undefined', () => {
    const { rerender } = render(<TagList tags={null as any} />);
    expect(screen.queryByTestId('tag-list')).not.toBeInTheDocument();
    
    rerender(<TagList tags={undefined as any} />);
    expect(screen.queryByTestId('tag-list')).not.toBeInTheDocument();
  });

  it('respects maxVisible prop', () => {
    render(<TagList tags={defaultTags} maxVisible={2} />);
    
    expect(screen.getByText('n8n')).toBeInTheDocument();
    expect(screen.getByText('automação')).toBeInTheDocument();
    expect(screen.queryByText('workflow')).not.toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('shows count of hidden tags', () => {
    render(<TagList tags={defaultTags} maxVisible={1} />);
    
    expect(screen.getByText('+3')).toBeInTheDocument();
  });

  it('does not show count when showCount is false', () => {
    render(<TagList tags={defaultTags} maxVisible={1} showCount={false} />);
    
    expect(screen.queryByText('+3')).not.toBeInTheDocument();
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(<TagList tags={defaultTags} size="small" />);
    let tagList = screen.getByTestId('tag-list');
    expect(tagList).toHaveClass('small');
    
    rerender(<TagList tags={defaultTags} size="large" />);
    tagList = screen.getByTestId('tag-list');
    expect(tagList).toHaveClass('large');
  });

  it('applies different variants correctly', () => {
    const { rerender } = render(<TagList tags={defaultTags} variant="primary" />);
    let tagList = screen.getByTestId('tag-list');
    expect(tagList).toHaveClass('primary');
    
    rerender(<TagList tags={defaultTags} variant="success" />);
    tagList = screen.getByTestId('tag-list');
    expect(tagList).toHaveClass('success');
  });

  it('applies custom className', () => {
    render(<TagList tags={defaultTags} className="custom-class" />);
    
    const tagList = screen.getByTestId('tag-list');
    expect(tagList).toHaveClass('custom-class');
  });

  it('applies custom data-testid', () => {
    render(<TagList tags={defaultTags} dataTestId="custom-tag-list" />);
    
    expect(screen.getByTestId('custom-tag-list')).toBeInTheDocument();
  });

  it('renders all tags when maxVisible is greater than tags length', () => {
    render(<TagList tags={defaultTags} maxVisible={10} />);
    
    expect(screen.getByText('n8n')).toBeInTheDocument();
    expect(screen.getByText('automação')).toBeInTheDocument();
    expect(screen.getByText('workflow')).toBeInTheDocument();
    expect(screen.getByText('api')).toBeInTheDocument();
    expect(screen.queryByText('+')).not.toBeInTheDocument();
  });

  it('handles single tag correctly', () => {
    render(<TagList tags={['single-tag']} />);
    
    expect(screen.getByText('single-tag')).toBeInTheDocument();
    expect(screen.queryByText('+')).not.toBeInTheDocument();
  });

  it('handles tags with special characters', () => {
    const specialTags = ['tag-with-dash', 'tag_with_underscore', 'tag with spaces'];
    render(<TagList tags={specialTags} />);
    
    expect(screen.getByText('tag-with-dash')).toBeInTheDocument();
    expect(screen.getByText('tag_with_underscore')).toBeInTheDocument();
    expect(screen.getByText('tag with spaces')).toBeInTheDocument();
  });

  it('uses default props correctly', () => {
    render(<TagList tags={defaultTags} />);
    
    const tagList = screen.getByTestId('tag-list');
    expect(tagList).toHaveClass('medium');
    expect(tagList).toHaveClass('default');
  });
}); 