<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$stmt = $conn->prepare("INSERT INTO prestation_carosserie (libelle_prestation, description_prestation, nom_photo, chemin_photo, id_vehicule) VALUES (?,?,?,?,?)");
$stmt->bind_param("ssssi", $libelle_prestation, $description_prestation, $nom_photo, $chemin_photo, $id_vehicule);

$libelle_prestation = $decodedData['libelle_prestation'];
$description_prestation = $decodedData['description_prestation'];
$nom_photo = $decodedData['nom_photo'];
$chemin_photo = $decodedData['chemin_photo'];
$id_vehicule = $decodedData['id_vehicule'];

$stmt->execute();

$conn->close();
$stmt->close();