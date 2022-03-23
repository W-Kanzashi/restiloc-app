<?php
$conn = mysqli_connect('localhost', 'root', 'root', 'restiloc');

$encodedData = file_get_contents('php://input');  // take data from fetch API
$decodedData = json_decode($encodedData, true);

// Check connection
// echo $decodedData['immatriculation'];
// if ($conn->connect_error) {
//   die("Connection failed: " . $conn->connect_error);
// }
// echo "Connected successfully" . "<br/>";