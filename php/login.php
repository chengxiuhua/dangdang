<?php

include "conn.php"; //引入数据库连接的文件。

is(isset($_POST['username']) && isset($_POST['password'])){
    $user = $_POST['username'];
    $pass = sha1($_POST['password']);

    $result = $conn->query("select * from registry where username='$user' and password = '$pass' ");

    if ($result->fetch_assoc()) {
        echo true;  //登录成功
    } else {
        echo false;  //用户名或者密码错误
    }
}

