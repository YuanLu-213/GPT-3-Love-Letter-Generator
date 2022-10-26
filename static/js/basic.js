function displayForm(whom) {
  let form = $('<form id="to-whom-form"></form>');
  let label = $("<label></label>");
  label.html("To Whom: ");
  let select = $('<select id="to-whom"></select>');
  let option1 = "";
  let option2 = "";
  let option3 = "";
  if (whom == "her") {
    option1 = $('<option value="my girlfriend"></option>');
    option1.html("Girlfriend");
    option2 = $('<option value="my wife"></option>');
    option2.html("Wife");
    option3 = $('<option value="the girl that I adore"></option>');
    option3.html("Sweetheart");
  } else {
    option1 = $('<option value="my boyfriend"></option>');
    option1.html("Boyfriend");
    option2 = $('<option value="my husband"></option>');
    option2.html("Husband");
    option3 = $('<option value="the boy that I adore"></option>');
    option3.html("Sweetheart");
  }
  select.append(option1);
  select.append(option2);
  select.append(option3);
  form.append(label);
  form.append(select);

  return form;
}

$(document).ready(function () {
  var form = displayForm(whom);
  $(".row2").append(form);

  $("#next").click(function () {
    //var to_whom = $("#to-whom").val();
    //var occasion = $("#occasion").val();
    console.log("Hello");
    //console.log(occasion);
    //window.location.href = "/generate_paragraph";
  });
});
