<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$stmt = $conn->prepare("INSERT INTO prestation_carosserie (libelle_prestation, description_prestation, nom_photo, chemin_photo, id_vehicule) VALUES (?,?,?,?,?)");
$stmt->bind_param("ssssi", $libelle_prestation, $description_prestation, $nom_photo, $chemin_photo, $id_vehicule);

$type_prestation = $decodedData['type_prestation'];
$libelle_prestation = $decodedData['libelle_prestation'];
$description_prestation = $decodedData['description_prestation'];
$nom_photo = $decodedData['nom_photo'];
$chemin_photo = $decodedData['chemin_photo'];
$id_vehicule = $decodedData['id_vehicule'];
$client_id = $decodedData['user_id'];
$folder_id = $decodedData['folder_id'];
$photo = $decodedData['photo'];

$structure = "/home/meung/dev/restiloc-app/images/" . $client_id . "/" . $folder_id . date("Y-m-d") . "/" ;

if (!mkdir($structure, 0700, true)) {
  die('Échec lors de la création des dossiers...');
}

file_put_contents($nom_photo, $photo["uri"]);

$stmt->execute();

$conn->close();
$stmt->close();