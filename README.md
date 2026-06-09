# Projeto ZL Food

Reorganização da estrutura do projeto para um layout de ativos mais claro e manutenção mais simples.

## Estrutura reorganizada

- `index.html` — página de login
- `cadastro.html` — página de cadastro de usuários
- `EsqueciMinhaSenha.html` — página de recuperação de senha
- `cliente.html` — painel de cliente
- `admin.html` — painel de administração / cadastro de usuários
- `produtos.html` — cadastro de produtos
- `entregador.html` — tela de rota para entregador
- `meusCupons.html` — página de cupons

### Ativos

- `assets/css/style.css` — estilo principal
- `assets/js/app.js` — JavaScript central com login, cadastro, produtos e recuperação de senha
- `assets/images/` — imagens, ícones e manifest

## O que foi reorganizado

- Centralização de CSS em `assets/css/style.css`
- Centralização de JavaScript em `assets/js/app.js`
- Centralização de imagens e manifest em `assets/images/`
- Corrigidas referências de caminho em todas as páginas principais
- Consolidado o comportamento de login, cadastro, produtos e recuperação de senha em um único arquivo JS

## Como usar

1. Abra `index.html` no navegador.
2. Use o formulário de login para acessar a página do cliente.
3. Utilize o menu para navegar entre cadastro, produtos e recuperação de senha.
