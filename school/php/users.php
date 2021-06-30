<?php

ini_set('error_reporting', E_ALL); 
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1);


require("DataBase.php");
require("Engine.php");

switch($_GET["method"]){
    case "reg":
        $hex = Engine::generate_code(8);

        $userData = array(
            "name" => $_POST["name"],
            "surname" => $_POST["surname"],
            "email" => md5($_POST["email"]),
            "password" => Engine::encrypt($_POST["regPassword"], Engine::$ck, $hex),
            "hex" => $hex
        );
        $sql = "INSERT INTO `Users` 
            (`Name`, `Surname`, `Email`, `Password`, `Status`, `Hex`)
            VALUES
            (:name, :surname, :email, :password, 0, :hex)";
        $db->doRequest($sql, $userData);
        break;
    case "login":
        $sql = "SELECT * FROM `Users` WHERE `Email` = :email";
        $data = array(
            "email" => md5($_POST["login"])
        );
        $userData = $db->doRequest($sql, $data);
        if(!empty($userData)){
            $password = Engine::decrypt($userData[0]["Password"], Engine::$ck, $userData[0]["Hex"]);
            if($_POST["password"] == $password){
                session_start();
                $_SESSION["token"] = $userData[0]["Hex"];
                $_SESSION["username"] = $userData[0]["Email"];
                $_SESSION["id"] = $userData[0]["Id"];
                require_once("../main.php");
            }
            else {
                echo "Неверный пароль";
            }
        }
        else echo "Такого логина не существует";
        break;
}

?>