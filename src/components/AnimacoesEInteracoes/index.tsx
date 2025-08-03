import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import IonicIcon from '@site/src/components/IonicIcon';

export default function AnimacoesEInteracoes() {
  return (
    <div>
      <p>Guia prático para criar experiências visuais envolventes e interações suaves na documentação.</p>
      <hr />
      <h2><IonicIcon name="sparkles-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> <strong>Bibliotecas Disponíveis</strong></h2>
      <h3><strong>🎬 Framer Motion</strong></h3>
      <p>Principal biblioteca de animações do projeto:</p>
      <pre><code className="language-jsx">
        import {'{ motion }'} from 'framer-motion';

        // Animação básica
        &lt;motion.div
          initial={'{'}{'{'} opacity: 0 {'}'}{'}'}
          animate={'{'}{'{'} opacity: 1 {'}'}{'}'}
          transition={'{'}{'{'} duration: 0.5 {'}'}{'}'}
        &gt;
          Conteúdo animado
        &lt;/motion.div&gt;
      </code></pre>
      <h3><strong>🎨 CSS Animations</strong></h3>
      <p>Animações nativas CSS para ícones e elementos simples:</p>
      <pre><code className="language-css">
        @keyframes pulse {'{'}
          0%, 100% {'{'} transform: scale(1); {'}'}
          50% {'{'} transform: scale(1.1); {'}'}
        {'}'}

        .animated-icon {'{'}
          animation: pulse 2s infinite;
        {'}'}
      </code></pre>
      <hr />
      <h2><IonicIcon name="heart-outline" style={{ fontSize: '24px', color: '#ea4b71' }} /> <strong>Ícones Animados</strong></h2>
      <h3><strong>💫 Ícones com CSS Animations</strong></h3>
      <Tabs>
        <TabItem value="exemplos" label="Exemplos Visuais">
          <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', margin: '20px 0', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <IonicIcon 
                name="heart" 
                style={{ 
                  fontSize: '40px', 
                  color: '#ea4b71',
                  animation: 'pulse 2s infinite'
                }}
              />
              <p>Pulse</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <IonicIcon 
                name="star" 
                style={{ 
                  fontSize: '36px', 
                  color: '#f59e0b',
                  animation: 'spin 3s linear infinite'
                }}
              />
              <p>Spin</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <IonicIcon 
                name="rocket" 
                style={{ 
                  fontSize: '38px', 
                  color: '#10b981',
                  animation: 'bounce 1s infinite'
                }}
              />
              <p>Bounce</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <IonicIcon 
                name="flash" 
                style={{ 
                  fontSize: '36px', 
                  color: '#8b5cf6',
                  animation: 'shake 0.5s infinite'
                }}
              />
              <p>Shake</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <IonicIcon 
                name="diamond" 
                style={{ 
                  fontSize: '34px', 
                  color: '#ec4899',
                  animation: 'glow 2s ease-in-out infinite alternate'
                }}
              />
              <p>Glow</p>
            </div>
          </div>
        </TabItem>
        <TabItem value="codigo" label="Código">
          <pre><code className="language-jsx">
            // Pulse (heartbeat)
            &lt;ion-icon 
              name="heart" 
              style={'{'}{'{'} 
                fontSize: '40px', 
                color: '#ea4b71',
                animation: 'pulse 2s infinite'
              {'}'}{'}'}
            &gt;&lt;/ion-icon&gt;

            // Spin (rotating)
            &lt;ion-icon 
              name="star" 
              style={'{'}{'{'} 
                fontSize: '36px', 
                color: '#f59e0b',
                animation: 'spin 3s linear infinite'
              {'}'}{'}'}
            &gt;&lt;/ion-icon&gt;

            // Bounce (up and down)
            &lt;ion-icon 
              name="rocket" 
              style={'{'}{'{'} 
                fontSize: '38px', 
                color: '#10b981',
                animation: 'bounce 1s infinite'
              {'}'}{'}'}
            &gt;&lt;/ion-icon&gt;

            // Shake (vibrate)
            &lt;ion-icon 
              name="flash" 
              style={'{'}{'{'} 
                fontSize: '36px', 
                color: '#8b5cf6',
                animation: 'shake 0.5s infinite'
              {'}'}{'}'}
            &gt;&lt;/ion-icon&gt;

            // Glow (brightness)
            &lt;ion-icon 
              name="diamond" 
              style={'{'}{'{'} 
                fontSize: '34px', 
                color: '#ec4899',
                animation: 'glow 2s ease-in-out infinite alternate'
              {'}'}{'}'}
            &gt;&lt;/ion-icon&gt;
          </code></pre>
        </TabItem>
        <TabItem value="css" label="CSS">
          <pre><code className="language-css" title="src/css/custom.css">
            @keyframes pulse {'{'}
              0%, 100% {'{'} 
                transform: scale(1); 
                opacity: 1; 
              {'}'}
              50% {'{'} 
                transform: scale(1.15); 
                opacity: 0.8; 
              {'}'}
            {'}'}

            @keyframes spin {'{'}
              from {'{'} transform: rotate(0deg); {'}'}
              to {'{'} transform: rotate(360deg); {'}'}
            {'}'}

            @keyframes bounce {'{'}
              0%, 20%, 50%, 80%, 100% {'{'}
                transform: translateY(0);
              {'}'}
              40% {'{'}
                transform: translateY(-15px);
              {'}'}
              60% {'{'}
                transform: translateY(-7px);
              {'}'}
            {'}'}

            @keyframes shake {'{'}
              0%, 100% {'{'} transform: translateX(0); {'}'}
              10%, 30%, 50%, 70%, 90% {'{'} transform: translateX(-2px); {'}'}
              20%, 40%, 60%, 80% {'{'} transform: translateX(2px); {'}'}
            {'}'}

            @keyframes glow {'{'}
              from {'{'}
                filter: brightness(1) drop-shadow(0 0 5px currentColor);
              {'}'}
              to {'{'}
                filter: brightness(1.3) drop-shadow(0 0 15px currentColor);
              {'}'}
            {'}'}
          </code></pre>
        </TabItem>
      </Tabs>
    </div>
  );
}
