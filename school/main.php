<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../styles/main.css">
    <title>Document</title>
</head>
<body>
    <div id="container">
        <div class="addLayout">
            <input type="text" placeholder="Название карты">
            <button class="addMap">Добавить карту</button>
        </div>
        <table>
            <thead>
                <th>Название</th>
                <th>Создатель</th>
                <th>Дата создания</th>
            </thead>
            <tbody>
            <?php
            
            $sql = "SELECT * FROM `Maps` WHERE `Creator` = :creator";
            $data = array(
                "creator" => $_SESSION["id"]
            );
            echo("<input id='id' style='display : none' value='".$_SESSION["id"]."'> ");
            $result = $db->doRequest($sql, $data);
            for($i = 0; $i < count($result); $i++){
                echo "<tr><td><a href='../map.html?id=".$result[$i]["Id"]."'>".$result[$i]["Title"]."</a></td><td>Я</td><td>".$result[$i]["Date"]."</td></tr>";
            }
    
            ?>
            </tbody>
        </table>
    </div>
    <script src="../dist/bundle.js"></script>
    <script src="../js/login.js"></script>
</body>
</html>