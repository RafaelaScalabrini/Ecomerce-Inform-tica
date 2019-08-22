var firebaseConfig = {
  apiKey: "AIzaSyDKhPL_zp-2kfRiQzYa9imxvYDyPC4llDk",
  authDomain: "scalabriniinformatica.firebaseapp.com",
  databaseURL: "https://scalabriniinformatica.firebaseio.com",
  projectId: "scalabriniinformatica",
  storageBucket: "",
  messagingSenderId: "195643987516",
  appId: "1:195643987516:web:becbdfbae01e6be7"
};
firebase.initializeApp(firebaseConfig);
/*criei um vetor para armazenar os produtos*/
var produtos = [];
/*criei um vetor para armazenar os produtos que vão ser adicionados ao carrinho*/
var itensCarrinho = [];
/*esta variável vai jogar dados da tag carrinho_n vinda do html index.html*/
var carrinho_n = document.getElementById("carrinho_n");

/*criei as variaveis para jogar os valores nas divs para mostrar os produtos
no caso os computadores, as memorias e os perifericos*/
var computadoresDiv = document.getElementById("computadoresDiv");
var memoriasDiv = document.getElementById("memoriasDiv");
var perifericosDiv = document.getElementById("perifericosDiv");

/*os vetores sendo alimentados
  para um é um atributo chave valor parecido com o objeto JSON*/
var Computadores = [
  {
    nome: "EasyPC",
    valor: 1950,
    descricao: "4 giga de memória ram, processor intel duo core,500 giga de hd"
  },
  {
    nome: "Dell 1800",
    valor: 2950,
    descricao: "8 giga de memória ram, processor intel 3 core,1 tera de hd"
  },
  {
    nome: "Dell 178",
    valor: 1800,
    descricao: "2 giga de memória ram, processor intel duo core,250 de hd"
  },
  {
    nome: "Gabinete Gamer",
    valor: 6800,
    descricao:
      "16 giga de memória ram, processor amd ,ssd 500 giga placa de video GEForceX190"
  }
];

var Memorias = [
  {
    nome: "Memória Ram para desktops",
    valor: 320,
    descricao: "8 giga memória kingston"
  },
  {
    nome: "Memória Ram para notebooks",
    valor: 290,
    descricao: "4 giga de memória kingston"
  },
  {
    nome: "MicroSD",
    valor: 85,
    descricao: "MicroSD da ScanDisk 64 giga"
  }
];

var Perifericos = [
  {
    nome: "Kit Mouse e Teclado da Microsoft",
    valor: 550,
    descricao: "kit mouse e teclado da microsoft sem fio"
  },
  {
    nome: "Web cam multilaser",
    valor: 50,
    descricao: "8 mega pixel de resolução"
  },
  {
    nome: "Impressora multifuncional HP",
    valor: 420,
    descricao: "scanner mais a impressora"
  }
];

/*Aqui estas funcões geram o html de forma dinâmica*
  que vão trazer os produtos vindos dos vetores
  que foram alimentados*/
function HTMLComputadoresProduto(con) {
  /*tem duas maneiras de declarar variaveis no javascript
  utilizando do var que é o jeito antigo
  e o let que é recurso do javascript novo ou ecmascript2015*/
  let URL = `img/computadores/computador${con}.jpg`;
  let btn = `btnComputador${con}`;
  return `
        <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                  <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
                  <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <p class="card-text">${Computadores[con - 1].nome}</p>
                    <p class="card-text">Preço: ${
                      Computadores[con - 1].valor
                    }.00</p>
                    <p class="card-text">Descrição: ${
                      Computadores[con - 1].descricao
                    }</p>
                      <div class="d-flex justify-content-between align-items-center">
                          <div class="btn-group">
                            <button type="button" onclick="cart2('${
                              Computadores[con - 1].nome
                            }','${
    Computadores[con - 1].valor
  }', '${con}', '${btn}' )" class="btn btn-sm btn-outline-secondary"><a href="carrinho.html" style="color:inherit;">Comprar</a></button>
                            <button id="${btn}" type="button" onclick="cart('${
    Computadores[con - 1].nome
  }','${
    Computadores[con - 1].valor
  }','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >
                          Adicionar no carrinho
                          </button>
                          </div>
                          <small class="text-muted">Fretis Gratis</small>
                      </div>
                  </div>
              </div>
        </div>
  
  `;
}

