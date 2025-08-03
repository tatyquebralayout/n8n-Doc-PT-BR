import React, { useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export default function Navbar(): JSX.Element {
  const { colorMode, setColorMode } = useColorMode();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleTheme = () => {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar busca aqui
    console.log('Searching for:', searchTerm);
  };

  return (
    <nav className="navbar" data-testid="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <a href="/" className="navbar-logo">
            n8n Brasil
          </a>
        </div>

        <div className="navbar-items">
          <div className="navbar-item">
            <button
              className="search-button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              data-testid="search-button"
              aria-label="Abrir busca"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>

          <div className="navbar-item">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              data-testid="theme-toggle"
              aria-label="Alternar tema"
            >
              {colorMode === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="search-overlay" data-testid="search-overlay">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Buscar na documentação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="search-input"
                className="search-input"
                autoFocus
              />
              <button type="submit" className="search-submit">
                Buscar
              </button>
            </form>
            <div className="search-results" data-testid="search-results">
              {/* Resultados da busca apareceriam aqui */}
              <div className="search-result" data-testid="search-result">
                <a href="/primeiros-passos">Primeiros Passos</a>
              </div>
              <div className="search-result" data-testid="search-result">
                <a href="/integracoes">Integrações</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 