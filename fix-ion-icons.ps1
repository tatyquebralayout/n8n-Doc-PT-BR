# Script para corrigir componentes ion-icon em arquivos MDX
# Substitui <ion-icon> por <IonicIcon> para compatibilidade com MDX v3

$files = Get-ChildItem -Path "docs" -Filter "*.mdx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Substitui <ion-icon> por <IonicIcon> e fecha com />
    $newContent = $content -replace '<ion-icon([^>]*)></ion-icon>', '<IonicIcon$1 />'
    
    # Se o conteúdo foi alterado, salva o arquivo
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "Corrigido: $($file.FullName)"
    }
}

Write-Host "Processo concluído!" 