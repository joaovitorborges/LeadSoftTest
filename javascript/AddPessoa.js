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
      name: $("#nome").val(),
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


});