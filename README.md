# Validador de Vouchers - Promoção Hambúrguer

Um sistema moderno e responsivo desenvolvido em React para validação de vouchers de uma promoção de hambúrguer. O projeto inclui validação de CNPJ, controle de vouchers únicos e persistência de dados no localStorage.

## 🚀 Funcionalidades

### ✅ Validação de CNPJ
- Campo de entrada para CNPJ com validação de formato
- Verificação contra lista de CNPJs participantes
- Validação usando algoritmo de dígitos verificadores
- Mensagens de feedback para usuário

### 🎫 Sistema de Vouchers
- Campo para códigos de voucher (6 caracteres)
- Validação de vouchers únicos (não permite duplicatas)
- Armazenamento no localStorage
- Contador de vouchers validados

### 📊 Controle e Estatísticas
- Contador persistente de vouchers usados
- Lista de vouchers cadastrados com CNPJ e data
- Botão para limpar histórico
- Interface para debug e teste

### 🎨 Interface Moderna
- Design responsivo com Tailwind CSS
- Componentes UI do shadcn/ui
- Ícones do Lucide React
- Gradiente moderno e cores temáticas
- Feedback visual com alertas coloridos

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones
- **localStorage** - Persistência de dados

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou pnpm

## 🔧 Instalação e Execução

### Desenvolvimento Local

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd voucher-validator

# Instale as dependências
npm install
# ou
pnpm install

# Execute o servidor de desenvolvimento
npm run dev
# ou
pnpm dev

# Acesse http://localhost:5173
```

### Build para Produção

```bash
# Gere o build de produção
npm run build
# ou
pnpm build

# Preview do build
npm run preview
# ou
pnpm preview
```

## 🌐 Deploy na Vercel

### Método 1: Via CLI da Vercel

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Faça login na Vercel
vercel login

# Deploy do projeto
vercel

# Para deploy em produção
vercel --prod
```

### Método 2: Via GitHub + Vercel Dashboard

1. Faça push do código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Conecte sua conta GitHub
4. Importe o repositório
5. Configure as variáveis (se necessário)
6. Deploy automático!

### Configurações da Vercel

O projeto inclui um arquivo `vercel.json` com as configurações otimizadas:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## 🧪 Como Testar

### CNPJs de Teste
Use qualquer um dos CNPJs abaixo para testar a validação:

- `11.222.333/0001-81`
- `12.345.678/0001-95`
- `98.765.432/0001-10`
- `55.444.333/0001-22`
- `77.888.999/0001-33`

### Fluxo de Teste

1. **Validação de CNPJ:**
   - Digite um CNPJ válido da lista acima
   - Clique em "Validar Participação"
   - Verifique se aparece a mensagem de sucesso

2. **Validação de Voucher:**
   - Digite um código de 6 caracteres (ex: TESTE1)
   - Clique em "Validar Voucher"
   - Verifique se o contador aumenta

3. **Teste de Duplicata:**
   - Tente usar o mesmo voucher novamente
   - Verifique se aparece a mensagem "Voucher já foi usado"

4. **Persistência:**
   - Recarregue a página
   - Verifique se os dados permanecem

## 📁 Estrutura do Projeto

```
voucher-validator/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ui/          # Componentes shadcn/ui
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos globais
│   ├── index.css        # Estilos base
│   └── main.jsx         # Entry point
├── index.html           # Template HTML
├── package.json         # Dependências
├── vercel.json          # Configuração Vercel
├── vite.config.js       # Configuração Vite
└── README.md           # Este arquivo
```

## 🔒 Validação de CNPJ

O sistema implementa validação completa de CNPJ incluindo:

- Verificação de formato (XX.XXX.XXX/XXXX-XX)
- Validação de dígitos verificadores
- Verificação contra lista de participantes
- Formatação automática

## 💾 Armazenamento de Dados

Os dados são armazenados no localStorage do navegador:

- `vouchersUsados`: Array com vouchers cadastrados
- `contadorVouchers`: Número total de vouchers validados

## 🎯 Funcionalidades Extras

- **Botão "Novo CNPJ"**: Permite validar outro CNPJ
- **Lista de Vouchers**: Mostra histórico para debug
- **Limpar Histórico**: Remove todos os dados salvos
- **CNPJs de Teste**: Lista visível para facilitar testes

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🐛 Solução de Problemas

### Build Falha
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Erro de Dependências
```bash
# Use a versão exata do Node.js
nvm use 18
npm install
```

### Deploy na Vercel Falha
- Verifique se o `vercel.json` está presente
- Confirme que o build local funciona
- Verifique os logs no dashboard da Vercel

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de demonstração.

## 👨‍💻 Desenvolvedor

Desenvolvido com React, Tailwind CSS e muito ☕ por Manus AI.

---

**Nota**: Este é um projeto de demonstração. Em produção, recomenda-se implementar validações no backend e usar banco de dados real para armazenamento de dados.

