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
    $("#generate").click(function () {
        window.location.href = "/generated_result";
      });

    $("#add_metaphor").click(function(){
        console.log("3")
        let form = $('<form id="metaphor_info" class="form"></form>');
        let label = $("<label></label>");
        let input = $('<input type="text" id="input_metaphor" />')
        label.html("Please input the metaphor you want to use to describe your lover: ");
        form.append(label);
        form.append(input)
        $("#metaphor").append(form)
        $(".row2").remove("#add_metaphor")
    });

    $("#add_words").click(function(){
        let form = $('<form id="words_info" class="form"></form>');
        let label = $("<label></label>");
        let input = $('<input type="text" id="input_words" />')
        label.html("Please input the words you want to tell your lover:");
        form.append(label);
        form.append(input)
        $("#words").append(form)
        $(".row2").remove("#add_words")
    });
    console.log("H")
    var form = displayForm();
    $("#length_form").append(form)
});