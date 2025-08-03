import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Configuração do sidebar para a seção Contribuir
 * Esta é uma instância separada de documentação
 */
const sidebarContribuir: SidebarsConfig = {
  contribuirSidebar: [
    'index',
    // Seção descomentada - vamos testar se os problemas com MDX v3 foram resolvidos
    {
      type: 'category',
      label: 'Contribuir com Esta Documentação',
      items: [
        'esta-documentacao/index',
        {
          type: 'category',
          label: 'Entendendo o Projeto',
          items: [
            'esta-documentacao/entendendo-o-projeto/index',
            'esta-documentacao/entendendo-o-projeto/sobre-o-projeto',
            'esta-documentacao/entendendo-o-projeto/como-contribuir',
            'esta-documentacao/entendendo-o-projeto/codigo-conduta',
            'esta-documentacao/entendendo-o-projeto/sistema-overlaps',
            'esta-documentacao/entendendo-o-projeto/mentoria',
            'esta-documentacao/entendendo-o-projeto/roadmap',
          ],
        },
        {
          type: 'category',
          label: 'Primeiros Passos',
          items: [
            'esta-documentacao/primeiros-passos/index',
            'esta-documentacao/primeiros-passos/getting-started',
            'esta-documentacao/primeiros-passos/exemplos-praticos',
          ],
        },
        {
          type: 'category',
          label: 'Padrões e Estilo',
          items: [
            'esta-documentacao/padroes-e-estilo/index',
            'esta-documentacao/padroes-e-estilo/guia-de-estilo',
            'esta-documentacao/padroes-e-estilo/intro',
            'esta-documentacao/padroes-e-estilo/markdown-features',
            'esta-documentacao/padroes-e-estilo/design-system',
            'esta-documentacao/padroes-e-estilo/paleta-cores',
          ],
        },
        {
          type: 'category',
          label: 'Tradução e Localização',
          items: [
            'esta-documentacao/traducao-e-localizacao/index',
            'esta-documentacao/traducao-e-localizacao/guia-traducao',
          ],
        },
        {
          type: 'category',
          label: 'Recursos Técnicos',
          items: [
            'esta-documentacao/recursos-tecnicos/index',
            'esta-documentacao/recursos-tecnicos/docusaurus-folder',
            'esta-documentacao/recursos-tecnicos/paleta-cores',
            'esta-documentacao/recursos-tecnicos/validacao-overlaps',
          ],
        },
        {
          type: 'category',
          label: 'Suporte e Dúvidas',
          items: [
            'esta-documentacao/suporte-e-duvidas/index',
            'esta-documentacao/suporte-e-duvidas/onde-buscar-ajuda',
          ],
        },
        'esta-documentacao/guidelines',
      ],
    },
    {
      type: 'category',
      label: 'Contribuir com n8n Oficial',
      items: [
        'n8n-oficial/index',
        'n8n-oficial/contribuir-codigo-e-docs',
        'n8n-oficial/contribuir-community',
        'n8n-oficial/contribuir-modelos',
        'n8n-oficial/adicionar-casos-uso',
        'n8n-oficial/afiliados-e-creators',
        'n8n-oficial/referral-vagas',
      ],
    },
  ],
};

export default sidebarContribuir; 