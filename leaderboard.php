<?php
session_start();
require_once "config.php";

$result = mysqli_query($link, "SELECT username,highscore FROM users ORDER BY highscore DESC LIMIT 10");



?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>

<body class="body-bg">
    <div>
        <div class="leaderboardtext">Your Highscore</div>
        <?php
        if (mysqli_num_rows($result) > 0) {
        ?>
            <?php
            $i = 0;
            while ($row = mysqli_fetch_array($result)) {
            ?>
                <div class="text-box">
                    <div class="username-text"><?php echo $row["username"]; ?>:</div>
                    <div class="score-text"><?php echo $row["highscore"]; ?> pts</div>
                </div>
            <?php
                $i++;
            }
            ?>
        <?php
        } else {
            echo "No result found";
        }
        ?>
        <a class="goback-link" href="game.php">
            <div class="go-back-btn">Go Back</div>
        </a>
    </div>

</body>

</html>