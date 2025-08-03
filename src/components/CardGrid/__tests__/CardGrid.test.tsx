import React from 'react';
import { render, screen } from '@testing-library/react';
import CardGrid from '../index';

describe('CardGrid', () => {
  const TestCard = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="test-card">{children}</div>
  );

  it('renderiza com configuração padrão', () => {
    render(
      <CardGrid>
        <TestCard>Card 1</TestCard>
        <TestCard>Card 2</TestCard>
      </CardGrid>
    );

    const cards = screen.getAllByTestId('test-card');
    expect(cards).toHaveLength(2);
  });

  it('aplica número correto de colunas', () => {
    const { container } = render(
      <CardGrid columns={2}>
        <TestCard>Card 1</TestCard>
        <TestCard>Card 2</TestCard>
      </CardGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('columns2');
  });

  it('aplica gap correto', () => {
    const { container } = render(
      <CardGrid gap="large">
        <TestCard>Card 1</TestCard>
      </CardGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('gaplarge');
  });

  it('aplica className customizada', () => {
    const { container } = render(
      <CardGrid className="custom-grid">
        <TestCard>Card 1</TestCard>
      </CardGrid>
    );

    const grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('custom-grid');
  });

  it('aceita diferentes números de colunas', () => {
    const { container, rerender } = render(
      <CardGrid columns={1}>
        <TestCard>Card 1</TestCard>
      </CardGrid>
    );

    let grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('columns1');

    rerender(
      <CardGrid columns={4}>
        <TestCard>Card 1</TestCard>
      </CardGrid>
    );

    grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('columns4');
  });

  it('aceita diferentes tipos de gap', () => {
    const { container, rerender } = render(
      <CardGrid gap="small">
        <TestCard>Card 1</TestCard>
      </CardGrid>
    );

    let grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('gapsmall');

    rerender(
      <CardGrid gap="medium">
        <TestCard>Card 1</TestCard>
      </CardGrid>
    );

    grid = container.firstChild as HTMLElement;
    expect(grid).toHaveClass('gapmedium');
  });

  it('renderiza múltiplos cards corretamente', () => {
    render(
      <CardGrid columns={3}>
        <TestCard>Card 1</TestCard>
        <TestCard>Card 2</TestCard>
        <TestCard>Card 3</TestCard>
        <TestCard>Card 4</TestCard>
      </CardGrid>
    );

    const cards = screen.getAllByTestId('test-card');
    expect(cards).toHaveLength(4);
    expect(cards[0]).toHaveTextContent('Card 1');
    expect(cards[1]).toHaveTextContent('Card 2');
    expect(cards[2]).toHaveTextContent('Card 3');
    expect(cards[3]).toHaveTextContent('Card 4');
  });
}); 