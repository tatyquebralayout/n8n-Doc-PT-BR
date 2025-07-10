import React from 'react';

/**
 * IonicIcon - Componente padronizado para uso de Ionicons na documentação.
 *
 * Tamanhos permitidos: 16, 20, 24, 32, 48, 64 (em px)
 * Estilo: Apenas outline (exceto logos)
 * Cor: Sempre via CSS variable ou currentColor (NUNCA hardcoded)
 * Acessibilidade: aria-hidden="true" por padrão
 *
 * Exemplo de uso:
 * <IonicIcon name="rocket-outline" size={24} color="var(--ifm-color-primary)" />
 */

const ALLOWED_SIZES = [16, 20, 24, 32, 48, 64];

interface IonicIconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const isLogo = (name: string) => name.startsWith('logo-');
const isOutline = (name: string) => name.endsWith('-outline') || isLogo(name);

const IonicIcon: React.FC<IonicIconProps> = ({ 
  name, 
  size = 24, 
  color,
  className = '',
  style = {},
}) => {
  if (!name) {
    // Fallback visual para evitar quebra geral
    return <span style={{display: 'inline-block', width: size, height: size}} aria-hidden="true" />;
  }

  // Validação de tamanho
  const iconSize = ALLOWED_SIZES.includes(size) ? size : 24;
  
  // Validação de estilo
  if (!isOutline(name)) {
    console.warn(`IonicIcon: Apenas ícones outline ou logos são permitidos. Ícone '${name}' pode não seguir o padrão.`);
  }

  // Usar o elemento ion-icon que já está carregado via CDN
  return React.createElement('ion-icon', {
    name,
    style: {
      fontSize: `${iconSize}px`,
      color: color || 'currentColor',
      display: 'inline-block',
      verticalAlign: 'middle',
      ...style,
    },
    className,
    'aria-hidden': 'true',
  });
};

export default IonicIcon; 