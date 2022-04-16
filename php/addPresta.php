<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *');
header('Content-Type: text/plain');

include('db.php');

function removeDirectory($path) {
  $files = glob($path . "/*");
  foreach ($files as $file) {
    is_dir($file) ? removeDirectory($file) : unlink($file);
  }
  rmdir($path);
  return;
}

$categorie_prestation = $decodedData["categorie_prestation"];
$type_prestation = $decodedData["type_prestation"];
$libelle_prestation = $decodedData['libelle_prestation'];
$description_prestation = $decodedData['description_prestation'];
$quantite = $decodedData['quantite'];
$traitement = $decodedData['traitement'];
$id_vehicule = $decodedData['id_vehicule'];
$client_id = $decodedData['client_id'];
$folder_id = $decodedData['folder_id'];
$photo = $decodedData['photo'];

// Create the path of the folder
$structure = __DIR__ . "/images/" . $client_id . "/" . $folder_id . "/" . date("Y-m-d") . "/";
// Create photo name
$nom_photo =  strtolower($categorie_prestation . "-" . $libelle_prestation . ".png");
// Create the path of the photo
$chemin_photo = $structure;

// Check if folder exists
if(is_dir($chemin_photo) === false) {
  // Create the folder
  if(!mkdir($chemin_photo, 0777, true)) {
    die("Failed to create folder");
  }
  else {
    echo "Folder created";
  }
}

// Convert the photo from base64 to data
$photo_data = $photo["base64"];
list($type, $photo_data) = explode(';', $photo_data);
list(, $photo_data) = explode(',', $photo_data);
// Add the photo to the folder
file_put_contents(($chemin_photo . $nom_photo), base64_decode($photo_data), LOCK_EX);

$prestation = strtolower("prestation_" . $categorie_prestation);
// Insert into db
$stmt = $conn->prepare("INSERT INTO $prestation (libelle_prestation, description_prestation, nom_photo, chemin_photo, id_vehicule) VALUES (?,?,?,?,?)");
$stmt->bind_param("ssssi", $libelle_prestation, $description_prestation, $nom_photo, $chemin_photo, $id_vehicule);

$stmt->execute();
$id = mysqli_insert_id($conn);

// Remove the duplicate folder create by ???
removeDirectory(__DIR__ . "/images/" . date("Y-m-d"));

echo $id . "<br/>";
// Populate the coresponding table with the data
switch($categorie_prestation) {
  case "piece":
    $SQL = "INSERT INTO traitement (nom_traitement, id_prestation) VALUES (?,?)";
    $stmt = $conn->prepare($SQL);
    $stmt->bind_param("si", $type_traitement, $id);
    break;
  case "carosserie":
    $SQL = "INSERT INTO quantite (id_prestation, quantite) VALUES (?,?)";
    $stmt = $conn->prepare($SQL);
    $stmt->bind_param("ii", $id, $quantite);
  break;
}
$stmt->execute();

$stmt->close();
$conn->close();

echo json_encode("200");