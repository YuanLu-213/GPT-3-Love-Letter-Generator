$(document).ready(function () {
    $("#generate").click(function () {
        window.location.href = "/generated_result";
      });

    $("#add_metaphor").click(function(){
        let form = $('<form id="metaphor_info"></form>');
        let label = $("<label></label>");
        let input = $('<input type="text" id="input_metaphor" />')
        label.html("Please input the metaphor");
        form.append(label);
        form.append(input)
        $("#metaphor").append(form)
    });

    $("#add_words").click(function(){
        let form = $('<form id="words_info"></form>');
        let label = $("<label></label>");
        let input = $('<input type="text" id="input_words" />')
        label.html("Please input the words");
        form.append(label);
        form.append(input)
        $("#words").append(form)
    });
});