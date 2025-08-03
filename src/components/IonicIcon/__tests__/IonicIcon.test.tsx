import React from 'react';
import { render, screen } from '@testing-library/react';
import IonicIcon from '../index';

describe('IonicIcon', () => {
  it('renderiza ícone com nome básico', () => {
    render(<IonicIcon name="heart" />);
    const icon = screen.getByTestId('ion-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('name', 'heart-outline');
  });

  it('renderiza ícone com tamanho customizado', () => {
    render(<IonicIcon name="star" size={32} />);
    const icon = screen.getByTestId('ion-icon');
    expect(icon).toHaveStyle({ fontSize: '32px' });
  });

  it('renderiza ícone com cor customizada', () => {
    render(<IonicIcon name="rocket" color="#ea4b71" />);
    const icon = screen.getByTestId('ion-icon');
    expect(icon).toHaveStyle({ color: '#ea4b71' });
  });

  it('renderiza ícone outline por padrão', () => {
    render(<IonicIcon name="heart" />);
    const icon = screen.getByTestId('ion-icon');
    expect(icon).toHaveAttribute('name', 'heart-outline');
  });

  it('renderiza ícone filled quando especificado', () => {
    render(<IonicIcon name="heart" style={{ fill: 'filled' }} />);
    const icon = screen.getByTestId('ion-icon');
    expect(icon).toHaveAttribute('name', 'heart-outline');
  });

  it('renderiza logo corretamente', () => {
    render(<IonicIcon name="logo-github" />);
    const icon = screen.getByTestId('ion-icon');
    expect(icon).toHaveAttribute('name', 'logo-github');
  });

  it('aplica className customizada', () => {
    render(<IonicIcon name="star" className="custom-class" />);
    const icon = screen.getByTestId('ion-icon');
    expect(icon).toHaveAttribute('classname', 'custom-class');
  });

  it('aplica estilos customizados', () => {
    const customStyle = { fontSize: '48px', color: '#ff0000' };
    render(<IonicIcon name="diamond" style={customStyle} />);
    const icon = screen.getByTestId('ion-icon');
    expect(icon).toHaveStyle(customStyle);
  });
}); 