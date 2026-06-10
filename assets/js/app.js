const state = {
  produtos: [],
  totalGeral: 0,
  motoboys: [],
};

const getStoredUsers = () => {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
};

const saveStoredUsers = (users) => {
  localStorage.setItem("usuarios", JSON.stringify(users));
};

const formatCurrency = (value) => {
  return value.toFixed(2).replace(".", ",");
};

const logar = (event) => {
  if (event) event.preventDefault();

  const emailLogin = document.getElementById("email-login");
  const senhaLogin = document.getElementById("senha-login");

  const email = emailLogin?.value.trim();
  const senha = senhaLogin?.value.trim();

  if (!email || !senha) {
    alert("Preencha o e-mail e a senha para entrar.");
    return;
  }

  const usuarios = getStoredUsers();
  const usuario = usuarios.find((u) => u.email === email);

  if (usuario) {
    if (usuario.senha !== senha) {
      alert("Senha incorreta. Tente novamente!");
      return;
    }

    alert("Login realizado com sucesso! Redirecionando...");
    if (usuario.perfil === "entregador") {
      window.location.href = "portal-entregador.html";
    } else {
      window.location.href = "painel-cliente.html";
    }
    return;
  }

  if (email === "admin@email.com" && senha === "123456") {
    alert("Login realizado com sucesso! Redirecionando...");
    window.location.href = "painel-cliente.html";
  } else {
    alert("E-mail ou senha incorretos. Tente novamente!");
  }
};

const cadastrar = (event) => {
  if (event) event.preventDefault();

  const checkboxTermos = document.getElementById("aceitarTermos");
  const nomeCampo = document.getElementById("nome");
  const emailCampo = document.getElementById("email");
  const senhaCampo = document.getElementById("senha");
  const confirmeSenhaCampo = document.getElementById("confirme-senha");
  const perfilSelecionado = document.querySelector(
    'input[name="perfil"]:checked',
  )?.value;

  const nome = nomeCampo?.value.trim();
  const email = emailCampo?.value.trim();
  const senha = senhaCampo?.value.trim();
  const confirmeSenha = confirmeSenhaCampo?.value.trim();

  if (checkboxTermos && !checkboxTermos.checked) {
    alert("Você precisa aceitar os Termos para continuar!");
    return;
  }

  if (!nome || !email) {
    alert("Preencha todos campos");
    return;
  }

  if (!senha || !confirmeSenha) {
    alert("Você precisa criar a senha e confirmá-la.");
    return;
  }

  if (senha !== confirmeSenha) {
    alert("As senhas não são iguais. Verifique-as.");
    return;
  }

  const perfil = perfilSelecionado || "cliente";
  const usuarios = getStoredUsers();

  if (usuarios.some((u) => u.email === email)) {
    alert("Já existe uma conta cadastrada com este e-mail.");
    return;
  }

  usuarios.push({ nome, email, senha, perfil });
  saveStoredUsers(usuarios);

  alert(`Sua Conta foi criada com sucesso!! Redirecionando...`);
  window.location.href = "index.html";
};

const cadastrarMoto = (event) => {
  if (event) event.preventDefault();

  const nomeCampo = document.getElementById("nome");
  const telefoneCampo = document.getElementById("telefone");
  const placaCampo = document.getElementById("placa");
  const modeloCampo = document.getElementById("modelo");

  const nome = nomeCampo?.value.trim();
  const telefone = telefoneCampo?.value.trim();
  const placa = placaCampo?.value.trim();
  const modelo = modeloCampo?.value.trim();

  if (!nome || !telefone || !placa || !modelo) {
    alert("Preencha todos os campos para cadastrar o motoboy.");
    return;
  }

  state.motoboys.push({ id: Date.now(), nome, telefone, placa, modelo });
  atualizarTabelaMotoboys();

  alert("Motoboy cadastrado com sucesso!");
  nomeCampo.value = "";
  telefoneCampo.value = "";
  placaCampo.value = "";
  modeloCampo.value = "";
};

// Função para atualizar a tabela de motoboys
const atualizarTabelaMotoboys = () => {
  const tbody = document.querySelector("#tabelaMotoboys tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  state.motoboys.forEach((motoboy) => {
    tbody.innerHTML += `
      <tr>
        <td>${motoboy.nome}</td>
        <td>${motoboy.telefone}</td>
        <td>${motoboy.placa}</td>
        <td>${motoboy.modelo}</td>
        <td>
          <button class="btn-editar" onclick="editarMotoboy(${motoboy.id})">✎ Editar</button>
          <button class="btn-excluir" onclick="excluirMotoboy(${motoboy.id})">✕ Excluir</button>
        </td>
      </tr>
    `;
  });
};

// Função para excluir motoboy
const excluirMotoboy = (id) => {
  if (confirm("Tem certeza que deseja excluir este motoboy?")) {
    state.motoboys = state.motoboys.filter((motoboy) => motoboy.id !== id);
    atualizarTabelaMotoboys();
  }
};

