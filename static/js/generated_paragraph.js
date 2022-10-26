$(document).ready(function () {
  var receiver = toWhom;
  var occasion = occasion;
  $("#generate").click(function () {
    var addition = "";
    var metaphor = "";
    var words = "";
    var length = parseInt($("#length").val());

    var param = {
      receiver: receiver,
      occasion: occasion,
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
        $(".last").html("Error occured. Please try again");
      },
    });
  });
});
