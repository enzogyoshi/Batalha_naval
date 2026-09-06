# Batalha Naval Web

Jogo de Batalha Naval desenvolvido em **HTML, CSS e JavaScript puro**, com persistência de dados via **Web Storage (localStorage)**. O projeto é dividido em três telas conectadas: formulário inicial, tabuleiro de jogo e ranking de pontuações.

---

## Sobre o projeto

O jogador preenche um formulário com nome e dificuldade, joga uma partida de Batalha Naval tentando afundar todos os navios sorteados no tabuleiro, e ao final (vitória ou derrota) pode consultar um ranking com as melhores pontuações já registradas no navegador.

---

## Telas

### 1. Tela Inicial (`index.html`)
- Formulário com campo de **nome** e seleção de **dificuldade**.
- Validação do nome via **expressão regular** (letras, números, espaços e alguns caracteres especiais, mínimo de 3 caracteres).
- Validação obrigatória da seleção de dificuldade.
- Dados salvos no `localStorage` antes de redirecionar para o jogo.

### 2. Tela do Jogo (`jogo.html`)
- Tabuleiro **10x10** gerado dinamicamente via JavaScript.
- Navios de **tamanhos variados**, sorteados aleatoriamente (horizontal ou vertical), respeitando limites do tabuleiro e distância mínima entre navios.
- Sistema de **vidas**, **pontuação** e **cronômetro em tempo real**.
- Feedback visual imediato ao clicar em uma célula (acerto/erro).
- Modal customizado ao final da partida (vitória ou derrota), com opções de jogar novamente ou ir para o ranking.
- Recupera os dados do jogador salvos na Tela Inicial.

### 3. Tela de Ranking (`ranking.html`)
- Tabela com todos os resultados de **vitórias** já registrados.
- Ordenado da **maior para a menor pontuação**.
- Dados persistidos e recuperados via `localStorage`.

Botões de navegação permitem retornar à tela inicial a partir do jogo ou do ranking a qualquer momento.

---

## Regras do jogo

### Tabuleiro
- Tamanho fixo: **10 colunas x 10 linhas** (100 células).

### Dificuldade e vidas
A dificuldade escolhida na Tela Inicial define a quantidade de vidas (tentativas de erro permitidas):

| Dificuldade | Vidas |
|---|---|
| Difícil     | 10 |
| Médio       | 15 |
| Fácil       | 20 |

*(Menos vidas = mais difícil, já que sobra menos margem para errar.)*

### Navios
- São sorteados **5 navios** por partida.
- Cada navio tem **tamanho aleatório entre 1 e 3 células**, em orientação horizontal ou vertical (também sorteada aleatoriamente).
- **Regra de distância mínima:** navios não podem ficar em células adjacentes entre si, nem mesmo na diagonal — sempre há pelo menos uma célula de água separando dois navios.
- Navios não podem se sobrepor nem ultrapassar os limites do tabuleiro.

### Pontuação
- Pontos só são concedidos quando um navio é **afundado por completo** (todas as suas células atingidas).
- A pontuação é **proporcional ao tamanho do navio**: cada célula do navio vale **5 pontos**.
  - Exemplo: um navio de tamanho 3 concede **15 pontos** ao ser totalmente afundado.
- Acertar água não concede nem retira pontos — apenas **não** desconta vida (o erro é o que desconta vida, não o acerto).
- Errar (acertar água) desconta **1 vida**.

### Cronômetro
- Inicia automaticamente ao carregar o jogo e é exibido **em tempo real**, atualizado a cada segundo.
- Para no momento em que a partida termina (vitória ou derrota).

### Condições de fim de jogo
- **Vitória:** todos os 5 navios são completamente afundados.
- **Derrota:** as vidas chegam a 0.
- Em ambos os casos, um modal exibe o resultado, a pontuação final e o tempo total de partida.
- **Apenas vitórias** são registradas no ranking (nome, pontuação, tempo e dificuldade).

---

## Estrutura de arquivos

```
├── index.html      # Tela 1 – Formulário inicial
├── form.js         # Lógica de validação e salvamento do formulário
├── jogo.html       # Tela 2 – Tabuleiro e lógica do jogo
├── script.js        # Lógica principal do jogo (tabuleiro, navios, pontuação, vidas, timer)
├── ranking.html    # Tela 3 – Ranking de pontuações
├── ranking.js      # Lógica de leitura, ordenação e exibição do ranking
└── style.css       # Estilos de todas as telas
```

---

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura das três telas.
- **CSS3** — estilização, incluindo Flexbox, CSS Grid (tabuleiro) e tabelas HTML (ranking).
- **JavaScript (Vanilla)** — toda a lógica do jogo, manipulação do DOM, eventos e persistência de dados.
- **Web Storage (`localStorage`)** — armazenamento dos dados do jogador e do ranking entre sessões.

---

## Como jogar

1. Abra `index.html` no navegador.
2. Preencha seu nome e escolha uma dificuldade.
3. Clique em **Start** para ir ao tabuleiro.
4. Clique nas células para tentar acertar os navios escondidos.
5. Acerte todos os navios antes que suas vidas acabem para vencer.
6. Ao final da partida, veja seu resultado no modal e, se desejar, confira sua posição no ranking.
