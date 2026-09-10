let comodoAtivo = null;
let itemAtual = null;

const comodos = {
  cozinha: {
    nome: "Cozinha",
    icone: "🍳",
    itens: [
      {
        id: "cozinha-1",
        nome: "Jogo de panelas antiaderente",
        imagem: "https://picsum.photos/id/292/300/200",
        status: "disponivel",
        preco: 350,
        link: "#",
      },
      {
        id: "cozinha-2",
        nome: "Liquidificador",
        imagem: "https://picsum.photos/id/312/300/200",
        status: "disponivel",
        preco: 200,
        link: "https://www.mercadolivre.com.br/",
      },
      {
        id: "cozinha-3",
        nome: "Micro-ondas",
        imagem: "https://picsum.photos/id/365/300/200",
        status: "disponivel",
        preco: 600,
        link: "https://www.mercadolivre.com.br/",
      },
    ],
  },
  sala: {
    nome: "Sala",
    icone: "🛋️",
    itens: [
      {
        id: "sala-1",
        nome: "Sofá 3 lugares",
        imagem: "https://picsum.photos/id/106/300/200",
        status: "disponivel",
        preco: 1800,
        link: "https://www.mercadolivre.com.br/",
      },
      {
        id: "sala-2",
        nome: "Rack para TV",
        imagem: "https://picsum.photos/id/119/300/200",
        status: "disponivel",
        preco: 450,
        link: "https://www.mercadolivre.com.br/",
      },
    ],
  },
  quarto: { nome: "Quarto", icone: "🛏️", itens: [] },
  banheiro: { nome: "Banheiro", icone: "🚿", itens: [] },
  lavanderia: { nome: "Lavanderia", icone: "🧺", itens: [] },
  gourmet: { nome: "Área gourmet", icone: "🍽️", itens: [] },
};

function statusLabel(status) {
  const labels = {
    disponivel: "Disponível",
    reservado: "Reservado",
    comprado: "Comprado",
  };
  return labels[status] || status;
}

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}


function calcularProgresso(itens) {
  if (itens.length === 0) return 0;
  const comprados = itens.filter((i) => i.status === "comprado").length;
  return Math.round((comprados / itens.length) * 100);
}

function renderItens(itens, mostrarComodo = false, mensagemVazia = "Ainda não há itens cadastrados neste cômodo.") {
  const container = document.getElementById("comodoItens");
  container.innerHTML = "";

  if (itens.length === 0) {
    container.innerHTML = `<p class="comodo-itens__vazio">${mensagemVazia}</p>`;
    return;
  }

  itens.forEach((item) => {
    const card = document.createElement("div");
    card.className = "comodo-item-mini";
    card.dataset.status = item.status;
    card.onclick = () => abrirItemDetalhe(item);

    const tagComodo = mostrarComodo
      ? `<span class="comodo-item-mini__tag">${item.comodoIcone} ${item.comodoNome}</span>`
      : "";

    card.innerHTML = `
      <span class="comodo-item-mini__status">${statusLabel(item.status)}</span>
      ${tagComodo}
      <div class="comodo-item-mini__foto">
        <img src="${item.imagem}" alt="${item.nome}">
      </div>
      <h3 class="comodo-item-mini__nome">${item.nome}</h3>
      <hr class="comodo-item-mini__divisor">
      <p class="comodo-item-mini__valor">${formatarPreco(item.preco)}</p>
    `;
    container.appendChild(card);
  });
}

function renderizarComodo(icone, titulo, itens, mostrarProgresso, percentual, mensagemVazia) {
  const secao = document.getElementById("comodoSection");
  const inner = secao.querySelector(".comodo-section__inner");

  const aplicar = () => {
    document.getElementById("comodoIcone").textContent = icone;
    document.getElementById("comodoTitulo").textContent = titulo;

    const progresso = document.getElementById("comodoProgresso");
    progresso.style.display = mostrarProgresso ? "flex" : "none";
    if (mostrarProgresso) {
      document.getElementById("comodoFill").style.width = percentual + "%";
      document.getElementById("comodoPercentual").textContent = percentual + "%";
    }

    renderItens(itens, !mostrarProgresso, mensagemVazia);
  };

  if (secao.classList.contains("aberto")) {
    inner.classList.add("trocando");
    setTimeout(() => {
      aplicar();
      inner.classList.remove("trocando");
    }, 160);
  } else {
    aplicar();
  }

  secao.classList.add("aberto");
  secao.scrollIntoView({ behavior: "smooth" });
}

