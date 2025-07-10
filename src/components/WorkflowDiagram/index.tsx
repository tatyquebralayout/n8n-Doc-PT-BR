import React from 'react';
import clsx from 'clsx';
import IonicIcon from '../IonicIcon';
import styles from './styles.module.css';

interface WorkflowNode {
  id: string;
  name: string;
  type: 'trigger' | 'action' | 'logic' | 'data';
  status?: 'success' | 'error' | 'running' | 'waiting';
  description?: string;
  position: { x: number; y: number };
}

interface WorkflowConnection {
  from: string;
  to: string;
  label?: string;
}

interface WorkflowDiagramProps {
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  title?: string;
  interactive?: boolean;
  showLabels?: boolean;
  className?: string;
}

const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({
  nodes,
  connections,
  title,
  interactive = false,
  showLabels = true,
  className,
}) => {
  const getNodeIcon = (type: WorkflowNode['type']) => {
    const icons = {
      trigger: 'play-circle-outline',
      action: 'settings-outline',
      logic: 'git-branch-outline',
      data: 'analytics-outline',
    };
    return icons[type];
  };

  const getNodeColor = (type: WorkflowNode['type']) => {
    const colors = {
      trigger: '#10b981',
      action: '#3b82f6',
      logic: '#f59e0b',
      data: '#8b5cf6',
    };
    return colors[type];
  };

  const getStatusColor = (status?: WorkflowNode['status']) => {
    if (!status) return 'transparent';
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      running: '#3b82f6',
      waiting: '#f59e0b',
    };
    return colors[status];
  };

  return (
    <div className={clsx(styles.workflowDiagram, className)}>
      {title && (
        <div className={styles.header}>
          <h3 className={styles.title}>
            <IonicIcon name="git-network-outline" size={24} />
            {title}
          </h3>
        </div>
      )}
      
      <div className={styles.diagramContainer}>
        <svg
          className={styles.svg}
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Connections */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="var(--ifm-color-emphasis-400)"
              />
            </marker>
          </defs>
          
          {connections.map((connection, index) => {
            const fromNode = nodes.find(n => n.id === connection.from);
            const toNode = nodes.find(n => n.id === connection.to);
            
            if (!fromNode || !toNode) return null;
            
            const startX = fromNode.position.x + 60;
            const startY = fromNode.position.y + 30;
            const endX = toNode.position.x;
            const endY = toNode.position.y + 30;
            
            return (
              <g key={index}>
                <line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="var(--ifm-color-emphasis-400)"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                {showLabels && connection.label && (
                  <text
                    x={(startX + endX) / 2}
                    y={(startY + endY) / 2 - 10}
                    textAnchor="middle"
                    className={styles.connectionLabel}
                  >
                    {connection.label}
                  </text>
                )}
              </g>
            );
          })}
          
          {/* Nodes */}
          {nodes.map((node) => (
            <g key={node.id} className={styles.nodeGroup}>
              <rect
                x={node.position.x}
                y={node.position.y}
                width="120"
                height="60"
                rx="8"
                fill="var(--ifm-card-background-color)"
                stroke={getNodeColor(node.type)}
                strokeWidth="2"
                className={clsx(styles.node, interactive && styles.interactive)}
              />
              
              {/* Status indicator */}
              {node.status && (
                <circle
                  cx={node.position.x + 110}
                  cy={node.position.y + 10}
                  r="6"
                  fill={getStatusColor(node.status)}
                  stroke="var(--ifm-card-background-color)"
                  strokeWidth="2"
                />
              )}
              
              {/* Node icon */}
              <foreignObject
                x={node.position.x + 10}
                y={node.position.y + 8}
                width="20"
                height="20"
              >
                <div className={styles.nodeIcon}>
                  <IonicIcon 
                    name={getNodeIcon(node.type)} 
                    size={20} 
                    color={getNodeColor(node.type)}
                  />
                </div>
              </foreignObject>
              
              {/* Node name */}
              <text
                x={node.position.x + 60}
                y={node.position.y + 35}
                textAnchor="middle"
                className={styles.nodeName}
                fontSize="12"
                fontWeight="600"
              >
                {node.name}
              </text>
              
              {/* Node type */}
              <text
                x={node.position.x + 60}
                y={node.position.y + 50}
                textAnchor="middle"
                className={styles.nodeType}
                fontSize="10"
                fill="var(--ifm-font-color-secondary)"
              >
                {node.type}
              </text>
            </g>
          ))}
        </svg>
      </div>
      
      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={styles.legendIcon} style={{ backgroundColor: '#10b981' }}>
            <IonicIcon name="play-circle-outline" size={16} color="white" />
          </div>
          <span>Trigger</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendIcon} style={{ backgroundColor: '#3b82f6' }}>
            <IonicIcon name="settings-outline" size={16} color="white" />
          </div>
          <span>Ação</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendIcon} style={{ backgroundColor: '#f59e0b' }}>
            <IonicIcon name="git-branch-outline" size={16} color="white" />
          </div>
          <span>Lógica</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendIcon} style={{ backgroundColor: '#8b5cf6' }}>
            <IonicIcon name="analytics-outline" size={16} color="white" />
          </div>
          <span>Dados</span>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDiagram; 