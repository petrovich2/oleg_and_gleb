const $ = app.jquery;
$("#auth-submit").on("click", function(e){
    e.preventDefault();
    let name = $("#name").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let rePassword = $("#remember-password").val();
    if(email){
        $.post("./checkLogin/", {Email : email}, function(data){
            if(data){
                alert("Данная почта уже зарегистрирована!");
            }
            else{
                if(name){
                    if((password === rePassword) && password && rePassword){
                        let user = {
                            Name : name,
                            Email : email,
                            Password : password,
                            Status : 2
                        }
                        $.post("./registrate/", user, function(data){
                            alert("Регистрация прошла успешно!");
                        })
                    }
                    else{
                        alert("Пароли не совпадают!")
                    }
                }
                else{
                    alert("Не заполнено поле имя!")
                }
            }
        })
    }
})
// function makeError(id, message){
//     $(`#${id}`).addClass("error");
//     $(`#${id}-error`).text(message);
//     $("#auth-submit").addClass("disabled");
//     $("#auth-submit").attr("disabled", true);
// }

$(".auth-input").on("focus", function(){
    $(this).removeClass("error");
    $(`#${$(this).prop("id")}-error`).text("");
    $("#auth-submit").removeClass("disabled");
    $("#auth-submit").attr("disabled", false);
})