$(document).ready(function () {

  $("#key").html(localStorage.getItem("auth_key"));   // mostra a key na tela
  $("#key").animate({ 'width': '800px' });

  $("#BIncluir").click(function () {                              // botão de incluir pessoa
    $("#header").html("Cadastrar pessoa");
    $("#sendbtn").html("<button id = \"salvar\">Salvar</button>");
    $("#form").fadeIn("fast");

  });

  $("#close").click(function () {                                 // botão de fechar overlay
    ClearInputs();
    $("#warning").animate({ height: '0px' });
    $("#form").fadeOut("fast");
    $("#warning").removeClass('anim');
  });
  $("#cancelar").click(function () {
    ClearInputs();
    $("#warning").animate({ height: '0px' });
    $("#form").fadeOut("fast");
    $("#warning").removeClass('anim');
  });

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

  function GetAge(birth) {    // transforma string de nascimento em anos
    birth = new Date(birth);
    var today = new Date();
    var age = Math.floor((today - birth) / (365.25 * 24 * 60 * 60 * 1000));
    return age;
  }

  function ClearInputs() {
    $("#nome").val("");
    $("#sobrenome").val("");
    $("#peso").val("");
    $("#altura").val("");
    $("#nascimento").val("");
    CleanErrors();
  }

  function CleanErrors() {
    $("#altura").css({ 'border': '1px solid #ccc' });
    $("#peso").css({ 'border': '1px solid #ccc' });
    $("#nascimento").css({ 'border': '1px solid #ccc' });
    $("#nome").css({ 'border': '1px solid #ccc' });
    $("#sobrenome").css({ 'border': '1px solid #ccc' });
  }


});

$(document).on('click', '.edit', function () {
  var ID = $(this).closest('tr').attr('id');
  $("#header").html("Atualizar pessoa");
  $("#sendbtn").html("<button id = \"atualizar\">Atualizar</button>");
  $("#form").fadeIn("fast");
});

$(document).on('click', '.del', function () {
  var ID = $(this).closest('tr').attr('id');
  localStorage.setItem("delete",ID);
  $("#confirmation").fadeIn("fast");
});

$(document).on('click', '#DelClose', function () {                               // botão de fechar overlay
  localStorage.removeItem("delete");
  $("#confirmation").fadeOut("fast");
});
$(document).on('click', '#DelCancelar', function () {      
  localStorage.removeItem("delete");
  $("#confirmation").fadeOut("fast");
});



// ====================================== deletar pessoa
$(document).on('click', '#DelConfirmar', function () {
  
  
  fetch('http://lab.leadsoft.inf.br:5353/api/v1/People/' + localStorage.getItem("delete"), {
    method: 'DELETE',
    headers: {
      'Accept': 'application/problem+json',                  // recebendo JSON
      'Authorization': localStorage.getItem("auth_key")
    },
  })
    .then(response => response.json(),
    setTimeout(function () {
      localStorage.removeItem("delete");
      //alert("Pessoa removida com sucesso.");
      location.reload();
    }, 200))                
    .catch(error => {                           // print erro no console
      console.log(error);
    });
});


// ============================ ADD pessoa
$(document).on('click', '#salvar', function () {
  CleanErrors();
  fetch('http://lab.leadsoft.inf.br:5353/api/v1/People', {
    method: 'POST',
    headers: {
      'Accept': 'application/problem+json',                  // recebendo JSON
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("auth_key")
    },
    body: JSON.stringify({
      name: $("#nome").val(),  //criando JSON com usr/pswrd
      surname: $("#sobrenome").val(),
      dateOfBirth: $("#nascimento").val(),
      weigth: $("#peso").val(),
      height: $("#altura").val()
    })
  })
    .then(response => response.json())                 // transforma em objeto do JS
    .then(data => {
      if (data.status == 400) {                  // erro

        $("#warning").html("Erro nos seguintes campos.");
        $("#warning").animate({ height: '35px' });
        $("#warning").addClass('anim');
        WarnErrors(data.errors);

      }
      else if (data.HttpStatusMessage) {              // sucesso
        location.reload();
      }
    })
    .catch(error => {                           // print erro no console
      console.log(error);
    });

  function WarnErrors(errors) {
    if (errors.height) {
      $("#altura").css({ 'border': '2px solid red' });
    }
    if (errors.weigth) {
      $("#peso").css({ 'border': '2px solid red' });
    }
    if (errors.dateOfBirth || errors.DateOfBirth) {
      $("#nascimento").css({ 'border': '2px solid red' });
    }
    if (errors.Name || errors.name) {
      $("#nome").css({ 'border': '2px solid red' });
    }
    if (errors.Surname || errors.surname) {
      $("#sobrenome").css({ 'border': '2px solid red' });
    }
    if (errors.DTOPersonValidation) {
      $("#altura").css({ 'border': '2px solid red' });
      $("#peso").css({ 'border': '2px solid red' });
    }

    setTimeout(function () {
      $("#warning").removeClass('anim');
    }, 1500);

  }

  function CleanErrors() {
    $("#altura").css({ 'border': '1px solid #ccc' });
    $("#peso").css({ 'border': '1px solid #ccc' });
    $("#nascimento").css({ 'border': '1px solid #ccc' });
    $("#nome").css({ 'border': '1px solid #ccc' });
    $("#sobrenome").css({ 'border': '1px solid #ccc' });
  }

});