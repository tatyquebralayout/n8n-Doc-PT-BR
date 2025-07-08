# Script para remover todas as referências ao IonicIcon dos arquivos MD/MDX
Write-Host "Removendo referências ao IonicIcon dos arquivos de documentação..." -ForegroundColor Yellow

# Contar ocorrências antes
$beforeCount = (Get-ChildItem -Path 'docs' -Recurse -Include '*.md','*.mdx' | Select-String -Pattern 'IonicIcon' | Measure-Object).Count
Write-Host "Ocorrências encontradas: $beforeCount" -ForegroundColor Cyan

# Remover linhas de importação do IonicIcon
Write-Host "Removendo linhas de importação..." -ForegroundColor Green
Get-ChildItem -Path 'docs' -Recurse -Include '*.md','*.mdx' | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match "import IonicIcon from '@site/src/components/IonicIcon';") {
        $newContent = $content -replace "import IonicIcon from '@site/src/components/IonicIcon';`r?`n?", ""
        Set-Content $_.FullName $newContent -NoNewline
        Write-Host "Removida importação de: $($_.Name)" -ForegroundColor Green
    }
}

# Remover todas as tags <IonicIcon ... />
Write-Host "Removendo tags IonicIcon..." -ForegroundColor Green
Get-ChildItem -Path 'docs' -Recurse -Include '*.md','*.mdx' | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match '<IonicIcon') {
        $newContent = $content -replace '<IonicIcon[^>]*>', ''
        Set-Content $_.FullName $newContent -NoNewline
        Write-Host "Removidas tags IonicIcon de: $($_.Name)" -ForegroundColor Green
    }
}

# Contar ocorrências depois
$afterCount = (Get-ChildItem -Path 'docs' -Recurse -Include '*.md','*.mdx' | Select-String -Pattern 'IonicIcon' | Measure-Object).Count
Write-Host "Ocorrências restantes: $afterCount" -ForegroundColor Cyan

if ($afterCount -eq 0) {
    Write-Host "Todas as referências ao IonicIcon foram removidas com sucesso!" -ForegroundColor Green
} else {
    Write-Host "Ainda existem $afterCount ocorrências. Verifique manualmente." -ForegroundColor Red
} 