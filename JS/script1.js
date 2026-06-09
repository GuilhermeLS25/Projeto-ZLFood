let userCount = 0; // Contador

const cadastrar = (event) => {
  // Parar a propagação padrão do evento
  event.preventDefault();
  // Capturar os valores do elementos por Id
  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  // Capturando o elemento de lista por Id
  let lista = document.getElementById("lista");

  userCount++; // Acrescer o contador em
  let id = userCount; // Criar um novo elemento <li>Nome - Email</li>
  let novoItem = document.createElement("li");
  novoItem.innerHTML = `${id} - ${nome} - ${email} - <p onClick=editar(${id}) class='btn'>Editar</p> - <p onClick=excluir(${id}) class='btn'>Excluir</p>`;

  // Adicionar o novo item na lista ja existente
  lista.appendChild(novoItem);

  // Limpar os campos
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
};

const editar = (id) => {
  const lista = document.getElementById("lista");
  const itens = document.querySelectorAll("li");
  itens.forEach((item) => {
    if (item.innerHTML.includes(id)) {
      // recuperar o texto do item
      // cortar a string e variaveis nome e email
      let nome = item.innerHTML.split(" - ")[1];
      let email = item.innerHTML.split(" - ")[2];

      document.getElementById("nome").value = nome;
      document.getElementById("email").value = email;
    }
  });
};

// Função Escluir
const excluir = (id) => {
  const lista = document.getElementById("lista");
  const itens = document.querySelectorAll("li");

  itens.forEach((item) => {
    if (item.innerHTML.includes(id)) {
      item.remove();
    }
  });
};

// =============================================================================== //
let produtos = [];
let totalGeral = 0;

const adicionarProduto = () => {
  let nome = document.getElementById("produto").value;
  let qtd = parseInt(document.getElementById("quantidade").value);
  let valor = parseFloat(document.getElementById("valor").value);

  if (!nome || !qtd || !valor) {
    alert("Preencha todos os campos");
    return;
  }
  let total = qtd * valor;

  // totalGeral += total; 

  produtos.push({
    nome,
    qtd,
    valor,
    total,
  });
  atualizarTabela();
  document.getElementById("produto").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("valor").value = "";
};

const atualizarTabela = () => {
  let tbody = document.querySelector("#tabelaProdutos tbody");
  tbody.innerHTML = "";
  produtos.forEach((item) => {
    tbody.innerHTML += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.qtd}</td>
        <td>${item.valor.toFixed(2)}</td>
        <td>${item.total.toFixed(2)}</td>
      </tr>
    `;
  });
};

