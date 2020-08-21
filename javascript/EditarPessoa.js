// ====================================== get pessoa
$(document).on('click', '.edit', function () {
    var ID = $(this).closest('tr').attr('id');
    $("#header").html("Atualizar pessoa");
    $("#sendbtn").html("<button id = \"atualizar\">Atualizar</button>");
    $("#form").fadeIn("fast");

    fetch('http://lab.leadsoft.inf.br:5353/api/v1/People/' + ID, {
        method: 'GET',
        headers: {
            'Accept': 'application/problem+json',                  // recebendo JSON
            'Authorization': localStorage.getItem("auth_key")
        },
    })
        .then(response => response.json())
        .then(data => {
            $("#nome").val(data.Result.Name);
            $("#sobrenome").val(data.Result.Surname);
            $("#nascimento").val(data.Result.DateOfBirth.split('T')[0]);
            $("#altura").val(data.Result.Height);
            $("#peso").val(data.Result.Weigth);
        })
        .catch(error => {                           // print erro no console
            console.log(error);
        });

    $(document).on('click', '#atualizar', function () {
        CleanErrors();

        // ==========================================================   editar pessoa
        fetch('http://lab.leadsoft.inf.br:5353/api/v1/People/' + ID, {
            method: 'PUT',
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
            .then(response => response.json())
            .then(data => {
                if (data.status == 400 || data.status == 422) {                  // erro
                    $("#warning").html("Erro nos seguintes campos.");
                    $("#warning").animate({ height: '35px' });
                    $("#warning").addClass('anim');
                    WarnErrors(data.errors);
                }
                else {              // sucesso
                    setTimeout(function () {
                        location.reload();
                    }, 200)
                }


            })
            .catch(error => {                           // print erro no console
                console.log(error);
            });
    });

});