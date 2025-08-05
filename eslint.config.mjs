import js from '@eslint/js';

const reactPlugin = (await import('eslint-plugin-react')).default;
const tsPlugin = (await import('@typescript-eslint/eslint-plugin')).default;
const tsParser = (await import('@typescript-eslint/parser')).default;

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        FormData: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        history: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        alert: 'readonly',
        confirm: 'readonly',
        prompt: 'readonly',
        
        // Node.js globals
        module: 'writable',
        exports: 'writable',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
        
        // Common globals
        self: 'readonly',
        performance: 'readonly',
        queueMicrotask: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly',
        
        // Web Workers
        Worker: 'readonly',
        MessageChannel: 'readonly',
        
        // React DevTools
        __REACT_DEVTOOLS_GLOBAL_HOOK__: 'readonly',
        
        // Prism (syntax highlighting)
        Prism: 'readonly',
        
        // DOM APIs
        Element: 'readonly',
        Node: 'readonly',
        NodeList: 'readonly',
        NodeFilter: 'readonly',
        XMLHttpRequest: 'readonly',
        AbortController: 'readonly',
        getComputedStyle: 'readonly',
        matchMedia: 'readonly',
        reportError: 'readonly',
        
        // Modern JS
        Iterator: 'readonly',
        AsyncIterator: 'readonly',
        SuppressedError: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        FormData: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        history: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        
        // Node.js globals
        module: 'writable',
        exports: 'writable',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        Buffer: 'readonly',
        
        // Common globals
        self: 'readonly',
        performance: 'readonly',
        queueMicrotask: 'readonly',
        
        // React DevTools
        __REACT_DEVTOOLS_GLOBAL_HOOK__: 'readonly',
        
        // Prism
        Prism: 'readonly',
        
        // DOM APIs
        Element: 'readonly',
        Node: 'readonly',
        NodeList: 'readonly',
        NodeFilter: 'readonly',
        XMLHttpRequest: 'readonly',
        AbortController: 'readonly',
        getComputedStyle: 'readonly',
        matchMedia: 'readonly',
        reportError: 'readonly',
        
        // Performance APIs
        PerformanceObserver: 'readonly',
        PerformanceEntry: 'readonly',
        PerformanceNavigationTiming: 'readonly',
        PerformanceResourceTiming: 'readonly',
        PerformancePaintTiming: 'readonly',
        PerformanceMark: 'readonly',
        PerformanceMeasure: 'readonly',
        
        // Service Worker APIs
        caches: 'readonly',
        Cache: 'readonly',
        CacheStorage: 'readonly',
        
        // Google Analytics
        gtag: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-undef': 'off', // TypeScript handles this
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: [
      'build/**',
      'node_modules/**',
      '.docusaurus/**',
      'dist/**',
      '*.min.js',
      '**/*.min.js',
      'scripts/**',
      '*.js',
      '*.mjs',
      'check-sidebar-links.js',
    ],
  },
]; 