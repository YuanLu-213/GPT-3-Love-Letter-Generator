function displayForm() {
    let form = $('<form id="paragraph_length"></form>');
    let label = $("<label></label>");
    label.html("Please select the length for this paragraph");
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
    // if (whom == "her") {
    //   option1 = $('<option value="my girlfriend"></option>');
    //   option1.html("Girlfriend");
    //   option2 = $('<option value="my wife"></option>');
    //   option2.html("Wife");
    //   option3 = $('<option value="the girl that I adore"></option>');
    //   option3.html("Sweetheart");
    // } else {
    //   option1 = $('<option value="my boyfriend"></option>');
    //   option1.html("Boyfriend");
    //   option2 = $('<option value="my husband"></option>');
    //   option2.html("Husband");
    //   option3 = $('<option value="the boy that I adore"></option>');
    //   option3.html("Sweetheart");
    // }
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
        console.log("add metaphor!!!")
        let form = $('<form id="metaphor_info" class="form"></form>');
        let label = $("<label></label>");
        let input = $('<input type="text" id="input_metaphor" />')
        label.html("Please input the metaphor");
        form.append(label);
        form.append(input)
        $("#metaphor").append(form)
    });

    $("#add_words").click(function(){
        let form = $('<form id="words_info" class="form"></form>');
        let label = $("<label></label>");
        let input = $('<input type="text" id="input_words" />')
        label.html("Please input the words");
        form.append(label);
        form.append(input)
        $("#words").append(form)
    });
    console.log("Heyy")
    var form = displayForm();
    $("#length_form").append(form)
});