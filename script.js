tabelaJogo = document.getElementById("board")

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
            })
