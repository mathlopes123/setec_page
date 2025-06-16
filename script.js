    // Funcionalidade de troca de abas
    document.addEventListener('DOMContentLoaded', function() {
        const botoesAba = document.querySelectorAll('.botao-aba');
        const conteudosAba = document.querySelectorAll('.conteudo-aba');
        
        botoesAba.forEach(botao => {
          botao.addEventListener('click', () => {
            // Remove a classe ativo de todos os botões e conteúdos
            botoesAba.forEach(btn => btn.classList.remove('ativo'));
            conteudosAba.forEach(conteudo => conteudo.classList.remove('ativo'));
            
            // Adiciona a classe ativo ao botão clicado
            botao.classList.add('ativo');
            
            // Mostra o conteúdo correspondente
            const idAba = botao.getAttribute('data-tab');
            document.getElementById(`${idAba}-conteudo`).classList.add('ativo');
          });
        });
        
        // Funcionalidade de máscara para telefone
        const entradasTelefone = document.querySelectorAll('.mascara-telefone');
        
        function aplicarMascaraTelefone(evento) {
          let entrada = evento.target;
          let valor = entrada.value.replace(/\D/g, ''); // Remove não-dígitos
          
          if (valor.length === 0) {
            entrada.value = '';
          } else if (valor.length <= 2) {
            entrada.value = '(' + valor;
          } else if (valor.length <= 7) {
            entrada.value = '(' + valor.substring(0, 2) + ')' + valor.substring(2);
          } else {
            entrada.value = '(' + valor.substring(0, 2) + ')' + valor.substring(2, 7) + '-' + valor.substring(7, 11);
          }
        }
        
        entradasTelefone.forEach(entrada => {
          entrada.addEventListener('input', aplicarMascaraTelefone);
          
          // Previne entrada não-numérica exceto para teclas de controle
          entrada.addEventListener('keydown', function(evento) {
            // Permite: backspace, delete, tab, escape, enter
            if ([46, 8, 9, 27, 13].indexOf(evento.keyCode) !== -1 ||
                // Permite: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (evento.keyCode === 65 && evento.ctrlKey === true) ||
                (evento.keyCode === 67 && evento.ctrlKey === true) ||
                (evento.keyCode === 86 && evento.ctrlKey === true) ||
                (evento.keyCode === 88 && evento.ctrlKey === true) ||
                // Permite: home, end, left, right
                (evento.keyCode >= 35 && evento.keyCode <= 39)) {
              return;
            }
            // Garante que é um número e impede o pressionamento de tecla se não for
            if ((evento.shiftKey || (evento.keyCode < 48 || evento.keyCode > 57)) && 
                (evento.keyCode < 96 || evento.keyCode > 105)) {
              evento.preventDefault();
            }
          });
        });
        
        // Envio do formulário
        const formulario = document.getElementById('formularioInscricao');
        formulario.addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Inscrição enviada com sucesso!');
          formulario.reset();
        });
      });


const script_do_google = 'https://script.google.com/macros/s/AKfycbyRGhif5NaKkEFyHA5CTJCQQ5zQ01gAC-OpOM-vkWraRJyyaNAlKpmw19_Q2eIV2Rsg/exec'
const dados_do_formulario = document.forms['formulario-contato'];

dados_do_formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    fetch(script_do_google, {method: 'POST', body: new FormData(dados_do_formulario) })
    .then(response => {
        //se os dados forem gravados corretamente, será enciado uma mensagem de sucesso
        alert('Dados enviados com Sucesso!', response);
        dados_do_formulario.reset();
    })
    .catch(error =>
        //se houver erro no envio, a mensagem abaixo será exibida
        console.error('Erro no envio dos dados!', error);
});
