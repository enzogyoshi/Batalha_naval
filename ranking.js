ranking = JSON.parse(localStorage.getItem("rankJogador")) || []
if (ranking.length === 0) {
    alert("ainda não tem nenhum jogador no ranking")
    window.location.href = "/index.html"
}
let listaRanking = document.getElementById("listaRanking")
ranking.sort((a, b) => b.pontos - a.pontos)
for (const jogador of ranking) {
    const resultado = document.createElement("div")
    resultado.classList = "resultado"
    const resultadoNome = document.createElement("h4")
    resultadoNome.textContent = "Nome: " + jogador.nome
    const resultadoDificuldade = document.createElement("p")
    if (jogador.dificuldade === "10") {
        resultadoDificuldade.textContent = "dificil"
    } else if (jogador.dificuldade === "15") {
        resultadoDificuldade.textContent = "medio"
    } else {
        resultadoDificuldade.textContent = "facil"
    }
    const resultadoTempo = document.createElement("p")
    resultadoTempo.textContent = "tempo: " + jogador.tempo + "s"
    const resultadoPontos = document.createElement("p")
    resultadoPontos.textContent = "pontos: " + jogador.pontos 
    resultado.appendChild(resultadoNome)
    resultado.appendChild(resultadoDificuldade)
    resultado.appendChild(resultadoTempo)
    resultado.appendChild(resultadoPontos)
    listaRanking.appendChild(resultado)
}