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

produtos = JSON.parse(localStorage.getItem("cart"));
/*os vetores que vão ser utilizados ao longo da aplicação*/
var itensCarrinho = [];
/*carrinho_n vai alimentar a area cart_n do carrinho.html*/
var carrinho_n = document.getElementById("cart_n");
/*table vai alimentar a area table do carrinho.html*/
var table = document.getElementById("table");
/*formularioCliente vai alimentar a area cart_n do formularioCliente*/
var formularioCliente = document.getElementById("formularioCliente");
/*vai ser feita a somatória dos produtos então criei uma variavel inicializei com 0*/
var total = 0;

/*o html dinâmico da tabela*/
function tableHTML(i) {
  return `
            <tr>
              <th scope="row">${i + 1}</th>
              <td>${produtos[i].nome}</td>
              <td>1</td>
              <td>${produtos[i].valor}</td>
            </tr>
  `;
}

/*a função que é chamada ao concluir a compra*/
function buy() {
  var d = new Date();
  var t = d.getTime();
  var counter = t;
  counter += 1;
  let db = firebase.database().ref("order/" + counter);
  let itemdb = {
    id: counter,
    order: counter - 895,
    total: total
  };
  db.set(itemdb);
  swal({
    position: "center",
    type: "success",
    title: "Compra realizada com sucesso",
    text: `O pedido de compra é: ${itemdb.order}`,
    showConfirmButton: true,
    timer: 50000
  });
  clean();
}

/*a função que é chamada ao finalizar a compra
cria o formulário de forma dinâmica*/
function endBuy() {
  formularioCliente.innerHTML = `

  <h4 class="mb-3">Endereço de entrega</h4>
  <div class="form-group">
    <label for="inputNome">Endereço</label>
    <input type="text" class="form-control" id="inputNome" placeholder="Nome completo" required>
  </div>
  <div class="form-group">
    <label for="inputEmail4">Email</label>
    <input type="email" class="form-control" id="inputEmail4" placeholder="Email" required>
  </div>
  <div class="form-group">
    <label for="inputFone" class="control-label">Telefone</label>
    <input type="text" class="form-control" onkeypress="$(this).mask('(00) 0000-00009')" required>
  <div class="help-block with-errors"></div>
<div class="form-group">
  <label for="inputAddress">Endereço</label>
  <input type="text" class="form-control" id="inputAddress" placeholder="Rua, nº,Bairro,Complemento" required>
</div>
<div class="form-row">
  <div class="form-group col-md-6">
    <label for="inputCity">Cidade</label>
    <input type="text" class="form-control" id="inputCity" required>
  </div>
  <div class="form-group col-md-4">
    <label for="inputEstado">Estado</label>
    <select id="inputEstado" class="form-control">
      <option selected>Rio de Janeiro</option>
      <option selected>Minas Gerais</option>
      <option selected>São Paulo</option>
      <option selected>Selecionar</option>
    </select>
  </div>
  <div class="form-group col-md-2">
    <label for="inputCEP">CEP</label>
    <input type="text" class="form-control" id="inputCEP" onkeypress="$(this).mask('00.000-000')">
  </div>
  <hr class="mb-4">
  <h4 class="mb-3">Pagamento</h4>
  <div class="d-block my-3">
              <div class="custom-control custom-radio">
                <input id="credito" name="paymentMethod" type="radio" class="custom-control-input" checked="" required="">
                <label class="custom-control-label" for="credito">Cartão de crédito</label>
              </div>
              <div class="custom-control custom-radio">
                <input id="debito" name="paymentMethod" type="radio" class="custom-control-input" required="">
                <label class="custom-control-label" for="debito">Cartão de débito</label>
              </div>
              <div class="custom-control custom-radio">
                <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required="">
                <label class="custom-control-label" for="paypal">PayPal</label>
              </div>
  </div>
  <div class="row">
              <div class="col-md-6 mb-3">
                <label for="cc-nome">Nome no cartão</label>
                <input type="text" class="form-control" id="cc-nome" placeholder="" required="">
                <small class="text-muted">Nome completo, como mostrado no cartão.</small>
                <div class="invalid-feedback">
                  O nome que está no cartão é obrigatório.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="cc-numero">Número do cartão de crédito</label>
                <input type="text" class="form-control" id="cc-numero" placeholder="" required="">
                <div class="invalid-feedback">
                  O número do cartão de crédito é obrigatório.
                </div>
    </div>
    <div class="row">
              <div class="col-md-6 mb-3">
                <label for="cc-expiracao">Data de expiração</label>
                <input type="text" class="form-control" id="cc-expiracao" placeholder="" required="">
                <div class="invalid-feedback">
                  Data de expiração é obrigatória.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="cc-cvv">CVV</label>
                <input type="text" class="form-control" id="cc-cvv" placeholder="" required="">
                <div class="invalid-feedback">
                  Código de segurança é obrigatório.
                </div>
              </div>
              <hr class="mb-4">
              <button id="btnFinishBuy" onclick="buy()" class="btn btn-primary">Concluir a compra</button>
    </div>
  </div>

  </div>
</div>
  `;
}

/*a função clean que é utilizada quando a pessoa clica em retirar 
produtos do carrinho
cria uma tabela vazia*/
function clean() {
  localStorage.clear();
  for (let index = 0; index < produtos.length; index++) {
    table.innerHTML += tableHTML(index);
    total = total + parseInt(produtos[index].valor);
  }
  total = 0;
  table.innerHTML = `
  <tr>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
  </tr>   
  `;
  carrinho_n.innerHTML = "";
  document.getElementById("btnBuy").style.display = "none";
  /*document.getElementById("btnFinishBuy").style.display = "none";*/
  document.getElementById("btnClean").style.display = "none";
}

/* e a função render é chamada no body do carrinho.html*/
function render() {
  for (let index = 0; index < produtos.length; index++) {
    table.innerHTML += tableHTML(index);
    total = total + parseInt(produtos[index].valor);
  }
  table.innerHTML += `
  <tr>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col">Total: R$ ${total}.00</th>
  </tr> 
  <tr>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col"></th>
    <th scope="col">
      <button id="btnClean" onclick="clean()" class="btn text-white btn-warning">Retirar produtos do carrinho</button>
    </th>
    <th scope="col">
      <button id="btnBuy" onclick="endBuy()" class="btn btn-success">Finalizar a compra</button>
    </th>
  </tr>   
  `;
  produtos = JSON.parse(localStorage.getItem("cart"));
  carrinho_n.innerHTML = `[${produtos.length}]`;
}
