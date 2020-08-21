$(document).ready(function () {

  // ============================ Carregar pessoas
  fetch('http://lab.leadsoft.inf.br:5353/api/v1/People/IMC', {
    method: 'GET',
    headers: {
      'Accept': 'application/problem+json',                  // recebendo JSON
      'Authorization': localStorage.getItem("auth_key")
    }
  })
    .then(response => response.json())                 // transforma em objeto do JS
    .then(data => {
      if (data.HttpStatusCode == 401) {                  // erro
        console.log("erro:Unauthorized");
      }
      else if (data.HttpStatusMessage) {              // sucesso
        data.Result.forEach(p => AddPessoa(p.Id, p.FullName, p.Age, p.Height, p.Weigth, p.IMC));

      }
    })
    .catch(error => {                           // print erro no console
      console.log(error);
    });


});



function AddPessoa(id, nome, idade, altura, peso, imc) {  // cria linha na tabela 

  var tag = document.createElement("tr");
  var name = document.createElement("td");
  var age = document.createElement("td");
  var height = document.createElement("td");
  var weigth = document.createElement("td");
  var IMC = document.createElement("td");

  var Tedit = document.createElement("td");
  var Tdel = document.createElement("td");
  var edit = document.createElement("button");
  var del = document.createElement("button");
  var editBut = document.createElement("img");
  var deleteBut = document.createElement("img");

  editBut.src = "../img/edit.png";
  deleteBut.src = "../img/delete.png";

  edit.className = "edit";
  del.className = "del";

  name.append(nome);
  age.append(idade);
  height.append(altura);
  weigth.append(peso);
  IMC.append(imc);

  edit.append(editBut);
  del.append(deleteBut);
  Tedit.appendChild(edit);
  Tdel.appendChild(del);

  tag.appendChild(name);
  tag.appendChild(age);
  tag.appendChild(height);
  tag.appendChild(weigth);
  tag.appendChild(IMC);
  tag.appendChild(Tedit);
  tag.appendChild(Tdel);

  tag.id = id;

  $("#Lista").append(tag);
  $("#" + id).fadeIn("slow");
}