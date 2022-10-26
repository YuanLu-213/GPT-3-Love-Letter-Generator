$(document).ready(function () {
    $("#no").click(function () {
        console.log("noo!")
        let form = $('<form id="regenerate_info"></form>');
        let label = $("<label></label>");
        let input = $('<input type="text" id="regenerate_ides" />')
        label.html("Please write down how do you want to improve this paragraph");
        form.append(label);
        form.append(input)
        $("#regenerate").append(form)
    })
})