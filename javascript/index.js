$(document).ready(function () {
  $("#LoginBox").fadeIn("slow");

  // ============================ Autenticação
  $("#Blogin").click(function () {
    $("#warning").removeClass('anim');
    fetch('http://lab.leadsoft.inf.br:5353/api/v1/Auth/LogIn', {
      method: 'POST',
      headers: {
        'Accept': 'application/problem+json',                  // recebendo JSON
        'Content-Type': 'application/json'            // mandando JSON                
      },
      body: JSON.stringify({
        username: $("#email").val(),  //criando JSON com usr/pswrd
        password: $("#password").val()
      })
    })

      .then(response => response.json())                 // transforma em objeto do JS
      .then(data => {
        if (data.HttpStatusCode == 400) {                  // erro
          $("#warning").html(data.Errors[0]);
          $("#warning").animate({ height: '35px' });
          $("#warning").addClass('anim');

        }
        else if (data.status == 400) {                  // erro
          $("#warning").html("Invalid username or password!");
          $("#warning").animate({ height: '35px' });
          $("#warning").addClass('anim');

        }
        else if (data.HttpStatusMessage) {              // sucesso
          localStorage.setItem("auth_key", data.Result.Authorization);
          localStorage.setItem("InitTime", Date.now() + (60 * 60 * 1000));
          window.location.replace("lista.html");


        }
      })
      .catch(error => {                           // print erro no console
        console.log(error)
      });

  });

});

