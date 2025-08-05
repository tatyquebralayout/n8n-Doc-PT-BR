# Dados Binários e Arquivos

O n8n oferece suporte robusto para trabalhar com dados binários e arquivos, permitindo upload, download, processamento e manipulação de diversos tipos de arquivos. Esta seção aborda como trabalhar eficientemente com arquivos em seus workflows.

## Visão Geral

Dados binários são informações não-textuais como imagens, documentos, vídeos, arquivos ZIP e outros formatos. O n8n trata esses dados de forma especial para garantir integridade e performance durante o processamento.

## Tipos de Dados Binários Suportados

### Formatos Comuns

- **Imagens**: JPG, PNG, GIF, SVG, WebP
- **Documentos**: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
- **Arquivos de Mídia**: MP3, MP4, AVI, MOV
- **Arquivos Compactados**: ZIP, RAR, 7Z, TAR.GZ
- **Dados Estruturados**: JSON, XML, CSV (como binário)
- **Arquivos de Sistema**: LOG, CONFIG, DAT

### Estrutura de Dados Binários

No n8n, dados binários são representados como objetos com propriedades específicas:

```json\n{\n  "data": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",\n  "mimeType": "image/png",\n  "fileName": "imagem.png",\n  "directory": "/uploads/",\n  "fileSize": 1024\n}\n```\n\n## Upload e Download de Arquivos\n\n### Upload de Arquivos\n\nConfigure nodes para receber uploads de arquivos:\n\n```javascript\n// Exemplo: Webhook para upload de arquivo\n{\n  "httpMethod": "POST",\n  "path": "upload",\n  "responseMode": "responseNode",\n  "options": {\n    "rawBody": true,\n    "responseHeaders": {\n      "Content-Type": "application/json"\n    }\n  }\n}\n```\n\n### Download de Arquivos\n\nBaixe arquivos de APIs e serviços externos:\n\n```javascript\n// Exemplo: Download de arquivo via HTTP Request\n{\n  "url": "https://api.exemplo.com/arquivos/123",\n  "method": "GET",\n  "options": {\n    "response": {\n      "response": {\n        "responseFormat": "file"\n      }\n    }\n  }\n}\n```\n\n## Processamento de Arquivos\n\n### Conversão de Formatos\n\nConverta arquivos entre diferentes formatos:\n\n```javascript\n// Converter imagem para base64\nconst imagemBase64 = $input.first().json.data;\nconst buffer = Buffer.from(imagemBase64, 'base64');\n\n// Converter para outro formato usando biblioteca externa\nconst sharp = require('sharp');\nconst imagemConvertida = await sharp(buffer)\n  .resize(800, 600)\n  .jpeg({ quality: 80 })\n  .toBuffer();\n\nreturn {\n  data: imagemConvertida.toString('base64'),\n  mimeType: 'image/jpeg',\n  fileName: 'imagem_convertida.jpg'\n};\n```\n\n### Compressão e Descompressão\n\nTrabalhe com arquivos compactados:\n\n```javascript\n// Comprimir arquivos\nconst archiver = require('archiver');\nconst fs = require('fs');\n\nconst output = fs.createWriteStream('arquivos.zip');\nconst archive = archiver('zip', { zlib: { level: 9 }});\n\narchive.pipe(output);\narchive.file('documento.pdf', { name: 'documento.pdf' });\narchive.file('imagem.jpg', { name: 'imagem.jpg' });\nawait archive.finalize();\n\n// Descomprimir arquivos\nconst unzipper = require('unzipper');\nconst extract = await unzipper.Open.file('arquivos.zip');\nconst arquivos = await extract.files;\n```\n\n## Manipulação de Imagens\n\n### Redimensionamento e Otimização\n\n```javascript\n// Redimensionar imagem mantendo proporção\nconst sharp = require('sharp');\n\nconst processarImagem = async (imagemBase64, largura, altura) => {\n  const buffer = Buffer.from(imagemBase64, 'base64');\n  \n  const imagemProcessada = await sharp(buffer)\n    .resize(largura, altura, {\n      fit: 'inside',\n      withoutEnlargement: true\n    })\n    .jpeg({ quality: 85, progressive: true })\n    .toBuffer();\n    \n  return {\n    data: imagemProcessada.toString('base64'),\n    mimeType: 'image/jpeg',\n    fileName: 'imagem_otimizada.jpg'\n  };\n};\n```\n\n### Aplicação de Filtros\n\n```javascript\n// Aplicar filtros em imagens\nconst aplicarFiltro = async (imagemBase64, filtro) => {\n  const buffer = Buffer.from(imagemBase64, 'base64');\n  let imagemProcessada = sharp(buffer);\n  \n  switch(filtro) {\n    case 'grayscale':\n      imagemProcessada = imagemProcessada.grayscale();\n      break;\n    case 'blur':\n      imagemProcessada = imagemProcessada.blur(5);\n      break;\n    case 'sharpen':\n      imagemProcessada = imagemProcessada.sharpen();\n      break;\n  }\n  \n  const resultado = await imagemProcessada.toBuffer();\n  return {\n    data: resultado.toString('base64'),\n    mimeType: 'image/jpeg',\n    fileName: `imagem_${filtro}.jpg`\n  };\n};\n```\n\n## Processamento de Documentos\n\n### Extração de Texto\n\n```javascript\n// Extrair texto de PDF\nconst pdf = require('pdf-parse');\n\nconst extrairTextoPDF = async (pdfBase64) => {\n  const buffer = Buffer.from(pdfBase64, 'base64');\n  const data = await pdf(buffer);\n  \n  return {\n    texto: data.text,\n    paginas: data.numpages,\n    info: data.info\n  };\n};\n```\n\n### Conversão de Documentos\n\n```javascript\n// Converter DOCX para PDF\nconst libre = require('libreoffice-convert');\nconst { promisify } = require('util');\n\nconst converter = promisify(libre.convert);\n\nconst converterParaPDF = async (docxBase64) => {\n  const buffer = Buffer.from(docxBase64, 'base64');\n  const pdfBuffer = await converter(buffer, 'pdf', undefined);\n  \n  return {\n    data: pdfBuffer.toString('base64'),\n    mimeType: 'application/pdf',\n    fileName: 'documento.pdf'\n  };\n};\n```\n\n## Armazenamento e Gerenciamento\n\n### Upload para Cloud Storage\n\n```javascript\n// Upload para AWS S3\nconst AWS = require('aws-sdk');\nconst s3 = new AWS.S3();\n\nconst uploadParaS3 = async (arquivoBase64, nomeArquivo, bucket) => {\n  const buffer = Buffer.from(arquivoBase64, 'base64');\n  \n  const params = {\n    Bucket: bucket,\n    Key: nomeArquivo,\n    Body: buffer,\n    ContentType: 'application/octet-stream',\n    ACL: 'private'\n  };\n  \n  const resultado = await s3.upload(params).promise();\n  return {\n    url: resultado.Location,\n    key: resultado.Key,\n    etag: resultado.ETag\n  };\n};\n```\n\n### Validação de Arquivos\n\n```javascript\n// Validar tipo e tamanho de arquivo\nconst validarArquivo = (arquivoBase64, mimeType, tamanhoMaximo) => {\n  const buffer = Buffer.from(arquivoBase64, 'base64');\n  const tamanho = buffer.length;\n  \n  // Validar tamanho\n  if (tamanho > tamanhoMaximo) {\n    throw new Error(`Arquivo muito grande: ${tamanho} bytes (máximo: ${tamanhoMaximo})`);\n  }\n  \n  // Validar tipo MIME\n  const tiposPermitidos = [\n    'image/jpeg', 'image/png', 'image/gif',\n    'application/pdf', 'application/msword',\n    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'\n  ];\n  \n  if (!tiposPermitidos.includes(mimeType)) {\n    throw new Error(`Tipo de arquivo não permitido: ${mimeType}`);\n  }\n  \n  return true;\n};\n```\n\n## Workflows Práticos\n\n### Workflow: Processamento de Imagens em Lote\n\n```mermaid\ngraph TD\n    A[Webhook Trigger] --> B[HTTP Request: Listar Imagens]\n    B --> C[Split In Batches]\n    C --> D[Processar Imagem]\n    D --> E[Redimensionar]\n    E --> F[Otimizar Qualidade]\n    F --> G[Upload para Cloud]\n    G --> H[Salvar Metadados]\n    H --> I[Next Batch]\n    I --> D\n```\n\n### Workflow: Conversão de Documentos\n\n```mermaid\ngraph TD\n    A[Schedule Trigger] --> B[Listar Arquivos DOCX]\n    B --> C[Filter: Novos Arquivos]\n    C --> D[Converter para PDF]\n    D --> E[Extrair Texto]\n    E --> F[Salvar no Banco]\n    F --> G[Enviar Notificação]\n```\n\n## Configurações de Performance\n\n### Otimização de Memória\n\n```javascript\n// Processar arquivos grandes em chunks\nconst processarArquivoGrande = async (arquivoBase64, chunkSize = 1024 * 1024) => {\n  const buffer = Buffer.from(arquivoBase64, 'base64');\n  const chunks = [];\n  \n  for (let i = 0; i < buffer.length; i += chunkSize) {\n    const chunk = buffer.slice(i, i + chunkSize);\n    chunks.push(chunk);\n  }\n  \n  // Processar cada chunk\n  const resultados = [];\n  for (const chunk of chunks) {\n    const resultado = await processarChunk(chunk);\n    resultados.push(resultado);\n  }\n  \n  return Buffer.concat(resultados);\n};\n```\n\n### Cache de Arquivos\n\n```javascript\n// Implementar cache para arquivos frequentemente acessados\nconst cache = new Map();\n\nconst obterArquivoComCache = async (id, ttl = 3600000) => {\n  const cacheKey = `arquivo_${id}`;\n  \n  if (cache.has(cacheKey)) {\n    const cached = cache.get(cacheKey);\n    if (Date.now() - cached.timestamp < ttl) {\n      return cached.data;\n    }\n  }\n  \n  // Buscar do storage\n  const arquivo = await buscarArquivo(id);\n  cache.set(cacheKey, {\n    data: arquivo,\n    timestamp: Date.now()\n  });\n  \n  return arquivo;\n};\n```\n\n## Tratamento de Erros\n\n### Erros Comuns e Soluções\n\n```javascript\n// Tratamento robusto de erros\nconst processarArquivoSeguro = async (arquivoBase64) => {\n  try {\n    // Validar entrada\n    if (!arquivoBase64) {\n      throw new Error('Dados do arquivo não fornecidos');\n    }\n    \n    // Verificar formato base64 válido\n    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(arquivoBase64)) {\n      throw new Error('Formato base64 inválido');\n    }\n    \n    const buffer = Buffer.from(arquivoBase64, 'base64');\n    \n    // Verificar tamanho mínimo\n    if (buffer.length < 10) {\n      throw new Error('Arquivo muito pequeno');\n    }\n    \n    return await processarArquivo(buffer);\n    \n  } catch (error) {\n    console.error('Erro ao processar arquivo:', error.message);\n    \n    // Retornar erro estruturado\n    return {\n      success: false,\n      error: error.message,\n      timestamp: new Date().toISOString()\n    };\n  }\n};\n```

