<?php 
require_once 'connectdb.php';
$name = $_POST['name'];
$email = $_POST['email'];
$tel = $_POST['tel'];
$hall = $_POST['hall'];
$date = $_POST['date'];
$booking = mysqli_query(connect(),"INSERT INTO `booking`(`title`, `date`, `name`, `email`, `tel`) VALUES ('$hall','$date','$name','$email','$tel')");
if($booking){
    echo 1;
}








?>