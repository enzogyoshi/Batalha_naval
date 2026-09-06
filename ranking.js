ranking = JSON.parse(localStorage.getItem("rankJogador")) || []
if (ranking.length === 0) {
    alert("ainda não tem nenhum jogador no ranking")
    window.location.href = "/index.html"
}
let btnInicio = document.getElementById("btnInicio")

btnInicio.addEventListener("click", function(){
    window.location.href = "/index.html"
})
let listaRanking = document.getElementById("corpoRanking")
ranking.sort((a, b) => b.pontos - a.pontos)
for (const jogador of ranking) {
    const numRank = ranking.indexOf(jogador)

    const resultado = document.createElement("tr")
    resultado.classList = "resultado"

    const colocacaoRank = document.createElement("td")
    colocacaoRank.textContent = 1 + numRank + "°"
    colocacaoRank.classList = "colocacao"

    const resultadoNome = document.createElement("td")
    resultadoNome.textContent = jogador.nome
    resultadoNome.classList = "nome-rank"

    const resultadoDificuldade = document.createElement("td")
    if (jogador.dificuldade === "10") {
        resultadoDificuldade.textContent = "dificil"
    } else if (jogador.dificuldade === "15") {
        resultadoDificuldade.textContent = "medio"
    } else {
        resultadoDificuldade.textContent = "facil"
    }
    resultadoDificuldade.classList = "dificuldade-rank"

    const resultadoTempo = document.createElement("td")
    resultadoTempo.textContent = jogador.tempo + "s"
    resultadoTempo.classList = "tempo-rank"

    const resultadoPontos = document.createElement("td")
    resultadoPontos.textContent = jogador.pontos
    resultadoPontos.classList = "pontos-rank" 

    resultado.appendChild(colocacaoRank)
    resultado.appendChild(resultadoNome)
    resultado.appendChild(resultadoPontos)
    resultado.appendChild(resultadoTempo)
    resultado.appendChild(resultadoDificuldade)
    listaRanking.appendChild(resultado)
}