function abrirComodo(e, chave) {
  e.preventDefault();
  const comodo = comodos[chave];
  if (!comodo) return;

  comodoAtivo = chave; 

  document.getElementById("buscaItem").value = "";
  const percentual = calcularProgresso(comodo.itens);
  renderizarComodo(comodo.icone, comodo.nome, comodo.itens, true, percentual);
}

function fecharComodo() {
  document.getElementById("comodoSection").classList.remove("aberto");

  document.querySelectorAll(".mobile-tabs__chip").forEach((chip) => {
    chip.classList.remove("mobile-tabs__chip--ativo");
  });

  const mobilePixCard = document.getElementById("mobilePixCard");
  if (mobilePixCard) mobilePixCard.classList.remove("escondido");
}

function buscarItens(termoOriginal) {
  const termo = termoOriginal.trim().toLowerCase();

  if (termo.length === 0) {
    fecharComodo();
    return;
  }

  const resultados = [];
  Object.keys(comodos).forEach((chave) => {
    const comodo = comodos[chave];
    comodo.itens.forEach((item) => {
      if (item.nome.toLowerCase().includes(termo)) {
        resultados.push({ ...item, comodoNome: comodo.nome, comodoIcone: comodo.icone });
      }
    });
  });

  document.querySelectorAll(".mobile-tabs__chip").forEach((chip) => {
    chip.classList.remove("mobile-tabs__chip--ativo");
  });
  const mobilePixCard = document.getElementById("mobilePixCard");
  if (mobilePixCard) mobilePixCard.classList.add("escondido");

  renderizarComodo(
    "🔍",
    `Resultados para "${termoOriginal}"`,
    resultados,
    false,
    0,
    "Nenhum item encontrado."
  );
}

document.getElementById("buscaItem").addEventListener("input", (e) => {
  buscarItens(e.target.value);
});

function abrirItemDetalhe(item) {
  itemAtual = item;

  document.getElementById("itemDetalheFoto").src = item.imagem;
  document.getElementById("itemDetalheFoto").alt = item.nome;
  document.getElementById("itemDetalheNome").textContent = item.nome;
  document.getElementById("itemDetalheValor").textContent = formatarPreco(item.preco);
  document.getElementById("itemDetalheLink").href = item.link;

  const statusEl = document.getElementById("itemDetalheStatus");
  statusEl.textContent = statusLabel(item.status);
  statusEl.className = `item-detalhe__status item-detalhe__status--${item.status}`;

    const btnReservar = document.getElementById("itemDetalheReservar");
  if (item.status === "reservado") {
    btnReservar.textContent = "Cancelar reserva";
    btnReservar.disabled = false;
    btnReservar.onclick = cancelarReserva;
  } else {
    btnReservar.textContent = item.status === "disponivel" ? "Reservar" : statusLabel(item.status);
    btnReservar.disabled = item.status !== "disponivel";
    btnReservar.onclick = reservarItem;
  }
  const loja = detectarLoja(item.link);
  const logoEl = document.getElementById("itemDetalheLogo");
  logoEl.src = loja ? logosLoja[loja] : "";
  logoEl.alt = loja || "";
  logoEl.style.display = loja ? "inline-block" : "none";

  document.getElementById("itemDetalheModal").classList.add("aberto");
}

