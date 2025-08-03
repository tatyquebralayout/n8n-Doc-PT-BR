// Configuração do KaTeX para suporte a Unicode
import katex from 'katex';

// Configurar KaTeX para ser mais tolerante com Unicode
katex.setOptions({
  strict: false,
  trust: true,
  macros: {
    "\\RR": "\\mathbb{R}",
    "\\NN": "\\mathbb{N}",
    "\\ZZ": "\\mathbb{Z}",
    "\\QQ": "\\mathbb{Q}",
    "\\CC": "\\mathbb{C}"
  },
  minRuleThickness: 0.05,
  colorIsTextColor: false,
  maxSize: Infinity,
  maxExpand: 1000,
  strict: false,
  trust: true,
  output: 'html'
});

// Função para renderizar matemática com suporte a Unicode
export function renderMathWithUnicode(tex, displayMode = false) {
  try {
    return katex.renderToString(tex, {
      displayMode,
      strict: false,
      trust: true,
      throwOnError: false
    });
  } catch (error) {
    console.warn('Erro ao renderizar matemática:', error);
    return `<span class="math-error">${tex}</span>`;
  }
}

export default katex; 