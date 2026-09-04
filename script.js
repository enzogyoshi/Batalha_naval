let inicioJogo = Date.now()
let jogador = JSON.parse(localStorage.getItem("jogador"))
if (!jogador) {
     window.location.href = "/index.html"
}
document.getElementById("nomeJogador").textContent = jogador.nome
let vidas = parseInt(jogador.dificuldade)
atualizarVida(vidas)

let tabelaJogo = document.getElementById("board")

let finalJogo = false

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
let navios = 0
while (navios < 5) {

    const linhaSorteada = Math.floor(Math.random() * 10)
    const colunaSorteada = Math.floor(Math.random() * 10)

    if (matrizJogo[linhaSorteada][colunaSorteada]["temNavio"] === false){
        matrizJogo[linhaSorteada][colunaSorteada]["temNavio"] = true
        navios++
    }
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
            verificarVitoria(contAfundados())
        } else{
            clicado.classList.add("errou")
            vidas -= 1
            atualizarVida(vidas)   
            verificarVidas(vidas)
        }
    }
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

function contAfundados() {
    let contador = 0
    for (const linha of matrizJogo) {
        for (const navio of linha) {
            if (navio["temNavio"] && navio["foiAtingido"]){
                contador++
            }
        }
    }
    return contador
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
    document.getElementById("vidasJogador").textContent = "vidas: " + vidas
}

function fimJogo(resultado) {
    let tempoJogo = (Date.now() - inicioJogo) / 1000
        console.log(tempoJogo)
    if (resultado) {
        alert("Parabéns você venceu!")
    } else {
        alert("Você perdeu")
    }
    finalJogo = true
}