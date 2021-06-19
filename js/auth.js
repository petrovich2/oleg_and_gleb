const $ = app.jquery;
$("#auth-submit").on("click", function(e){
    e.preventDefault();
    let auth = {
        login : $("#auth-login").val(),
        password : $("#auth-password").val()
    };
    $.post("./authorization/", auth, function(data){
        $("#strue").html("");
        $("#false").html("");
        $("#auth-login").css("border-color", "white")
        if(!data){
            console.log("Такого логина нет");
            $("#false").text("Такого логина нет")
            $("#auth-login").css("border-color","#f54949")
           
        }
    })
});