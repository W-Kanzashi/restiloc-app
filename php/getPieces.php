<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
header('Content-Type: application/json');

include('db.php');

// $data : piece | carosserie
$SQL = "SELECT * FROM " . strtolower($decodedData["data"]);

$result = mysqli_query($conn, $SQL);
$response;

while($row = mysqli_fetch_assoc($result)) {
  $response[$row["id_carosserie"]] = $row;
}

mysqli_close($conn);

echo json_encode($response);