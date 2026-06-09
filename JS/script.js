// 1. Pega o botão de entrar do HTML
var botao = document.getElementById("btn-entrar");

// 2. Avisa o JS para rodar o código quando o botão for clicado
botao.onclick = function (evento) {
  // Impede a página de atualizar sozinha e sumir com o que o usuário marcou
  evento.preventDefault();

  // 3. Pega os dois campos de bolinha do HTML
  var radioCliente = document.querySelector('input[value="cliente"]');
  var radioEntregador = document.querySelector('input[value="entregador"]');

  // 4. Teste do Cliente: A bolinha do cliente está marcada?
  if (radioCliente.checked == true) {
    window.location.href = "cliente.html";
  }

  // 5. Teste do Entregador: A bolinha do entregador está marcada?
  if (radioEntregador.checked == true) {
    window.location.href = "entregador.html";
  }
};

