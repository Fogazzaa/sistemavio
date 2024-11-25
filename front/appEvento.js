document
  .getElementById("form-selecao-data")
  .addEventListener("submit", testeCalendario);

function testeCalendario(event) {
  // Previne o comportamento padrão do formulario, ou seja impede que ele seja enviado e recarregue a página
  event.preventDefault();

  const data_recebida = document.getElementById("data").value;

  if (data_recebida) {
    // console.log("Data Recebida: ", data_recebida);
    alert("A data selecionada é: " + data_recebida);
  }
  else{
    // console.log("Data Recebida: ", data_recebida);
    alert("Por favor selecione uma data");
  }
}
