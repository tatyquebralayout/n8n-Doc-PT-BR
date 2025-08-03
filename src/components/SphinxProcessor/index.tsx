import React, { useEffect, useState } from 'react';
import IonicIcon from '@site/src/components/IonicIcon';

interface SphinxProcessorProps {
  content: string;
  className?: string;
}

interface WorkflowStep {
  type: string;
  description: string;
  config?: Record<string, any>;
  code?: string;
  service?: string;
  channel?: string;
  template?: string;
  delay?: string;
}

interface Workflow {
  id: string;
  title: string;
  description: string;
  nodes: number;
  executions: string;
  steps: WorkflowStep[];
}

interface GraphvizDiagram {
  id: string;
  caption: string;
  align: string;
  content: string;
}

interface HTTPEndpoint {
  method: string;
  path: string;
  synopsis: string;
  params: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  responses: Array<{
    code: number;
    description: string;
  }>;
  examples: Array<{
    type: 'request' | 'response';
    language: string;
    content: string;
  }>;
}

const SphinxProcessor: React.FC<SphinxProcessorProps> = ({ content, className }) => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [diagrams, setDiagrams] = useState<GraphvizDiagram[]>([]);
  const [endpoints, setEndpoints] = useState<HTTPEndpoint[]>([]);

  useEffect(() => {
    const parseSphinxContent = () => {
      const lines = content.split('\n');
      let currentWorkflow: Workflow | null = null;
      let currentDiagram: GraphvizDiagram | null = null;
      let currentEndpoint: HTTPEndpoint | null = null;
      let inWorkflowStep = false;
      let inDiagramContent = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Parse n8n-workflow directive
        if (line.startsWith('.. n8n-workflow::')) {
          const match = line.match(/\.\. n8n-workflow::\s*(\w+)/);
          if (match) {
            currentWorkflow = {
              id: match[1],
              title: '',
              description: '',
              nodes: 0,
              executions: '',
              steps: []
            };
          }
        }

        // Parse workflow attributes
        if (currentWorkflow && line.startsWith(':title:')) {
          currentWorkflow.title = line.replace(':title:', '').trim();
        } else if (currentWorkflow && line.startsWith(':description:')) {
          currentWorkflow.description = line.replace(':description:', '').trim();
        } else if (currentWorkflow && line.startsWith(':nodes:')) {
          currentWorkflow.nodes = parseInt(line.replace(':nodes:', '').trim());
        } else if (currentWorkflow && line.startsWith(':executions:')) {
          currentWorkflow.executions = line.replace(':executions:', '').trim();
        }

        // Parse workflow-step directive
        if (line.startsWith('.. workflow-step::')) {
          const match = line.match(/\.\. workflow-step::\s*(\w+)/);
          if (match && currentWorkflow) {
            const step: WorkflowStep = {
              type: match[1],
              description: ''
            };
            currentWorkflow.steps.push(step);
            inWorkflowStep = true;
          }
        }

        // Parse workflow step attributes
        if (inWorkflowStep && currentWorkflow) {
          const currentStep = currentWorkflow.steps[currentWorkflow.steps.length - 1];
          if (line.startsWith(':description:')) {
            currentStep.description = line.replace(':description:', '').trim();
          } else if (line.startsWith(':config:')) {
            try {
              currentStep.config = JSON.parse(line.replace(':config:', '').trim());
            } catch {
              // Ignore invalid JSON
            }
          } else if (line.startsWith(':code:')) {
            currentStep.code = line.replace(':code:', '').trim();
          } else if (line.startsWith(':service:')) {
            currentStep.service = line.replace(':service:', '').trim();
          } else if (line.startsWith(':channel:')) {
            currentStep.channel = line.replace(':channel:', '').trim();
          } else if (line.startsWith(':template:')) {
            currentStep.template = line.replace(':template:', '').trim();
          } else if (line.startsWith(':delay:')) {
            currentStep.delay = line.replace(':delay:', '').trim();
          } else if (line === '' && currentStep) {
            inWorkflowStep = false;
          }
        }

        // Parse graphviz directive
        if (line.startsWith('.. graphviz::')) {
          const match = line.match(/\.\. graphviz::\s*(\w+)/);
          if (match) {
            currentDiagram = {
              id: match[1],
              caption: '',
              align: 'center',
              content: ''
            };
          }
        }

        // Parse graphviz attributes
        if (currentDiagram && line.startsWith(':caption:')) {
          currentDiagram.caption = line.replace(':caption:', '').trim();
        } else if (currentDiagram && line.startsWith(':align:')) {
          currentDiagram.align = line.replace(':align:', '').trim();
        } else if (currentDiagram && line === '') {
          inDiagramContent = true;
        } else if (inDiagramContent && currentDiagram) {
          if (line.startsWith('..')) {
            inDiagramContent = false;
            setDiagrams(prev => [...prev, currentDiagram!]);
            currentDiagram = null;
          } else {
            currentDiagram.content += line + '\n';
          }
        }

        // Parse http directive
        if (line.startsWith('.. http:')) {
          const match = line.match(/\.\. http:(\w+)::\s*(.+)/);
          if (match) {
            currentEndpoint = {
              method: match[1].toUpperCase(),
              path: match[2],
              synopsis: '',
              params: [],
              responses: [],
              examples: []
            };
          }
        }

        // Parse http attributes
        if (currentEndpoint && line.startsWith(':synopsis:')) {
          currentEndpoint.synopsis = line.replace(':synopsis:', '').trim();
        } else if (currentEndpoint && line.startsWith(':param ')) {
          const paramMatch = line.match(/:param (\w+):\s*(.+)/);
          if (paramMatch) {
            currentEndpoint.params.push({
              name: paramMatch[1],
              type: '',
              description: paramMatch[2]
            });
          }
        } else if (currentEndpoint && line.startsWith(':status ')) {
          const statusMatch = line.match(/:status (\d+):\s*(.+)/);
          if (statusMatch) {
            currentEndpoint.responses.push({
              code: parseInt(statusMatch[1]),
              description: statusMatch[2]
            });
          }
        } else if (currentEndpoint && line.startsWith('.. sourcecode::')) {
          const langMatch = line.match(/\.\. sourcecode::\s*(\w+)/);
          if (langMatch) {
            // Parse example content
            let exampleContent = '';
            let j = i + 1;
            while (j < lines.length && !lines[j].startsWith('..')) {
              exampleContent += lines[j] + '\n';
              j++;
            }
            currentEndpoint.examples.push({
              type: 'request',
              language: langMatch[1],
              content: exampleContent.trim()
            });
          }
        } else if (currentEndpoint && line.startsWith('..')) {
          setEndpoints(prev => [...prev, currentEndpoint!]);
          currentEndpoint = null;
        }
      }

      if (currentWorkflow) {
        setWorkflows(prev => [...prev, currentWorkflow!]);
      }
    };

    parseSphinxContent();
  }, [content]);

  const renderWorkflow = (workflow: Workflow) => (
    <div key={workflow.id} className="n8n-workflow">
      <div className="workflow-header">
        <h4>{workflow.title}</h4>
        <p>{workflow.description}</p>
        <div className="workflow-meta">
          <span className="nodes">
            <IonicIcon name="grid-outline" />
            {workflow.nodes} nodes
          </span>
          <span className="executions">
            <IonicIcon name="play-outline" />
            {workflow.executions}
          </span>
        </div>
      </div>
      
      <div className="workflow-steps">
        {workflow.steps.map((step, index) => (
          <div key={index} className="workflow-step">
            <div className="step-header">
              <span className="step-number">{index + 1}</span>
              <span className="step-type">{step.type}</span>
            </div>
            <div className="step-description">{step.description}</div>
            
            {step.config && (
              <div className="step-config">
                <strong>Config:</strong>
                <pre><code>{JSON.stringify(step.config, null, 2)}</code></pre>
              </div>
            )}
            
            {step.code && (
              <div className="step-code">
                <strong>Code:</strong>
                <pre><code>{step.code}</code></pre>
              </div>
            )}
            
            {step.service && (
              <div className="step-service">
                <strong>Service:</strong> {step.service}
              </div>
            )}
            
            {step.channel && (
              <div className="step-channel">
                <strong>Channel:</strong> {step.channel}
              </div>
            )}
            
            {step.template && (
              <div className="step-template">
                <strong>Template:</strong> {step.template}
              </div>
            )}
            
            {step.delay && (
              <div className="step-delay">
                <strong>Delay:</strong> {step.delay}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderDiagram = (diagram: GraphvizDiagram) => (
    <div key={diagram.id} className="graphviz-diagram">
      <div className="diagram-caption">{diagram.caption}</div>
      <div className="diagram-content">
        <pre><code>{diagram.content}</code></pre>
      </div>
    </div>
  );

  const renderEndpoint = (endpoint: HTTPEndpoint) => (
    <div key={`${endpoint.method}-${endpoint.path}`} className="http-endpoint">
      <div className="endpoint-header">
        <span className="method">{endpoint.method}</span>
        <span className="path">{endpoint.path}</span>
      </div>
      
      <div className="endpoint-synopsis">{endpoint.synopsis}</div>
      
      {endpoint.params.length > 0 && (
        <div className="endpoint-params">
          <h5>Parameters:</h5>
          <ul>
            {endpoint.params.map((param, index) => (
              <li key={index}>
                <strong>{param.name}</strong> ({param.type}) - {param.description}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {endpoint.responses.length > 0 && (
        <div className="endpoint-responses">
          <h5>Responses:</h5>
          <ul>
            {endpoint.responses.map((response, index) => (
              <li key={index}>
                <strong>{response.code}</strong> - {response.description}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {endpoint.examples.length > 0 && (
        <div className="endpoint-examples">
          <h5>Examples:</h5>
          {endpoint.examples.map((example, index) => (
            <div key={index} className="example">
              <h6>{example.type === 'request' ? 'Request' : 'Response'}:</h6>
              <pre><code className={`language-${example.language}`}>{example.content}</code></pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className={`sphinx-processor ${className || ''}`}>
      {workflows.map(renderWorkflow)}
      {diagrams.map(renderDiagram)}
      {endpoints.map(renderEndpoint)}
    </div>
  );
};

export default SphinxProcessor;