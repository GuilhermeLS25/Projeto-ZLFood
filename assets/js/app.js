const state = {
  produtos: [],
  totalGeral: 0,
  motoboys: [],
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

  state.motoboys.push({ nome, telefone, placa, modelo });
  atualizarTabelaMotoboys();

  alert("Motoboy cadastrado com sucesso!");
  nomeCampo.value = "";
  telefoneCampo.value = "";
  placaCampo.value = "";
  modeloCampo.value = "";
};

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
      </tr>
    `;
  });
};

const adicionarProduto = () => {
  const nome = document.getElementById("produto")?.value.trim();
  const qtd = parseInt(document.getElementById("quantidade")?.value, 10);
  const valor = parseFloat(
    document.getElementById("valor")?.value.replace(",", "."),
  );

  if (!nome || !qtd || isNaN(valor) || valor <= 0) {
    alert("⚠️ Preencha todos os campos corretamente para adicionar o produto.");
    return;
  }

  const item = {
    id: Date.now(),
    nome,
    qtd,
    valor,
    total: qtd * valor,
  };

  state.produtos.push(item);
  atualizarTabela();
  document.getElementById("produto").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("valor").value = "";
};

const atualizarTabela = () => {
  const tbody = document.querySelector("#tabelaProdutos tbody");
  if (!tbody) return;

  state.totalGeral = 0;
  tbody.innerHTML = "";

  state.produtos.forEach((item) => {
    state.totalGeral += item.total;
    tbody.innerHTML += `
      <tr>
        <td>${item.nome}</td>
        <td>${item.qtd}</td>
        <td>R$ ${formatCurrency(item.valor)}</td>
        <td>R$ ${formatCurrency(item.total)}</td>
      </tr>
    `;
  });

  document.getElementById("total").textContent = formatCurrency(
    state.totalGeral,
  );
  document.getElementById("valorLiquido").textContent = formatCurrency(
    state.totalGeral,
  );
};

const excluirProduto = (id) => {
  state.produtos = state.produtos.filter((produto) => produto.id !== id);
  atualizarTabela();
};

const finalizarCompra = () => {
  if (state.produtos.length === 0) {
    alert("⚠️ Adicione produtos antes de finalizar a compra.");
    return;
  }

  alert(
    `✅ Compra finalizada com sucesso! Total do pedido: R$ ${formatCurrency(state.totalGeral)}`,
  );
};

const aplicarDesconto = () => {
  if (state.produtos.length === 0) {
    alert("⚠️ Adicione produtos antes de aplicar desconto.");
    return;
  }

  const descontoValor = parseFloat(
    document.getElementById("descontoValor")?.value.replace(",", ".") || 0,
  );
  const descontoPercentual = parseFloat(
    document.getElementById("descontoPercentual")?.value.replace(",", ".") || 0,
  );

  if (descontoValor <= 0 && descontoPercentual <= 0) {
    alert("⚠️ Informe um desconto em R$ ou em % para aplicar.");
    return;
  }

  let desconto = 0;
  if (descontoPercentual > 0) {
    desconto = (state.totalGeral * descontoPercentual) / 100;
  } else {
    desconto = descontoValor;
  }

  if (desconto > state.totalGeral) {
    desconto = state.totalGeral;
  }

  const valorLiquido = state.totalGeral - desconto;
  document.getElementById("valorLiquido").textContent =
    formatCurrency(valorLiquido);
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

  const btnFinalizar = document.getElementById("btn-finalizar");
  btnFinalizar?.addEventListener("click", finalizarCompra);

  const btnAplicarDesconto = document.getElementById("btn-aplicar-desconto");
  btnAplicarDesconto?.addEventListener("click", aplicarDesconto);

  configurarRecuperacaoSenha();
};

document.addEventListener("DOMContentLoaded", inicializarApp);
