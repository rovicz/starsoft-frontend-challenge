# 🛍️ Starsoft - Desáfio Técnico "NFT Marketplace"

Este repositório contém a solução para o desafio técnico de Front-End Developer. O projeto consiste em um Marketplace de NFTs desenvolvido com **Next.js**, focado em performance, arquitetura escalável e experiência do usuário.

## 🚀 Tecnologias e Ferramentas

A escolha das tecnologias foi baseada nos requisitos do desafio e nas melhores práticas atuais de desenvolvimento web:

- **Core:** [Next.js (App Router)](https://nextjs.org/) e [React](https://react.dev/).
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Tipagem estática para robustez).
- **Server State & Caching:** [TanStack Query (React Query)](https://tanstack.com/query/latest) para gerenciamento assíncrono, cache e _Infinite Scroll_.
- **Global Client State:** [Redux Toolkit](https://redux-toolkit.js.org/) para gerenciamento do carrinho de compras.
- **Estilização:** [Styled Components](https://styled-components.com/) e [Framer Motion](https://www.framer.com/motion/) para animações fluidas.
- **Validação:** [Zod](https://zod.dev/) para schemas e validação de dados da API.
- **Testes:** [Jest](https://jestjs.io/) e [React Testing Library](https://testing-library.com/).
- **Infraestrutura:** [Docker](https://www.docker.com/) e Docker Compose.

---

---

## 🔧 Como Executar o Projeto

Para garantir a consistência do ambiente e atender aos requisitos do desafio, a aplicação deve ser executada via **Docker**.

### Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado.
- [Docker Compose](https://docs.docker.com/compose/install/) instalado.

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/rovicz/starsoft-frontend-challenge.git
    cd <NOME_DA_PASTA>
    ```

2.  **Suba o ambiente:**
    Execute o comando abaixo para construir a imagem e iniciar o servidor de desenvolvimento:

    ```bash
    docker-compose up
    ```

    _Obs: Na primeira execução, o Docker fará o download das dependências e a construção da imagem, o que pode levar alguns minutos._

3.  **Acesse a aplicação:**
    Abra seu navegador e acesse:
    👉 `http://localhost:3000`

---

## 🧪 Rodando os Testes

Para garantir que o ambiente de testes seja o mesmo da aplicação, execute os testes diretamente pelo Docker:

```bash
# Executa a suíte de testes completa
docker-compose run --rm app npm test

# Executa os testes e gera o relatório de coverage
docker-compose run --rm app npm run test:coverage
```