## Boas Práticas

### Segurança

- **Valide sempre** o tipo e tamanho dos arquivos
- **Use HTTPS** para transferência de arquivos
- **Implemente autenticação** para uploads
- **Sanitize nomes de arquivos** para evitar path traversal
- **Limite tipos de arquivo** permitidos

### Performance

- **Processe arquivos grandes** em chunks
- **Use streams** para arquivos muito grandes
- **Implemente cache** para arquivos frequentemente acessados
- **Comprima arquivos** antes do upload
- **Use CDN** para distribuição de arquivos

### Organização

- **Estruture pastas** logicamente
- **Use nomes descritivos** para arquivos
- **Implemente versionamento** de arquivos
- **Mantenha metadados** organizados
- **Faça backup regular** dos arquivos

## Recursos Adicionais

### Bibliotecas Úteis

- **Sharp**: Processamento de imagens
- **PDF-lib**: Manipulação de PDFs
- **Archiver**: Compressão de arquivos
- **Multer**: Upload de arquivos
- **File-type**: Detecção de tipo de arquivo

### APIs e Serviços

- **AWS S3**: Armazenamento em nuvem
- **Google Cloud Storage**: Armazenamento alternativo
- **Cloudinary**: Processamento de imagens
- **DocRaptor**: Conversão de documentos

---

**Próximo**: [Transformações de Dados](./data-structure) - Técnicas avançadas de transformação e manipulação de dados
