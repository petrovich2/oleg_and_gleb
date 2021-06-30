let isLogin = true;

const $ = app.jquery;

function change(){
    
}

$("#login-button").on("click", function(){
    if(!isLogin){
        isLogin = true;
        $(this).addClass("active");
        $("#registration-button").removeClass("active");
        $(".login").css("display", "block");
        $(".registration").css("display", "none");
        $("form").attr("action", "php/users.php?method=login");
    }
})

$("#registration-button").on("click", function(){
    if(isLogin){
        isLogin = false;
        $(this).addClass("active");
        $("#login-button").removeClass("active");
        $(".login").css("display", "none");
        $(".registration").css("display", "block");
        $("form").attr("action", "php/users.php?method=reg");
    }
})

$(".addMap").on("click", function(){
    let title = $(".addLayout input").val();
    console.log(title);
    $.post("save.php?method=create", {title : title, id : $("#id").val()}, function(data){
        location.reload();
        console.log(data);
    })
})