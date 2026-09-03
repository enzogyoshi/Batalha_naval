let jogadores = JSON.parse(localStorage.getItem("jogador")) || []
let btnStart = document.getElementById("btnstart")

btnStart.addEventListener("click", function(){
    const inputNome = document.getElementById("nome")
    const nome = inputNome.value
    const nomeregex = /^[a-zA-Z\d\s:'\-]+$/

    if (!nomeregex.test(nome.trim()) || nome.trim().length < 3) {
        alert("digite um nome válido!")
        inputNome.focus()
        return
    }


    const opcDiff = document.querySelector('input[name="vidas"]:checked')
    if (opcDiff){
        const dificuldade = opcDiff.value
        const jogador = {
        nome: nome,
        dificuldade: dificuldade
    }
    localStorage.setItem("jogador", JSON.stringify(jogador))
    } else{
        alert("insira uma dificuldade")
        return
    }
    window.location.href = "/jogo.html"
}) 