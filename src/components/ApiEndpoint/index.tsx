import React from 'react';
import clsx from 'clsx';
import IonicIcon from '../IonicIcon';
import styles from './styles.module.css';

interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

interface ApiEndpointProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  title: string;
  description: string;
  parameters?: ApiParameter[];
  requestBody?: {
    contentType: string;
    schema: string;
    example: string;
  };
  response?: {
    statusCode: number;
    contentType: string;
    example: string;
  };
  deprecated?: boolean;
  className?: string;
}

const ApiEndpoint: React.FC<ApiEndpointProps> = ({
  method,
  path,
  title,
  description,
  parameters = [],
  requestBody,
  response,
  deprecated = false,
  className,
}) => {
  const methodColors = {
    GET: '#10b981',
    POST: '#3b82f6',
    PUT: '#f59e0b',
    DELETE: '#ef4444',
    PATCH: '#8b5cf6',
  };

  return (
    <div className={clsx(styles.apiEndpoint, className)}>
      <div className={styles.header}>
        <div className={styles.methodBadge} style={{ backgroundColor: methodColors[method] }}>
          {method}
        </div>
        <code className={styles.path}>{path}</code>
        {deprecated && (
          <span className={styles.deprecatedBadge}>
            <IonicIcon name="warning-outline" size={16} />
            Deprecated
          </span>
        )}
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      {parameters.length > 0 && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>
            <IonicIcon name="list-outline" size={20} />
            Parâmetros
          </h4>
          <div className={styles.parametersTable}>
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo</th>
                  <th>Obrigatório</th>
                  <th>Descrição</th>
                  <th>Exemplo</th>
                </tr>
              </thead>
              <tbody>
                {parameters.map((param, index) => (
                  <tr key={index}>
                    <td><code>{param.name}</code></td>
                    <td><span className={styles.typeBadge}>{param.type}</span></td>
                    <td>
                      {param.required ? (
                        <span className={styles.requiredBadge}>Sim</span>
                      ) : (
                        <span className={styles.optionalBadge}>Não</span>
                      )}
                    </td>
                    <td>{param.description}</td>
                    <td>{param.example && <code>{param.example}</code>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {requestBody && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>
            <IonicIcon name="send-outline" size={20} />
            Request Body
          </h4>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span>Content-Type: {requestBody.contentType}</span>
            </div>
            <pre className={styles.codeExample}>
              <code>{requestBody.example}</code>
            </pre>
          </div>
        </div>
      )}

      {response && (
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>
            <IonicIcon name="return-down-back-outline" size={20} />
            Response ({response.statusCode})
          </h4>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span>Content-Type: {response.contentType}</span>
            </div>
            <pre className={styles.codeExample}>
              <code>{response.example}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiEndpoint; 