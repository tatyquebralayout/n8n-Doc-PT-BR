import React, { useState } from 'react';

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
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // Usar SVG local em vez de ion-icon
  const iconPath = `/static/svg/${name}.svg`;
  
  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.warn(`IonicIcon: Erro ao carregar ícone '${name}' de '${iconPath}'`);
    setIsLoading(false);
    setHasError(true);
  };

  // Se houve erro, mostrar um fallback simples
  if (hasError) {
    return (
      <span 
        style={{
          display: 'inline-block',
          width: iconSize,
          height: iconSize,
          backgroundColor: color || 'currentColor',
          borderRadius: '50%',
          opacity: 0.3,
        }}
        aria-hidden="true"
        title={`Ícone ${name} não encontrado`}
      />
    );
  }

  return (
    <img
      src={iconPath}
      alt={`${name} icon`}
      width={iconSize}
      height={iconSize}
      style={{
        color: color || 'currentColor',
        display: 'inline-block',
        verticalAlign: 'middle',
        opacity: isLoading ? 0.5 : 1,
        transition: 'opacity 0.2s ease',
        ...style,
      }}
      className={`ionicon ${className}`}
      aria-hidden="true"
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};

export default IonicIcon; 