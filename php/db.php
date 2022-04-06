<?php
$conn = new mysqli('localhost', 'root', 'Ashley13', 'restiloc');

$encodedData = file_get_contents('php://input');  // take data from fetch API
$decodedData = json_decode($encodedData, true);

// Check connection
// if ($conn->connect_error) {
//   die("Connection failed: " . $conn->connect_error);
// }
// echo "Connected successfully" . "<br/>";