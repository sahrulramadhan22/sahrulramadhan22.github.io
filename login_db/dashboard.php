<?php
session_start();

if (!isset($_SESSION['username'])) {
    header("Location: login.php");
}
?>

<h2>Dashboard</h2>
<p>Selamat datang, <?php echo $_SESSION['username']; ?>!</p>

<a href="logout.php">Logout</a>
