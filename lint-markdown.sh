#!/bin/bash

# Lint e corrige todos os arquivos Markdown do projeto

echo "Rodando markdownlint em todos os arquivos .md..."
npx markdownlint-cli2 "**/*.md"

echo "Aplicando correções automáticas..."
npx markdownlint-cli2 --fix "**/*.md"

echo "Lint e correção concluídos!" 