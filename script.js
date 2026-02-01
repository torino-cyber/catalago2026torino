let categoriaAtual = "";
let estacaoAtual = "";
let carrinho = [];

const produtosDiv = document.getElementById("produtos");
const listaCarrinho = document.getElementById("listaCarrinho");
const totalDiv = document.getElementById("total");

function setCategoria(cat){
  categoriaAtual = cat;
  renderProdutos();
}

function setEstacao(est){
  estacaoAtual = est;
  renderProdutos();
}

function renderProdutos(){
  produtosDiv.innerHTML = "";

  const filtrados = produtos.filter(p =>
    p.categoria === categoriaAtual &&
    p.estacao === estacaoAtual
  );

  filtrados.forEach(p => {
    produtosDiv.innerHTML += `
      <div class="card">
        <h3>${p.nome}</h3>
        <button onclick="addCarrinho(${p.id}, 'grade')">
          Grade (${p.minGrade} un) – R$ ${p.precoGrade}
        </button>
        <button onclick="addCarrinho(${p.id}, 'caixa')">
          Caixa (${p.qtdCaixa} un) – R$ ${p.precoCaixa}
        </button>
      </div>
    `;
  });
}

function addCarrinho(id, tipo){
  const p = produtos.find(x => x.id === id);
  carrinho.push({p, tipo});
  renderCarrinho();
}

function renderCarrinho(){
  listaCarrinho.innerHTML = "";
  let total = 0;

  carrinho.forEach(i => {
    const valor = i.tipo === "grade"
      ? i.p.precoGrade * i.p.minGrade
      : i.p.precoCaixa * i.p.qtdCaixa;

    total += valor;

    listaCarrinho.innerHTML += `<p>${i.p.nome} (${i.tipo}) - R$ ${valor}</p>`;
  });

  totalDiv.innerText = "Total: R$ " + total;
}

function abrirCheckout(){
  if(carrinho.length === 0){
    alert("Carrinho vazio");
    return;
  }
  document.getElementById("checkout").classList.remove("hidden");
}

function enviarWhats(){
  let msg = "Pedido Torino:%0A";

  carrinho.forEach(i => {
    msg += `- ${i.p.nome} (${i.tipo})%0A`;
  });

  window.open(
    "https://wa.me/5511939586226?text=" + msg,
    "_blank"
  );
}
