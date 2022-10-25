$(document).ready(function () {
  $("#him").click(function () {
    var whom = "him";
    window.location.href = "/basic/" + whom;
  });
  $("#her").click(function () {
    var whom = "her";
    window.location.href = "/basic/" + whom;
  });
});
