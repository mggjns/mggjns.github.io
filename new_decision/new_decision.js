$(document).ready(function () {

    var list = [];

    $("#submit").click(function (e) {
        e.preventDefault();
        option();
        console.log(list.length)
        button_appears();
        $("#reset").show();
        $("#option").val("");
    })

    function button_appears() {
        if (list.length >= 2) {
            $("#decision").show();
        }
    }

    function option() {
        var option = $("#option").val();
        if (option != "") {
            list.push(option + " ");
        }
        console.log(list);
        $("#all_options").append("<div class='stretchRight choice'>" + option + "</div>");
    }

    $("#decision").click(function () {
        var random = list[Math.floor(Math.random() * list.length)];
        $("#machine_choice").append("<div class='slideDown'>" + random + "</div>");
        $("#decision").hide();
        $("#directions").hide();
        $("input").hide();
        $("#all_options").empty();
        $("#option").val("");
        list = [];
    })

    $("#reset").click(function () {
        $("#all_options").empty();
        $("#decision").hide();
        $("#directions").show();
        $("#machine_choice").empty();
        $("#reset").hide();
        $("input").show();
        list = [];
    })
})