// Função para editar motoboy
const editarMotoboy = (id) => {
  const motoboy = state.motoboys.find((m) => m.id === id);
  if (!motoboy) return;

  const nome = prompt("Novo nome:", motoboy.nome);
  if (nome === null) return;

  const telefone = prompt("Novo telefone:", motoboy.telefone);
  if (telefone === null) return;

  const placa = prompt("Nova placa:", motoboy.placa);
  if (placa === null) return;

  const modelo = prompt("Novo modelo:", motoboy.modelo);
  if (modelo === null) return;

  motoboy.nome = nome.trim();
  motoboy.telefone = telefone.trim();
  motoboy.placa = placa.trim();
  motoboy.modelo = modelo.trim();

  atualizarTabelaMotoboys();
  alert("Motoboy atualizado com sucesso!");
};

// Função para adicionar o produto na lista
function adicionarProduto() {
  let nome = document.getElementById("produto").value.trim();
  let descricao = document.getElementById("descricao").value.trim();

  let valorTexto = document.getsElementById("valor").value;
  let valorFormatado = valorTexto.replace(",", ".");
  let valor = parseFloat(valorFormatado);

  // Validação
  if (nome === "" || descricao === "" || isNaN(valor) || valor <= 0) {
    alert("Preencha todos os campos corretamente para adicionar o produto.");
    return;
  }

  const arquivoImagem = document.getElementById("imagem").files[0];

  if (!arquivoImagem) {
    alert("Selecione uma imagem para o produto.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    let item = {
      id: Date.now(),
      nome: nome,
      descricao: descricao,
      valor: valor,
      imagem: e.target.result,
    };

    state.produtos.push(item);

    atualizarTabela();

    document.getElementById("produto").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("imagem").value = "";

    const labelImagem = document.querySelector(".label-imagem");
    labelImagem.textContent = "Selecionar Imagem";
    labelImagem.style.borderColor = "";
    labelImagem.style.color = "";
  };

  reader.readAsDataURL(arquivoImagem);
}

// Função para atualizar a tabela
function atualizarTabela() {
  let tbody = document.querySelector("#tabelaProdutos tbody");

  if (!tbody) return;

  tbody.innerHTML = "";

  state.produtos.forEach(function (item) {
    tbody.innerHTML += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.descricao}</td>
        <td>R$ ${formatCurrency(item.valor)}</td>
        <td><img src="${item.imagem}" alt="${item.nome}" style="max-width: 100px; height: auto;"></td>
        <td>
          <button class="btn-editar" onclick="editarProduto(${item.id})" title="Editar">✎ Editar</button>
          <button class="btn-excluir" onclick="excluirProduto(${item.id})" title="Excluir">✕ Excluir</button>
        </td>
      </tr>
    `;
  });
}

const excluirProduto = (id) => {
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    state.produtos = state.produtos.filter((produto) => produto.id !== id);
    atualizarTabela();
  }
};

const editarProduto = (id) => {
  const produto = state.produtos.find((p) => p.id === id);
  if (!produto) return;

  const nome = prompt("Novo nome:", produto.nome);
  if (nome === null) return;

  const descricao = prompt("Nova descrição:", produto.descricao);
  if (descricao === null) return;

  const valorTexto = prompt("Novo valor:", produto.valor.toString());
  if (valorTexto === null) return;

  const valor = parseFloat(valorTexto.replace(",", "."));
  if (isNaN(valor) || valor <= 0) {
    alert("Valor inválido!");
    return;
  }

  produto.nome = nome.trim();
  produto.descricao = descricao.trim();
  produto.valor = valor;

  atualizarTabela();
  alert("Produto atualizado com sucesso!");
};

const configurarRecuperacaoSenha = () => {
  const recuperarForm = document.getElementById("form-recuperar");
  if (!recuperarForm) return;

  recuperarForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("email")?.value.trim();
    if (!email) {
      alert("Digite seu e-mail cadastrado.");
      return;
    }

    alert(`Enviamos um link de recuperação para o e-mail: ${email}`);
    window.location.href = "index.html";
  });
};

const inicializarApp = () => {
  const loginForm = document.getElementById("login-form");
  loginForm?.addEventListener("submit", logar);

  const cadastroForm = document.getElementById("cadastro-form");
  const currentPage = window.location.pathname.split("/").pop();
  if (cadastroForm) {
    if (currentPage === "cadastro-moto.html") {
      cadastroForm.addEventListener("submit", cadastrarMoto);
    } else {
      cadastroForm.addEventListener("submit", cadastrar);
    }
  }

  const produtoForm = document.getElementById("produto-form");
  produtoForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    adicionarProduto();
  });

  const inputImagem = document.getElementById("imagem");
  const labelImagem = document.querySelector(".label-imagem");

  labelImagem?.addEventListener("click", () => {
    inputImagem?.click();
  });

  inputImagem?.addEventListener("change", (event) => {
    if (event.target.files && event.target.files[0]) {
      labelImagem.textContent = `${event.target.files[0].name}`;
      labelImagem.style.borderColor = "var(--cor-secundaria)";
      labelImagem.style.color = "var(--cor-secundaria)";
    }
  });

  const btnFinalizar = document.getElementById("btn-finalizar");
  btnFinalizar?.addEventListener("click", finalizarCompra);

  const btnAplicarDesconto = document.getElementById("btn-aplicar-desconto");
  btnAplicarDesconto?.addEventListener("click", aplicarDesconto);

  configurarRecuperacaoSenha();
};

document.addEventListener("DOMContentLoaded", inicializarApp);
