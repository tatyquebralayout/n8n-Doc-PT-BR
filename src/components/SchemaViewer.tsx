import React from 'react';

interface SchemaProperty {
  type: string;
  description?: string;
  enum?: string[];
  properties?: Record<string, SchemaProperty>;
}

interface SchemaViewerProps {
  schema: {
    properties?: Record<string, SchemaProperty>;
    description?: string;
  };
}

const SchemaViewer: React.FC<SchemaViewerProps> = ({ schema }) => {
  const renderizarPropriedade = (nome: string, prop: SchemaProperty, nivel: number = 0) => {
    // const indentacao = '  '.repeat(nivel);
    
    return (
      <div key={nome} style={{ marginLeft: nivel * 20 }}>
        <strong>{nome}</strong>: {prop.type}
        {prop.description && <span> - {prop.description}</span>}
        {prop.enum && <span> ({prop.enum.join(', ')})</span>}
        {prop.properties && (
          <div>
            {Object.entries(prop.properties).map(([subNome, subProp]) =>
              renderizarPropriedade(subNome, subProp, nivel + 1)
            )}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="schema-viewer">
      <h3>Schema de Dados</h3>
      {schema.properties && Object.entries(schema.properties).map(([nome, prop]) =>
        renderizarPropriedade(nome, prop)
      )}
    </div>
  );
};

export default SchemaViewer; 