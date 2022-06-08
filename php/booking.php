<?php 
require_once 'connectdb.php';
$title = $_POST['hall'];
$data = array();
$boking = mysqli_query(connect(),"SELECT `date` FROM `booking` WHERE `title` = '$title'");
foreach($boking as $row){
    $data[]=array(
        'date' => $row['date']
    );
}
echo json_encode($data);

?>