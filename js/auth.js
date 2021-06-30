const $ = app.jquery;
$("#auth-submit").on("click", function(e){
    e.preventDefault();
    let auth = {
        login : $("#auth-login").val(),
        password : $("#auth-password").val()
    };
    $.post("./authorization/", auth, function(data){
        if(data){
            window.location.replace("./Projects");
        }
    })
});