<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

include('db.php');

function removeDirectory($path) {
  $files = glob($path . "/*");
  foreach ($files as $file) {
    is_dir($file) ? removeDirectory($file) : unlink($file);
  }
  rmdir($path);
  return;
}

$type_prestation = $decodedData["type_prestation"];
$libelle_prestation = $decodedData['libelle_prestation'];
$description_prestation = $decodedData['description_prestation'];
$id_vehicule = $decodedData['id_vehicule'];
$client_id = $decodedData['client_id'];
$folder_id = $decodedData['folder_id'];
$photo = $decodedData['photo'];

// Create the path of the folder
$structure = __DIR__ . "/images/" . $client_id . "/" . $folder_id . "/" . date("Y-m-d") . "/";
// Create photo name
$nom_photo =  strtolower($type_prestation . "-" . $libelle_prestation . ".png");
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

// Insert into db
$stmt = $conn->prepare("INSERT INTO prestation_carosserie (libelle_prestation, description_prestation, nom_photo, chemin_photo, id_vehicule) VALUES (?,?,?,?,?)");
$stmt->bind_param("ssssi", $libelle_prestation, $description_prestation, $nom_photo, $chemin_photo, $id_vehicule);

$stmt->execute();

$stmt->close();
$conn->close();

// Remove the duplicate folder create by ???
removeDirectory(__DIR__ . "/images/" . date("Y-m-d"));