<?php 
function connect(){
$host = 'localhost';
$user = 'root';
$pass = 'root';
$dbname = 'photostudio';

    $connect = mysqli_connect($host,$user,$pass,$dbname);
    return $connect;

}