// =============================================================================== //
// 1. SISTEMA DE LOGIN (VALIDAÇÃO INTERATIVA)
// =============================================================================== //
const logar = (event) => {
  event.preventDefault();

  let emailLogin = document.getElementById("email-login");
  let senhaLogin = document.getElementById("senha-login");

  if (emailLogin && senhaLogin) {
    let email = emailLogin.value.trim();
    let senha = senhaLogin.value.trim();

    if (!email || !senha) {
      alert("⚠️ Ops! Preencha o e-mail e a senha para entrar.");
      return;
    }

    if (email === "admin@email.com" && senha === "123456") {
      alert("🎉 Login realizado com sucesso! Redirecionando...");
      window.location.href = "cliente.html"; 
    } else {
      alert("❌ E-mail ou senha incorretos. Tente novamente!");
    }
  }
};

// =============================================================================== //
// 2. SISTEMA DE USUÁRIOS (CADASTRO COM VALIDAÇÃO E TERMOS)
// =============================================================================== //
let userCount = 0; 

const cadastrar = (event) => {
  event.preventDefault();

  let checkboxTermos = document.getElementById("aceitarTermos");

  if (checkboxTermos && checkboxTermos.checked == false) {
    alert("⚠️ Atenção: Você precisa aceitar os Termos de Uso e Política de Privacidade para continuar.");
    return;
  }

  let nomeCampo = document.getElementById("nome");
  let emailCampo = document.getElementById("email");
  let senhaCampo = document.getElementById("senha");
  let confirmeSenhaCampo = document.getElementById("confirme-senha");

  if (nomeCampo && emailCampo && senhaCampo && confirmeSenhaCampo) {
    let nome = nomeCampo.value.trim();
    let email = emailCampo.value.trim();
    let senha = senhaCampo.value.trim();
    let confirmeSenha = confirmeSenhaCampo.value.trim();

    if (!nome || !email) {
      alert("❌ Erro: Por favor, preencha os campos de Nome e E-mail!");
      return;
    }

    if (!senha || !confirmeSenha) {
      alert("🔑 Ops! Você precisa criar uma senha e confirmá-la.");
      return;
    }

    if (senha !== confirmeSenha) {
      alert("❌ As senhas não batem! Verifique se digitou a mesma senha nos dois campos.");
      return;
    }

    alert(`🚀 Sucesso! A conta de ${nome} foi criada com orgulho!`);

    let lista = document.getElementById("lista");
    if (lista) {
      userCount++; 
      let id = userCount;

      let novoItem = document.createElement("li");
      novoItem.innerHTML = `${id} - ${nome} - ${email} - <p onClick=editar(${id}) class='btn'>Editar</p> - <p onClick=excluir(${id}) class='btn'>Excluir</p>`;
      lista.appendChild(novoItem);
    }

    nomeCampo.value = "";
    emailCampo.value = "";
    senhaCampo.value = "";
    confirmeSenhaCampo.value = "";
    if (checkboxTermos) checkboxTermos.checked = false; 
  }
};

// =============================================================================== //
// 3. SISTEMA DE PRODUTOS / PRATOS (TABELA ATUALIZADA)
// =============================================================================== //
let produtos = [];

const adicionarProduto = () => {
  // Captura os novos campos de ID correspondentes ao HTML atualizado
  let nome = document.getElementById("produto").value.trim();
  let descricao = document.getElementById("descricao").value.trim();
  let valor = parseFloat(document.getElementById("valor").value);

  // Validação sem a quantidade
  if (!nome || !descricao || isNaN(valor)) {
    alert("⚠️ Por favor, informe o nome, a descrição e o valor do prato!");
    return;
  }

  // Adiciona o novo produto ao array gerando um ID único baseado no timestamp
  produtos.push({ 
    id: Date.now(), 
    nome, 
    descricao, 
    valor 
  });
  
  atualizarTabela();

  alert(`🛒 ${nome} adicionado ao cardápio com sucesso!`);

  // Limpa os campos do formulário
  document.getElementById("produto").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
};

const atualizarTabela = () => {
  let tbody = document.querySelector("#tabelaProdutos tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  
  produtos.forEach((item) => {
    tbody.innerHTML += `
      <tr>
        <td style="text-align: center;">
          <label class="upload-placeholder">
            <input type="file" accept="image/*" style="display: none;">
            <i data-lucide="image-plus"></i>
          </label>
        </td>
        <td><strong class="plate-name">${item.nome}</strong></td>
        <td><span class="plate-description">${item.descricao}</span></td>
        <td><span class="plate-price">R$ ${item.valor.toFixed(2).replace('.', ',')}</span></td>
        <td>
          <div class="action-buttons">
            <button class="btn-action delete" title="Excluir" onclick="excluirProduto(${item.id})">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  // GATILHO CRUCIAL: Como o Lucide roda apenas uma vez no carregamento da página,
  // precisamos forçar ele a ler o HTML de novo para transformar as tags <i> em ícones reais.
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
};

// Nova função necessária para fazer o botão de lixeira da tabela funcionar de verdade
const excluirProduto = (id) => {
  if (confirm("Deseja realmente remover este prato do seu cardápio?")) {
    produtos = produtos.filter(item => item.id !== id);
    atualizarTabela();
  }
};