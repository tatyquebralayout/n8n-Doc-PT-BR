#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Componentes que precisam de testes
const componentsToTest = [
  'CommunityStats',
  'GuidanceCard', 
  'HighlightCard',
  'IntegrationSearch',
  'RepoCard',
  'SchemaViewer'
];

// Template básico de teste
const testTemplate = (componentName) => `import React from 'react';
import { render, screen } from '@testing-library/react';
import ${componentName} from '../index';

// Mock do IonicIcon se necessário
jest.mock('@site/src/components/IonicIcon', () => {
  return function MockIonicIcon({ name, size, color }: any) {
    return <span data-testid={\`icon-\${name}\`} style={{ fontSize: size, color }}>Icon</span>;
  };
});

describe('${componentName}', () => {
  const defaultProps = {
    // Adicione props padrão baseadas no componente
  };

  it('renderiza com props básicas', () => {
    render(<${componentName} {...defaultProps} />);
    
    // Adicione verificações específicas do componente
    expect(screen.getByTestId('${componentName.toLowerCase()}')).toBeInTheDocument();
  });

  it('renderiza conteúdo corretamente', () => {
    render(<${componentName} {...defaultProps} />);
    
    // Verifique se o conteúdo principal está presente
    // expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('aplica className customizada', () => {
    render(<${componentName} {...defaultProps} className="custom-class" />);
    
    const element = screen.getByTestId('${componentName.toLowerCase()}');
    expect(element).toHaveClass('custom-class');
  });

  it('aplica data-testid customizado', () => {
    render(<${componentName} {...defaultProps} dataTestId="custom-${componentName.toLowerCase()}" />);
    
    expect(screen.getByTestId('custom-${componentName.toLowerCase()}')).toBeInTheDocument();
  });

  it('manipula props opcionais corretamente', () => {
    render(<${componentName} {...defaultProps} />);
    
    // Teste props opcionais específicas do componente
    // expect(screen.queryByText('Optional Text')).not.toBeInTheDocument();
  });

  it('renderiza elementos condicionais quando fornecidos', () => {
    const propsWithConditional = {
      ...defaultProps,
      // Adicione props que renderizam elementos condicionais
    };
    
    render(<${componentName} {...propsWithConditional} />);
    
    // Verifique se elementos condicionais são renderizados
    // expect(screen.getByText('Conditional Text')).toBeInTheDocument();
  });
});
`;

// Função para criar diretório de testes
function createTestDirectory(componentPath) {
  const testDir = path.join(componentPath, '__tests__');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  return testDir;
}

// Função para criar teste
function createTestFile(componentName) {
  const componentPath = path.join(__dirname, '..', 'src', 'components', componentName);
  const testDir = createTestDirectory(componentPath);
  const testFile = path.join(testDir, `${componentName}.test.tsx`);
  
  if (!fs.existsSync(testFile)) {
    fs.writeFileSync(testFile, testTemplate(componentName));
    console.log(`✅ Criado: ${testFile}`);
    return true;
  } else {
    console.log(`⚠️  Já existe: ${testFile}`);
    return false;
  }
}

// Executar criação de testes
console.log('🧪 Criando testes para componentes...\n');

let created = 0;
componentsToTest.forEach(component => {
  if (createTestFile(component)) {
    created++;
  }
});

console.log(`\n📊 Resumo:`);
console.log(`✅ Testes criados: ${created}`);
console.log(`⚠️  Testes já existentes: ${componentsToTest.length - created}`);
console.log(`📁 Total de componentes processados: ${componentsToTest.length}`);

if (created > 0) {
  console.log('\n🔧 Próximos passos:');
  console.log('1. Revisar e customizar os testes criados');
  console.log('2. Adicionar verificações específicas de cada componente');
  console.log('3. Executar: npm test');
  console.log('4. Corrigir quaisquer erros de teste');
} 