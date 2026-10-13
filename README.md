<div align="center">

# 🎵 Spotify Web Player (Clone)

**Um clone moderno, responsivo e interativo da interface web do Spotify.**  
Desenvolvido com **Next.js**, **React 19**, **Tailwind CSS v4** e **TypeScript**.

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 📌 Sobre o Projeto

Este projeto é uma recriação fiel e aprimorada da interface do **Spotify Web Player**. Além do design refinado inspirado no aplicativo desktop original, a aplicação inclui um reprodutor de áudio funcional com síntese sonora via **Web Audio API**, permitindo uma experiência interativa completa sem necessidade de dependências externas.

---

## ✨ Funcionalidades Principais

- 🎧 **Player de Áudio Interativo**:
  - Reprodução/Pausa com síntese de acordes harmônicos em tempo real (Lo-Fi beats) gerados nativamente pela Web Audio API.
  - **Barra de Progresso (Seek Bar)**: tempo decorrido e duração total dinâmicos, com suporte a clique e avanço manual.
  - **Controle de Volume**: controle deslizante preciso e alternância de mudo com ícones dinâmicos (`VolumeX`, `Volume1`, `Volume2`).
  - **Controles de Reprodução**: avançar, retroceder, modo aleatório (*Shuffle*) e repetição (*Repeat*) com indicadores de estado ativo.

- 🎶 **Troca Dinâmica de Faixas**:
  - Clique em qualquer card de álbum ou mix para carregá-lo instantaneamente no player principal.
  - Indicador de equalizador animado exibido no item em reprodução.

- 🎨 **Design & Efeitos Visuais**:
  - **Gradiente Ambiente Dinâmico**: o cabeçalho adapta sua iluminação de fundo de acordo com a paleta de cores da música ativa.
  - **Saudação Inteligente**: exibe automaticamente *"Bom dia"*, *"Boa tarde"* ou *"Boa noite"* conforme o horário local do usuário.
  - **Botão de Play Flutuante**: animações suaves de elevação ao passar o mouse sobre os álbuns (*hover lift effect*).
  - **Scrollbar Personalizada**: barra de rolagem minimalista no padrão escuro do Spotify.

- 🔍 **Busca & Filtros em Tempo Real**:
  - Campo de pesquisa que filtra álbuns, artistas e faixas instantaneamente conforme você digita.
  - Filtros rápidos por categoria: **Tudo**, **Música** e **Podcasts**.

- ❤️ **Músicas Curtidas & Playlists**:
  - Curtir/descurtir músicas com contador atualizado em tempo real na barra lateral.
  - Botão **"Criar playlist"** para adicionar novas playlists personalizadas dinamicamente.

---

## 🛠️ Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** (v16.4 com Turbopack e App Router)
- **[React](https://react.dev/)** (v19)
- **[Tailwind CSS](https://tailwindcss.com/)** (v4)
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Lucide React](https://lucide.dev/)** (Ícones modernos)
- **[Web Audio API](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Audio_API)** (Engine de áudio nativa no navegador)

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 20 ou superior recomendada)
- Gerenciador de pacotes: `npm`, `pnpm` ou `yarn`

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/rafaelmm16/Spotify-Cover.git
   cd Spotify-Cover
   ```

2. **Instale as dependências:**
   ```bash
   # Dentro da pasta do projeto Next.js:
   cd tailwind-spotify
   npm install
   # ou usando pnpm:
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou a partir da pasta raiz:
   npm run dev
   ```

4. **Acesse no navegador:**
   - Abra [http://localhost:3000/Spotify-Cover](http://localhost:3000/Spotify-Cover)

---

## 📁 Estrutura do Projeto

```plaintext
Spotify-Cover/
├── .github/
│   └── workflows/
│       └── nextjs.yml          # Pipeline CI/CD para GitHub Pages
├── tailwind-spotify/
│   ├── public/                 # Capas dos álbuns e imagens
│   ├── src/
│   │   └── app/
│   │       ├── globals.css     # Estilos globais, animações e scrollbars
│   │       ├── layout.tsx      # Configuração de fontes, meta tags e layout raiz
│   │       └── page.tsx        # Aplicação principal (Player, Sidebar, Músicas)
│   ├── next.config.js          # Configuração de exportação e subdiretório
│   ├── package.json            # Dependências e scripts do Next.js
│   ├── tsconfig.json           # Configurações do compilador TypeScript
│   └── postcss.config.js       # Configuração do PostCSS / Tailwind
├── package.json                # Script proxy na raiz para atalho de execução
└── README.md                   # Documentação do repositório
```

---

## 🌐 Deploy no GitHub Pages

O projeto está configurado para exportação estática (`output: 'export'`) e deploy automático através do GitHub Actions definido em `.github/workflows/nextjs.yml`.

Para gerar a build de produção localmente:
```bash
npm run build
```
Os arquivos estáticos otimizados serão gerados na pasta `out/`.

---

## 👨‍💻 Autor

Desenvolvido por **[Rafael](https://github.com/rafaelmm16)**.  
Sinta-se à vontade para dar uma ⭐️ no projeto se gostou!