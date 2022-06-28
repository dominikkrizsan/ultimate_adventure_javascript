<?php
// Initialize the session
session_start();

// Check if the user is logged in, if not then redirect him to login page
if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: index.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ULTIMATE ADVENTURE</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" type="module"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>

<body>
    <div class="main-container">
        <div class="top-bar">
            <div class="buttons">
                <input class="buttons-button" type="button" value="Logout" onclick="logout()">
                <input class="buttons-button" type="button" value="Leaderboard" onclick="leaderboard()">
            </div>
            <div class="score-box">
                <span class="score-label">Score</span>
                <div class="score" data-score>0</div>
            </div>
        </div>
        <div class="game-canvas-bg">
            <div class="world" data-world>
                <div class="start-screen" data-start-screen>PRESS SPACE TO START</div>
                <img src="imgs/ground.png" class="ground" data-ground>
                <img src="imgs/ground.png" class="ground" data-ground>
                <img src="imgs/hero-stationary.png" class="hero" data-hero>
            </div>
        </div>
    </div>

</body>


<script>
    function logout() {
        window.location.href = "logout.php";
    }

    function leaderboard() {
        window.location.href = "leaderboard.php";
    }
</script>

</html>