# Painel de Ideias

Aplicação web feita com React 18 e Vite para registrar ideias de projetos, marcar ideias concluídas e remover itens que não são mais necessários.

## Funcionalidades

- **Adicionar ideias:** formulário controlado e validação para impedir ideias vazias ou com apenas espaços.
- **Listar ideias:** cada item é renderizado com `.map()` e possui um identificador usado como `key`.
- **Concluir ideias:** checkbox que alterna o estado e aplica texto riscado.
- **Remover ideias:** botão de remoção que usa `.filter()`.
- **Contadores em tempo real:** total, concluídas e em andamento são calculados a partir do estado da lista.
- **Filtrar ideias:** visualizar todas, pendentes ou concluídas.
- **Limite de caracteres:** o campo permite até 120 caracteres e mostra o contador.

## Tecnologias

- React 18
- Vite
- JavaScript (ES Modules)
- CSS puro

Não são usadas bibliotecas de interface, Tailwind, `localStorage` ou `useEffect`. As ideias ficam apenas no estado do React e são perdidas quando a página é recarregada, conforme o escopo do trabalho.

## Como executar

É necessário ter Node.js instalado.

1. Abra o terminal na pasta do projeto.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Abra no navegador o endereço mostrado pelo Vite no terminal (normalmente `http://localhost:5173`).

Para gerar a versão de produção:

```bash
npm run build
```

## Estrutura de arquivos

```text
painel-de-ideias/
├── index.html
├── package.json
├── README.md
├── public/
└── src/
    ├── App.jsx
    ├── main.jsx
    └── styles.css
```

## Decisões de implementação

- `ideas` é o único estado que armazena a lista e o estado de conclusão de cada ideia. Os contadores são derivados dessa lista, evitando estados duplicados.
- `newIdea` controla o campo de texto por meio de `value` e `onChange`.
- `error` controla a mensagem de validação. A mensagem é limpa quando o usuário digita novamente ou quando uma ideia válida é adicionada.
- `filter` controla qual subconjunto da lista aparece na tela; ele não altera nem duplica a lista original.
- As atualizações usam a forma funcional do setter (`setIdeas((currentIdeas) => ...)`) para trabalhar com o estado anterior.
- A conclusão usa `.map()` e spread (`{ ...idea, done: !idea.done }`) para criar um novo objeto, sem mutar o existente.
- A remoção usa `.filter()` para criar um novo array sem o item escolhido.
- `Date.now()` gera o identificador de cada ideia no momento do cadastro.
- Não há persistência em armazenamento local nem efeitos, conforme os requisitos do trabalho.

## Checklist de teste

- [ ] `npm run dev` inicia sem erros.
- [ ] Adicionar uma ideia faz o item aparecer na lista.
- [ ] Enviar o formulário vazio ou só com espaços exibe a mensagem de validação.
- [ ] Digitar novamente limpa a mensagem de erro.
- [ ] Marcar o checkbox risca o texto e atualiza os contadores.
- [ ] Desmarcar o checkbox retorna a ideia para pendente.
- [ ] Remover uma ideia atualiza a lista e os contadores.
- [ ] Os filtros Todas, Pendentes e Concluídas funcionam.
- [ ] Recarregar a página limpa as ideias, conforme esperado.
- [ ] `npm run build` termina sem erros.

## Sugestão de commits

Faça commits pequenos ao longo do desenvolvimento, em vez de enviar tudo em um único commit. Por exemplo:

1. `chore: create Vite React project`
2. `feat: add idea form and validation`
3. `feat: list, complete and remove ideas`
4. `style: create responsive ideas dashboard`
5. `docs: add project README`

Adapte os commits ao que realmente foi feito e faça-os em momentos diferentes do desenvolvimento.
