<?php
include('db.php');

$immatriculation = $decodedData['immatriculation'];
$immatriculation = "xan-123";

$SQL = "SELECT * FROM vehicule JOIN dossier on vehicule.id_vehicule=dossier.id_vehicule WHERE immatriculation='$immatriculation'";

$result = mysqli_query($conn, $SQL);
$response;

if (mysqli_num_rows($result) > 0) {
  // output data of each row
  while($row = mysqli_fetch_array($result)) {
    $response = $row;
  }
} else {
  echo "0 results";
}

mysqli_close($conn);

echo json_encode($response);
