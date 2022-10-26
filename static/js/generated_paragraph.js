function displayForm() {
  let form = $('<form id="paragraph_length" class="form"></form>');
  let label = $("<label></label>");
  label.html("Please select the length for this paragraph: ");
  let select = $('<select id="length"></select>');
  let option1 = "";
  let option2 = "";
  let option3 = "";
  option1 = $('<option value="3"></option>');
  option1.html("3");
  option2 = $('<option value="5"></option>');
  option2.html("5");
  option3 = $('<option value="7"></option>');
  option3.html("7");
  select.append(option1);
  select.append(option2);
  select.append(option3);
  form.append(label);
  form.append(select);

  return form;
}
$(document).ready(function () {
  var receiver = toWhom;
  var event = occasion;

  $("#add_metaphor").click(function () {
    let des = $('<p id="des"></p>');
    let form = $('<form id="metaphor_info" class="form"></form>');
    let row1 = $('<div class="row input-row"></div>');
    let label1 = $("<label></label>");
    let input1 = $('<input type="text" id="input_metaphor1" />');
    let row2 = $('<div class="row input-row"></div>');
    let label2 = $("<label></label>");
    let input2 = $('<input type="text" id="input_metaphor2" />');
    let row3 = $('<div class="row input-row"></div>');
    let label3 = $("<label></label>");
    let input3 = $('<input type="text" id="input_metaphor3" />');
    des.html("Please give us three words for the metaphor: ");
    label1.html("Compare " + receiver + "'s: ");
    row1.append(label1);
    row1.append(input1);
    form.append(row1);
    label2.html("To: ");
    row2.append(label2);
    row2.append(input2);
    form.append(row2);
    label3.html("Adjective: ");
    row3.append(label3);
    row3.append(input3);
    form.append(row3);

    $("#metaphor").append(des);
    $("#metaphor").append(form);
    $(".row2").remove("#add_metaphor");
  });

  $("#add_words").click(function () {
    let form = $('<form id="words_info" class="form"></form>');
    let label = $("<label></label>");
    let input = $('<input type="text" id="input_words" />');
    label.html("Please input the words you want to tell your lover:");
    form.append(label);
    form.append(input);
    $("#words").append(form);
    $(".row2").remove("#add_words");
  });
  var form = displayForm();
  $("#length_form").append(form);

  $("#back").click(function () {
    window.location.href = "/basic/" + whom;
  });

  $("#generate").click(function () {
    var addition = "";
    var metaphor = "";
    var words = "";
    var length = parseInt($("#length").val());

    var param = {
      receiver: receiver,
      occasion: event,
      addition: addition,
      content: metaphor,
      length: length,
    };

    $.ajax({
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(param),
      url: "/generate",
      success: function (data) {
        console.log("success", data);
        // window.location.href = "/";
      },
      error: function (data) {
        console.log("Error", data);
      },
    });
  });
});