function HTMLMemoriasProduto(con) {
  let URL = `img/memorias/memoria${con}.jpg`;
  let btn = `btnMemoria${con}`;
  return `
        <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                  <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
                  <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <p class="card-text">${Memorias[con - 1].nome}</p>
                    <p class="card-text">Preço: ${
                      Memorias[con - 1].valor
                    }.00</p>
                    <p class="card-text">Descrição: ${
                      Memorias[con - 1].descricao
                    }</p>
                      <div class="d-flex justify-content-between align-items-center">
                          <div class="btn-group">
                            <button type="button" onclick="cart2('${
                              Memorias[con - 1].nome
                            }','${
    Memorias[con - 1].valor
  }', '${con}', '${btn}' )" class="btn btn-sm btn-outline-secondary"><a href="carrinho.html" style="color:inherit;">Comprar</a></button>
                            <button id="${btn}" type="button" onclick="cart('${
    Memorias[con - 1].nome
  }','${
    Memorias[con - 1].valor
  }','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >
                          Adicionar no carrinho
                          </button>
                          </div>
                          <small class="text-muted">Fretis Gratis</small>
                      </div>
                  </div>
              </div>
        </div>
  
  `;
}

function HTMLPerifericosProduto(con) {
  let URL = `img/perifericos/periferico${con}.jpg`;
  let btn = `btnPeriferico${con}`;
  return `
        <div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                  <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
                  <div class="card-body">
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <i style="color:orange;" class="fa fa-star"  ></i>
                    <p class="card-text">${Perifericos[con - 1].nome}</p>
                    <p class="card-text">Preço: ${
                      Perifericos[con - 1].valor
                    }.00</p>
                    <p class="card-text">Descrição: ${
                      Perifericos[con - 1].descricao
                    }</p>
                      <div class="d-flex justify-content-between align-items-center">
                          <div class="btn-group">
                            <button type="button" onclick="cart2('${
                              Perifericos[con - 1].nome
                            }','${
    Perifericos[con - 1].valor
  }', '${con}', '${btn}' )" class="btn btn-sm btn-outline-secondary"><a href="carrinho.html" style="color:inherit;">Comprar</a></button>
                            <button id="${btn}" type="button" onclick="cart('${
    Perifericos[con - 1].nome
  }','${
    Perifericos[con - 1].valor
  }','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >
                          Adicionar no carrinho
                          </button>
                          </div>
                          <small class="text-muted">Fretis Gratis</small>
                      </div>
                  </div>
              </div>
        </div>
  
  `;
}
/*funções que a pessoa clicando em adicionar ao carrinho o
numero vai aumentando o valor no icone de carrinho*/
function cart(nome, valor, descricao, url, con, btncart) {
  var item = {
    nome: nome,
    valor: valor,
    url: url
  };
  itensCarrinho.push(item);
  let storage = JSON.parse(localStorage.getItem("cart"));

  if (storage == null) {
    produtos.push(item);
    localStorage.setItem("cart", JSON.stringify(produtos));
  } else {
    produtos = JSON.parse(localStorage.getItem("cart"));
    produtos.push(item);
    localStorage.setItem("cart", JSON.stringify(produtos));
  }
  produtos = JSON.parse(localStorage.getItem("cart"));
  carrinho_n.innerHTML = `[${produtos.length}]`;
  document.getElementById(btncart).style.display = "none";
  animation();
}

function cart2(nome, valor, url, con, btncart) {
  var item = {
    nome: nome,
    valor: valor,
    url: url
  };

  itensCarrinho.push(item);
  let storage = JSON.parse(localStorage.getItem("cart"));
  if (storage == null) {
    produtos.push(item);
    localStorage.setItem("cart", JSON.stringify(produtos));
  } else {
    produtos = JSON.parse(localStorage.getItem("cart"));
    produtos.push(item);
    localStorage.setItem("cart", JSON.stringify(produtos));
  }
  produtos = JSON.parse(localStorage.getItem("cart"));
  carrinho_n.innerHTML = `[${produtos.length}]`;
  document.getElementById(btncart).style.display = "none";
}

function animation() {
  const toast = swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000
  });
  toast({
    type: "sucesso",
    title: "Adicionado ao carrinho"
  });
}

/*ao carregar o body na index.html vai preencher automaticamente as divs que contem os computadores,
memórias e perifericos, pois o body chama esta função
resolvi criar um for para varrer e assim preencher automaticamente as divs*/
function render() {
  for (let index = 1; index <= 4; index++) {
    computadoresDiv.innerHTML += `${HTMLComputadoresProduto(index)}`;
  }

  for (let index = 1; index <= 3; index++) {
    memoriasDiv.innerHTML += `${HTMLMemoriasProduto(index)}`;
  }

  for (let index = 1; index <= 3; index++) {
    perifericosDiv.innerHTML += `${HTMLPerifericosProduto(index)}`;
  }

  if (localStorage.getItem("cart") == null) {
  } else {
    produtos = JSON.parse(localStorage.getItem("cart"));
    carrinho_n.innerHTML = `[${produtos.length}]`;
  }
}
