<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

include('db.php');

$immatriculation = $decodedData['Immatriculation'];

$SQL = "SELECT * FROM vehicule JOIN dossier on vehicule.id_vehicule=dossier.id_vehicule JOIN client on dossier.id_client=client.id_client WHERE immatriculation='$immatriculation'";

$result = mysqli_query($conn, $SQL);
$response;

while($row = mysqli_fetch_assoc($result)) {
  $response = $row;
}

mysqli_close($conn);

echo json_encode($response);