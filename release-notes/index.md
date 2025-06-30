---
title: Notas de Release
sidebar_position: 1
---

import { Icon } from '@iconify/react';
import Link from '@docusaurus/Link';

# <Icon icon="ph:newspaper-duotone" width="32" style={{ marginBottom: '-5px' }} /> Notas de Release

Bem-vindo(a) à nossa central de notas de release. Aqui você encontra as últimas atualizações, tanto do nosso projeto de documentação quanto do n8n oficial.

---

<div className="card-container">
  <div className="card">
    <div className="card__header">
      <h3><Icon icon="ph:book-open-duotone" /> Nossa Documentação</h3>
    </div>
    <div className="card__body">
      <p>Veja as últimas atualizações, correções e melhorias feitas em nosso projeto de documentação.</p>
    </div>
    <div className="card__footer">
      <Link to="/release-notes/nossa-doc" className="button button--primary button--block">
        Ver Releases da Doc
      </Link>
    </div>
  </div>
  <div className="card">
    <div className="card__header">
      <h3><Icon icon="ph:rocket-duotone" /> n8n Oficial</h3>
    </div>
    <div className="card__body">
      <p>Acesse as notas de release oficiais do n8n, traduzidas e sincronizadas automaticamente para você.</p>
    </div>
    <div className="card__footer">
      <Link to="/release-notes/n8n-oficial" className="button button--secondary button--block">
        Ver Releases do n8n
      </Link>
    </div>
  </div>
</div> 