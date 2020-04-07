<?php
include "conn.php";

$pagesize = 10;
$sql = "select * from dd_goodslist";
$result = $conn->query($sql); //获取数据的结果集(记录集)

$num = $result->num_rows;//数据的条数
$pagenum = ceil($num / $pagesize);//页数，4

if(isset($_POST['page'])){
    $pagevalue = $_POST['page'];
}else{
    $pagevalue = 1;
}
$page = ($pagevalue-1) * 10;
//limit可以接收1-2个数字参数(整数)，参1表示偏移值(类似于起始索引，从0开始)，参2表示获取的长度
$sql1 = "select * from dd_goodslist limit $page, $pagesize";
$res =  $conn->query($sql1); 
$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}

echo json_encode($arr);//输出接口