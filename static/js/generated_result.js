$(document).ready(function () {
  $(".text").hide();
  $(".rhombus2").hide();
  let question = $("<h1></h1>");
  question.html("Are you satisfied with the result?");
  let yes_div = $('<div id ="yes_div" class="col-md-6"></div>');
  let no_div = $('<div id ="no_div" class="col-md-6"></div>');
  let yes_button = $('<button id="yes" name="button"></button>');
  yes_button.html("&#129505");
  let no_button = $('<button id="no" name="button"></button>');
  no_button.html("&#128148;");
  yes_div.append(yes_button);
  no_div.append(no_button);
  $("#button").append(yes_div);
  $("#button").append(no_div);
  $("#row1").append(question);

  $("#yes").click(function () {
    if (paragraphs.length == 4) {
      window.location.href = "/final_result";
    } else {
      window.location.href = "/generate_paragraph/" + toWhom + "/" + occasion;
    }
  });

  $("#no").click(function () {
    $("#row1").hide();
    let form = $('<form id="regenerate_info"></form>');
    let label = $('<label id="prompt"></label>');
    let input = $('<input type="text" id="regenerate_idea" />');
    label.html(
      "Please use adjectives to specify how do you want to improve this paragraph:"
    );
    form.append(label);
    form.append(input);
    $("#regenerate").append(form);
    let button1 = $('<button id="generate" name="button"></button>');
    button1.html("Generate");
    let button2 = $('<button id="back" name="button"></button>');
    button2.html("Back");
    let col1 = $('<div class="col-md-6"></div>');
    col1.append(button2);
    $("#row2").append(col1);
    let col2 = $('<div class="col-md-6"></div>');
    col2.append(button1);
    $("#row2").append(col2);

    $("#yes_div").remove();
    $("#no_div").remove();
    $("h2").remove();

    $("#generate").click(function () {
      $(".text").show();
      $(".rhombus2").show();
      var elab = $("#regenerate_idea").val();
      var param = {
        idea: elab,
      };

      $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(param),
        url: "/regenerate",
        success: function (data) {
          console.log("success", data);
          setTimeout(5000);
          window.location.href = "/generated_result";
        },
        error: function (data) {
          console.log("Error", data);
        },
      });
    });

    $("#back").click(function () {
      window.location.href = "/generated_result";
    });
  });
});
