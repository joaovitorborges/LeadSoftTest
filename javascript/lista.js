$(document).ready(function () {

  setInterval(timer, 1000); // timer
  timer();

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

  function ClearInputs() {      //limpar valores
    $("#nome").val("");
    $("#sobrenome").val("");
    $("#peso").val("");
    $("#altura").val("");
    $("#nascimento").val("");
    CleanErrors();
  }
});

$(document).on('click', '.del', function () {              // deletar pessoa
  var ID = $(this).closest('tr').attr('id');
  localStorage.setItem("delete", ID);
  $("#confirmation").fadeIn("fast");
});

$(document).on('click', '#DelClose', function () {                  // botão de fechar overlay
  localStorage.removeItem("delete");
  $("#confirmation").fadeOut("fast");
});
$(document).on('click', '#DelCancelar', function () {
  localStorage.removeItem("delete");
  $("#confirmation").fadeOut("fast");
});

function CleanErrors() {              // desmarcar campos errados
  $("#altura").css({ 'border': '1px solid #ccc' });
  $("#peso").css({ 'border': '1px solid #ccc' });
  $("#nascimento").css({ 'border': '1px solid #ccc' });
  $("#nome").css({ 'border': '1px solid #ccc' });
  $("#sobrenome").css({ 'border': '1px solid #ccc' });
}

function WarnErrors(errors) {                 // marcar campos errados
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


function msToTime(duration) {

}

function timer() {
  var duration = localStorage.getItem("InitTime") - Date.now();
  seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),

    minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  if (minutes >= 0 && seconds >= 0) {
    $("#timer").html(minutes + ":" + seconds);
  }
  else {
    $("#timer").css({ 'background-color': 'red' });
    $("#timer").html(00 + ":" + 00);
  }
}