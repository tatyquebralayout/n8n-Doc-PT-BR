const React = require('react');

function MockLink({ to, children, ...props }) {
  return React.createElement('a', { href: to, ...props }, children);
}

function MockUseDocusaurusContext() {
  return {
    siteConfig: {
      title: 'n8n Brasil',
      tagline: 'Documentação em português',
      url: 'https://n8n-brasil.github.io',
      baseUrl: '/n8n-Doc-PT-BR/',
    },
  };
}

module.exports = {
  __esModule: true,
  default: MockLink,
  useDocusaurusContext: MockUseDocusaurusContext,
}; 