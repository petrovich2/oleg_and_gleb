<?php

class DataBase {

    private $db;

    function __construct($database, $dbuser, $dbpass) {
        try {
            $this->db = new PDO('mysql:host=localhost;dbname='.$database, $dbuser, $dbpass);
        } catch (PDOException $e) {
            print "Ошибка соединения с базой данных!: " . $e->getMessage() . "<br/>";
            die();
        }
        $this->db->query('SET NAMES UTF8');
    }

    public function doRequest($sql, $data = NULL) {
        $stmt = $this->db->prepare($sql);
        if(isset($data)){
            foreach($data as $key => &$value){
                $stmt->bindParam(":".$key, $value);
            }
        }
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

$db = new DataBase("a0221501_school", "a0221501_school", "myDearSchool");


?>