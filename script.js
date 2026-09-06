let inicioJogo = Date.now()
let pontuacao = document.getElementById("pontuacao")
let pontosTotais = 0
let intervaloTimer = setInterval(exibirTempo, 1000)
let rankJogador = JSON.parse(localStorage.getItem("rankJogador")) || []
let jogador = JSON.parse(localStorage.getItem("jogador"))
if (!jogador) {
     window.location.href = "/index.html"
}
document.getElementById("nomeJogador").textContent = jogador.nome
let vidas = parseInt(jogador.dificuldade)
atualizarVida(vidas)

let tabelaJogo = document.getElementById("board")

let finalJogo = false

let btnRetry = document.getElementById("btnTentarNovamente")
let btnRanking = document.getElementById("btnVerRanking")

for (let linha = 0; linha < 10; linha++) {
    for (let coluna = 0; coluna < 10; coluna++){
        const celula = document.createElement("div")
        celula.classList = "cell"
        celula.dataset.x = coluna
        celula.dataset.y = linha
        tabelaJogo.appendChild(celula)
    }
}

matrizJogo = []
for (let i = 0; i < 10; i++){
    const linhaJogo = []

    for (let j = 0; j < 10; j++){
        let lugar = {"temNavio": false, "foiAtingido": false}
        linhaJogo.push(lugar)
    }
    matrizJogo.push(linhaJogo)
}
let listaNavios = []
let navios = 0
while (navios < 5) {
    let orientacaoSorteada = ""
    const linhaSorteada = Math.floor(Math.random() * 10)
    const colunaSorteada = Math.floor(Math.random() * 10)
    if (Math.random() < 0.5) {
        orientacaoSorteada = "h"
    } else {
        orientacaoSorteada = "v"
    }
    const tamanhoSorteado = Math.floor(Math.random() * (4 - 1) + 1)
    const listaPos = calcularPosicoesNavio(linhaSorteada, colunaSorteada, tamanhoSorteado, orientacaoSorteada)
    if(posicaoValida(listaPos)){
        for (let pos of listaPos) {
            matrizJogo[pos.linha][pos.coluna]["temNavio"] = true
        }
        listaNavios.push(listaPos)
    } else{
        continue
    }
        navios++
    
}
console.log(matrizJogo)

tabelaJogo.addEventListener('click', function(event){

    const clicado = event.target
    console.log(clicado.dataset)
    const x = parseInt(clicado.dataset.x)
    const y = parseInt(clicado.dataset.y)

    if (verificarClic(x, y ) || finalJogo){
        return
    } else {
        matrizJogo[y][x]["foiAtingido"] = true
        if (verificarNav(x, y)) {
            clicado.classList.add("acertou")
            pontosTotais += verificarNavAfundado(encontrarNav(x, y))
            pontuacao.textContent = "PONTOS: " + pontosTotais
            verificarVitoria(contaNavAfundado(listaNavios))
        } else{
            clicado.classList.add("errou")
            vidas -= 1
            atualizarVida(vidas)   
            verificarVidas(vidas)
        }
    }
})

btnRetry.addEventListener('click', function() {
    window.location.reload()
})
btnRanking.addEventListener('click', function() {
    window.location.href = "/ranking.html"
})

function verificarNav(x, y) {
    if (matrizJogo[y][x]["temNavio"] === true) {
        return true
    } else{
        return false
    }
}

function verificarClic(x, y){
    if (matrizJogo[y][x]["foiAtingido"] === true) {
        return true
    } else{
        return false
    }
}

function verificarVitoria(contador) {
    if (contador === navios) {
        fimJogo(true)
        
    }
}

function verificarVidas(vidas) {
    if (vidas === 0) {
        fimJogo(false)
    }
}

function atualizarVida(vidas) {
    document.getElementById("vidasJogador").textContent = "VIDAS: " + vidas
}

function exibirTempo() {
    return document.getElementById("timer").textContent = "TEMPO: " + Math.floor((Date.now() - inicioJogo) / 1000) + "s"
}

function fimJogo(resultado) {
    let tempoJogo = Math.floor((Date.now() - inicioJogo) / 1000)
    clearInterval(intervaloTimer)
    document.getElementById("cardVitoria").classList.add("visivel")       
    if (resultado) {
        document.getElementById("resultadoFinal").textContent = "Você venceu!"
        const resultJogador = {
            nome: jogador.nome,
            dificuldade: jogador.dificuldade,
            tempo: tempoJogo,
            pontos: pontosTotais
        }
        rankJogador.push(resultJogador)
        localStorage.setItem("rankJogador", JSON.stringify(rankJogador))
    } else {
        document.getElementById("resultadoFinal").textContent = "Você perdeu!"
    }
    document.getElementById("resultadoPontos").textContent = "pontuação final: " + pontosTotais
    document.getElementById("resultadoTempo").textContent = "tempo total: " + tempoJogo + "s"
    finalJogo = true
}

function calcularPosicoesNavio(linhaInicial, colunaInicial, tamanho, orientacao) {
    let posicoes = []
    if (orientacao === "h"){
        const colunaFinal = colunaInicial + tamanho - 1
        for (let i = colunaInicial; i <= colunaFinal; i++){
            posicoes.push({linha: linhaInicial, coluna: i})
        }
    }
    if (orientacao === "v"){
    const linhaFinal = linhaInicial + tamanho - 1
    for (let i = linhaInicial; i <= linhaFinal; i++){
        posicoes.push({linha: i, coluna: colunaInicial})
        }
    }
    return posicoes
}

function posicaoValida(posicoes) {
    for (let pos of posicoes) {
        if (pos.linha >= 10 || pos.coluna >= 10 || matrizJogo[pos.linha][pos.coluna]["temNavio"] === true){
            return false
        }
    }
    return true
}

function contaNavAfundado(listaNavios) {
    let contadorAfundado = 0
    for (let navio of listaNavios) {
        let afundou = true
        for (let pedaco of navio) {
            if (!matrizJogo[pedaco.linha][pedaco.coluna]["foiAtingido"]){
            afundou = false
            }
        }
        if (afundou){
            contadorAfundado++
        } 
        
    }
    return contadorAfundado
}

function encontrarNav(x, y) {
    for (const navio of listaNavios){
        for (const pedaco of navio) {
            if (x === pedaco.coluna && y === pedaco.linha)
                return navio
        }   
    }
}

function verificarNavAfundado(navio){
    let navAfundado = null
    for (const pedaco of navio){
        if (matrizJogo[pedaco.linha][pedaco.coluna]["foiAtingido"] === true) {
            navAfundado = true
        } else{
            navAfundado = false
        }
    }
    if (navAfundado){
        return contarPontuacao(navio)
    } else {
        return 0
    }
}

function contarPontuacao(navio) {
    const tamanhoNav = navio.length
    return tamanhoNav * 5
}