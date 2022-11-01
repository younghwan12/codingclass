<?php
    include "../connect/connect.php";

    $commentPass = $_POST['pass'];
    $commentmsg = $_POST["commentmsg"];
    $commentID = $_POST["commentID"];

    

    $sql = "UPDATE mycomment SET commentMsg = '{$commentmsg}', commentPass = {$commentPass} WHERE myCommentID = {$commentID}";
    $result = $connect -> query($sql);

    echo json_encode(array("info" => $commentID));



?>