function reservarItem() {
  if (!itemAtual || itemAtual.status !== "disponivel") return;

  const confirmou = confirm(
    `Reservar "${itemAtual.nome}"?\n\nA reserva ficará válida por 30 dias. Se a compra não for confirmada nesse prazo, o item volta a ficar disponível.`
  );
  if (!confirmou) return;

  const nome = prompt("Seu nome, pra identificar a reserva:");
  if (!nome) return;

  itemAtual.status = "reservado";
  itemAtual.reservadoPor = nome.trim();
  fecharItemDetalhe();

  if (comodoAtivo) {
    const comodo = comodos[comodoAtivo];
    const percentual = calcularProgresso(comodo.itens);
    renderizarComodo(comodo.icone, comodo.nome, comodo.itens, true, percentual);
  }
} 
function cancelarReserva() {
  if (!itemAtual || itemAtual.status !== "reservado") return;

  const nome = prompt(
    `Pra cancelar, digite o nome de quem reservou (ou "NOIVOS" se você é um dos noivos):`
  );
  if (!nome) return;

  const autorizado =
    nome.trim().toLowerCase() === itemAtual.reservadoPor?.toLowerCase() ||
    nome.trim().toUpperCase() === "NOIVOS";

  if (!autorizado) {
    alert("Nome não confere. Só quem reservou ou os noivos podem cancelar.");
    return;
  }

  itemAtual.status = "disponivel";
  delete itemAtual.reservadoPor;
  fecharItemDetalhe();

  if (comodoAtivo) {
    const comodo = comodos[comodoAtivo];
    const percentual = calcularProgresso(comodo.itens);
    renderizarComodo(comodo.icone, comodo.nome, comodo.itens, true, percentual);
  }
}
function fecharItemDetalhe() {
  document.getElementById("itemDetalheModal").classList.remove("aberto");
}function abrirComodoMobile(e, chave) {
  document.querySelectorAll(".mobile-tabs__chip").forEach((chip) => {
    chip.classList.toggle(
      "mobile-tabs__chip--ativo",
      chip.dataset.room === chave,
    );
  });

  const mobilePixCard = document.getElementById("mobilePixCard");
  if (mobilePixCard) mobilePixCard.classList.add("escondido");

  abrirComodo(e, chave);
}

function abrirPix(e) {
  e.preventDefault();
  document.getElementById("pixModal").classList.add("aberto");
}

function fecharPix() {
  document.getElementById("pixModal").classList.remove("aberto");
}

function copiarChave() {
  navigator.clipboard.writeText("Matheusverdan07@gmail.com").then(() => {
    const feedback = document.getElementById("pixFeedback");
    feedback.textContent = "Chave copiada!";
    setTimeout(() => (feedback.textContent = ""), 2000);
  });
} 
document.getElementById("pixModal").addEventListener("click", function (e) {
  if (e.target === this) {
    fecharPix();
  }
}); 
function presentearItem() {
  fecharItemDetalhe();
  abrirPix(new Event("click"));
} 
const logosLoja = {
  mercadolivre: "./assets/logos/mercadolivre.png",
  shein: "./assets/logos/shein.png",
  shopee: "./assets/logos/shopee.png",
};

function detectarLoja(link) {
  if (!link) return null;
  if (link.includes("mercadolivre")) return "mercadolivre";
  if (link.includes("shein")) return "shein";
  if (link.includes("shopee")) return "shopee";
  return null;
} 
let slideAtual = 0;
const slidesContainer = document.getElementById("slides");
const totalSlides = slidesContainer.children.length;
const dotsContainer = document.getElementById("dots");

function criarDots() {
  dotsContainer.innerHTML = "";
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.onclick = () => irPara(i);
    dotsContainer.appendChild(dot);
  }
}

function atualizarCarrossel() {
  slidesContainer.style.transform = `translateX(-${slideAtual * 100}%)`;
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === slideAtual);
  });
}

function mudar(direcao) {
  slideAtual = (slideAtual + direcao + totalSlides) % totalSlides;
  atualizarCarrossel();
}

function irPara(indice) {
  slideAtual = indice;
  atualizarCarrossel();
}

criarDots();
atualizarCarrossel();