<?php

    require_once("DataBase.php");

    switch($_GET["method"]){
        case "update":
            if(isset($_POST["map"])){
                $id = "";
                $sql = "UPDATE `Maps` SET `Data` = :map WHERE `Id` = :id";
                $data = array(
                    "map" => $_POST["map"],
                    "id" => $_POST["id"]
                );
                $db->doRequest($sql, $data);
                echo "Все хорошо";
            }
            else{
                echo "Что-то с датой";
            }
            break;
        case "create":
            $sql = "INSERT INTO `Maps` (`Title`, `Creator`, `Data`) VALUES (:title, :creator, :map)";
            $data = array(
                "title" => $_POST["title"],
                "creator" => $_POST["id"],
                "map" => "{}"
            );
            print_r($data);
            $db->doRequest($sql, $data);
            break;
        case "get":
            $sql = "SELECT * FROM `Maps` WHERE `Id` = :id";
            $data = array(
                "id" => $_POST["id"]
            );
            $result = $db->doRequest($sql, $data);
            echo $result[0]["Data"];
    }

?>