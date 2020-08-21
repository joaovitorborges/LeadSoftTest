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