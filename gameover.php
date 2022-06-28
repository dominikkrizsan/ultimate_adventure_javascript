<?php
session_start();
require_once "config.php";

$sql = 'SELECT highscore FROM users WHERE id="' . $_SESSION["id"] . '"';
if ($result = mysqli_query($link, $sql)) {
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
            if($_POST["score"] > $row['highscore']){
                $sql2 = 'update users set highscore=' . $_POST["score"] . ' where id="' . $_SESSION["id"] . '"';
                if ($result2 = mysqli_query($link, $sql2)) {
                    echo "<script>console.log('Score: " . $_POST["score"]. "' );</script>";
                } else {
                    echo "<script>console.log('Score: no success' );</script>";
                }
            }
        }
        // Free result set
        mysqli_free_result($result);
    } else {
        //echo "No records matching your query were found.";
    }
} else {
    //echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
}
