$(document).ready(function(){

    $("#Blogin").click(function () {
        fetch('http://lab.leadsoft.inf.br:5353/api/v1/Auth/LogIn',{
            method:'POST',
            headers: {
                'Accept': 'application/json',                  // recebendo JSON
                'Content-Type': 'application/json'             // mandando JSON
              },
            body: JSON.stringify({username: $("#email").val(),  //criando JSON com usr/pswrd
             password: $("#password").val()})
        })
        
          .then(response => response.json())                 // transforma em objeto do JS
        .then(data => {
          if (data.HttpStatusCode == 400) {                  // erro
            $("#warning").html(data.Errors[0]);
            $("#warning").css('visibility:visible');
          }
          else if(data.HttpStatusCode == 200){              // sucesso
            $("#warning").html(data.Result.Authorization);
          }
        })
        .catch(error => {                           // print erro no console
          console.log(error)
      });
        
    });

  });
  