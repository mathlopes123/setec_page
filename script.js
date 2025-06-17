// Funcionalidade de troca de abas
document.addEventListener("DOMContentLoaded", () => {
  const botoesAba = document.querySelectorAll(".botao-aba")
  const conteudosAba = document.querySelectorAll(".conteudo-aba")

  function gerenciarCamposObrigatorios(abaAtiva) {
    const todosCampos = document.querySelectorAll("#formularioInscricao input, #formularioInscricao select")
    todosCampos.forEach((campo) => {
      campo.removeAttribute("required")
    })

    const abaAtivaElement = document.getElementById(`${abaAtiva}-conteudo`)
    const camposObrigatorios = abaAtivaElement.querySelectorAll("input, select")

    camposObrigatorios.forEach((campo) => {
      const label = abaAtivaElement.querySelector(`label[for="${campo.id}"]`)
      if (label && label.textContent.includes("*")) {
        campo.setAttribute("required", "required")
      }
    })
  }

  // Inicializa com a aba "aluno" ativa
  gerenciarCamposObrigatorios("aluno")

  botoesAba.forEach((botao) => {
    botao.addEventListener("click", () => {
      botoesAba.forEach((btn) => btn.classList.remove("ativo"))
      conteudosAba.forEach((conteudo) => conteudo.classList.remove("ativo"))

      botao.classList.add("ativo")

      const idAba = botao.getAttribute("data-tab")
      document.getElementById(`${idAba}-conteudo`).classList.add("ativo")
      gerenciarCamposObrigatorios(idAba)
    })
  })

  // Máscara de telefone
  const entradasTelefone = document.querySelectorAll(".mascara-telefone")

  function aplicarMascaraTelefone(evento) {
    const entrada = evento.target
    const valor = entrada.value.replace(/\D/g, "")

    if (valor.length === 0) {
      entrada.value = ""
    } else if (valor.length <= 2) {
      entrada.value = "(" + valor
    } else if (valor.length <= 7) {
      entrada.value = "(" + valor.substring(0, 2) + ")" + valor.substring(2)
    } else {
      entrada.value = "(" + valor.substring(0, 2) + ")" + valor.substring(2, 7) + "-" + valor.substring(7, 11)
    }
  }

  entradasTelefone.forEach((entrada) => {
    entrada.addEventListener("input", aplicarMascaraTelefone)
    entrada.addEventListener("keydown", (evento) => {
      if (
        [46, 8, 9, 27, 13].includes(evento.keyCode) ||
        (evento.ctrlKey && [65, 67, 86, 88].includes(evento.keyCode)) ||
        (evento.keyCode >= 35 && evento.keyCode <= 39)
      ) {
        return
      }
      if (
        (evento.shiftKey || evento.keyCode < 48 || evento.keyCode > 57) &&
        (evento.keyCode < 96 || evento.keyCode > 105)
      ) {
        evento.preventDefault()
      }
    })
  })

  // Validação e envio do formulário
  const formulario = document.getElementById("formularioInscricao")
  formulario.addEventListener("submit", (e) => {
    e.preventDefault()

    const botaoSubmit = formulario.querySelector('button[type="submit"]')
    botaoSubmit.disabled = true
    botaoSubmit.textContent = "Enviando..."

    const abaAtiva = document.querySelector(".conteudo-aba.ativo").id.replace("-conteudo", "")
    const abaAtivaElement = document.getElementById(`${abaAtiva}-conteudo`)
    const camposObrigatorios = abaAtivaElement.querySelectorAll("input[required], select[required]")

    let formularioValido = true
    let primeiroErro = null

    camposObrigatorios.forEach((campo) => {
      if (!campo.value.trim()) {
        formularioValido = false
        campo.style.borderColor = "#ef4444"
        if (!primeiroErro) {
          primeiroErro = campo
        }
      } else {
        campo.style.borderColor = ""
      }
    })

    if (!formularioValido) {
      alert("Por favor, preencha todos os campos obrigatórios.")
      if (primeiroErro) {
        primeiroErro.focus()
      }
      botaoSubmit.disabled = false
      botaoSubmit.textContent = "Enviar"
      return
    }

    const dados = new FormData(formulario)

    fetch(formulario.action, {
      method: "POST",
      body: dados
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") {
          alert("Inscrição enviada com sucesso!")
          formulario.reset()
          gerenciarCamposObrigatorios(abaAtiva)
        } else {
          alert("Ocorreu um erro no envio. Tente novamente.")
        }
        botaoSubmit.disabled = false
        botaoSubmit.textContent = "Enviar"
      })
      .catch((err) => {
        alert("Erro na conexão. Verifique sua internet ou tente mais tarde.")
        console.error(err)
        botaoSubmit.disabled = false
        botaoSubmit.textContent = "Enviar"
      })
  })
})
