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
  'data-testid'?: string;
}

const isLogo = (name: string) => name.startsWith('logo-');
const isOutline = (name: string) => name.endsWith('-outline') || isLogo(name);

const IonicIcon: React.FC<IonicIconProps> = ({ 
  name, 
  size = 24, 
  color,
  className = '',
  style = {},
  'data-testid': testId,
}) => {
  const iconName = isOutline(name) ? name : `${name}-outline`;
  
  const iconStyle = {
    fontSize: `${size}px`,
    color: color || 'currentColor',
    ...style,
  };

  return (
    <ion-icon
      name={iconName}
      style={iconStyle}
      className={className}
      data-testid={testId || 'ion-icon'}
      aria-hidden="true"
    />
  );
};

export default IonicIcon; 