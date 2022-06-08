<?php
$conn = new mysqli('localhost', 'clark', 'LErp1hy088rgeajek2PSpJqvEs0=', 'clark');

$encodedData = file_get_contents('php://input');  // take data from fetch API
$decodedData = json_decode($encodedData, true);

// Check connection
// if ($conn->connect_error) {
//   die("Connection failed: " . $conn->connect_error);
// }
// echo "Connected successfully" . "<br/>";
