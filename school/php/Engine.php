<?php

class Engine{

    public static $ck = 'J~iZ6acNvO8CnE9XlbGwMLj2ehro#PmxRzd?Dp%4QJSX{zsnX6~yMWM9rqz8QCzVV%BLr3Gl}R2wXIktWs85*Kpj5jR496AzUQY6q~H{ejboCI1Wr~sviIPc75eGZKs3A|sQ#L4cXpC}iq69VMydK{@2GBz%rO~JeYEvFDxbn6q~jtK5|#RxWbwS3quz23A%j|8rR2Azo}#WhV$kpUJyPfnI*3ca9imtXDSZu@lBvxhQbSjPx54{uDp?T783R2Ok';

    public static function generate_code($number) {
        $arr = array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0');
        $pass = "";
        for($i=0;$i<$number;$i++) {
            $index = rand(0, count($arr) - ($i==0?11:1));
            $pass .= $arr[$index];
        }
        return $pass;
    }
    

    public static function encrypt($decrypted, $password, $salt) { 
        $key = hash('SHA256', $salt . $password, true);
        srand();
        $iv = substr(md5(uniqid()), 16);
        $iv_base64 = rtrim(base64_encode($iv), '=');
        $encrypted = rtrim(openssl_encrypt($decrypted . md5($decrypted), 'AES-256-CTR', $key, false, $iv),'=');
        return $iv_base64 . $encrypted;
    }

    public static function decrypt($encrypted, $password, $salt) {
        $key = hash('SHA256', $salt . $password, true);
        $iv = base64_decode(substr($encrypted, 0, 22) . '==');
        $encrypted = substr($encrypted, 22);
        $decrypted = openssl_decrypt($encrypted, 'AES-256-CTR', $key, false, $iv);
        $hash = substr($decrypted, -32);
        $decrypted = substr($decrypted, 0, -32);
        if (md5($decrypted) != $hash) return false;
        return $decrypted;
    }


}

?>