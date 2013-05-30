function BetaDialog() {};
BetaDialog.setup = function() {
    console.log('BetaDialog.setup');
 //  $("#feedback").click(BetaDialog.popDialog);
}
BetaDialog.popDialog = function() {
    console.log("Feedback clicked");
    $("#betadialog").modal();
    $("#confirm-submit").unbind("click");
    $("#confirm-submit").click(function() {
        var comment = $("#inputComment").val();
        console.log("Submit button clicked. Email:[" + $("#inputEmail").val() +
            "] Comment:[" + comment + "]");
        var email = $("#inputEmail").val().replace(/\s/g, "");
        $("#inputEmail").val(email);
        if (email == "") {
            $("#inputEmail-control").addClass("error");
            $("#inputEmail-errmsg").text("Please enter an email address");
            return;
        }
        if (!BetaDialog.validEmail(email)) {
            $("#inputEmail-control").addClass("error");
            $("#inputEmail-errmsg").text("Invalid email");
            return;
        }
        $("#inputEmail-control").removeClass("error");
        $("#inputEmail-errmsg").text("");

        BetaDialog.submit(email, comment);
        $("#betadialog").modal("hide");
    })
    console.log("Feedback clicked finished");
    return false;
}
BetaDialog.validEmail = function(e) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search(filter) != -1;
}
BetaDialog.submit = function(address, comment) {
    //vvar site = "http://localhost:3000/contact/submit_feedback";
    var site = "http://localhost:3000/signup";
    var text = comment;
    var data = "email="+address+"&comment="+text;
    console.log("Submitting " + data);
    //var result = jQuery.ajax({
    //    url: "http://localhost:3000/contact/submit_feedback",
    //    data: data,
    //    type: "POST",
    //    complete: function(jqXHR, textStatus) {
    //        console.log("completer", textStatus);
    //    },
    //    error: function(jqXHR, textStatus, errorThrown) {
    //        console.log("error", textStatus);
    //    }
    //}).done(function(data, textStatus, jqXHR) {
    //    console.log("done", textStatus);
    //}).fail(function(jqXHR, textStatus, errorThrown) {
    //    console.log("fail", textStatus);
    //});
    //console.log(result);
    $.post(site, data, function(data, textStatus, jqXHR) {
        console.log(data);
        console.log(textStatus);
    });
}