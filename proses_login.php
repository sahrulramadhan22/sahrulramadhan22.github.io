<?php
session_start();
include 'koneksi.php';

$username = $_POST['username'];
$password = $_POST['password'];

$query = mysqli_query($conn, "SELECT * FROM users WHERE username='$username'");
$data = mysqli_fetch_assoc($query);

if ($data && $password == $data['password']) {
    $_SESSION['username'] = $data['username'];
    header("Location: dashboard.php");
} else {
    $_SESSION['error'] = "Username atau password salah!";
    header("Location: login.php");
}
?>
