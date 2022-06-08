<?php 
require_once 'connectdb.php';

$to = 'oleg.nur@outlook.com';
$name = clear_data($_POST['name']);
$email = clear_data($_POST['email']);
$text = clear_data($_POST['message']);
$theme = clear_data($_POST['subject']);
$headers = "From: photostudio.ru\r\n";
$headers .= "Replay-to: photostudio.ru\r\n";
$headers .= "X-mailer: PHP/". phpversion();
$page = 'Страница спасибо за ваш вопрос!'; 

$message  = 'Имя'.$name."\n".'Email: '.$email."\n".'Сообщение:'.$text."\n";
$message = '
<html>
<body>
<center>	
<table border=1 cellpadding=6 cellspacing=0 width=90% bordercolor="#DBDBDB">
 <tr><td colspan=2 align=center bgcolor="#E4E4E4"><b>Информация</b></td></tr>
 <tr>
  <td><b>Откуда</b></td>
  <td>'.$page.'</td>
 </tr>
 <tr>
  <td><b>Адресат</b></td>
  <td><a href="mailto:'.$email.'">'.$email.'</a></td>
 </tr>
 <tr>
  <td><b>Тема</b></td>
  <td>'.$subject.'</td>
 </tr>
 <tr>
  <td><b>От кого</b></td>
  <td>'.$_POST['name'].'</td>
 </tr>
 <tr>
  <td><b>Сообщение</b></td>
  <td>'.$_POST['message'].'</td>
 </tr>
</table>
</center>	
</body>
</html>'; 
$headers  = "Content-type: text/html; charset=utf-8\r\n";

function clear_data($val){
    $val = trim($val);
    $val = stripslashes($val);
    $val = htmlspecialchars($val);
    return $val;
}

if(filter_var($email,FILTER_VALIDATE_EMAIL)){
    // $mes = $_POST['message'];
    // $name = $_POST['name'];
    // $subject = $_POST["subject"];
    // $email = $_POST['email'];

    // mysqli_query(connect(),"INSERT INTO `contact_me`(`theme`,`email`,`name`,`message`) VALUES('$subject','$email','$name','$mes')"); 
    mail($to,$theme,$message,$headers);
}
else{
echo 1;
}
// $result = mail($to, $subject, $message, $headers);
?>
