<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: *');

include('db.php');

function removeDirectory($path) {
  $files = glob($path . "/*");
  foreach ($files as $file) {
    is_dir($file) ? removeDirectory($file) : unlink($file);
  }
  rmdir($path);
  return;
}

// $decodedData = json_decode(file_get_contents('file.json'), true);
// var_dump($decodedData);

$categorie_prestation = $decodedData["categorie_prestation"];
$client_id = $decodedData['client_id'];
$folder_id = $decodedData['folder_id'];
$id_vehicule = $decodedData['id_vehicule'];
$type_prestation = $decodedData["type_prestation"];
$libelle_prestation = $decodedData['libelle_prestation'];
$description_prestation = $decodedData['description_prestation'];
$quantite = $decodedData['quantite'];
$traitement = $decodedData['traitement'];
$id_piece = $decodedData['id_piece'];
$photo = $decodedData['photo'];

// Create the path of the folder
$structure = "images/" . $client_id . "/" . $folder_id . "/" . date("Y-m-d") . "/";
// Create photo name
$nom_photo =  strtolower($categorie_prestation . "-" . $libelle_prestation . ".png");
// Create the path of the photo
$chemin_photo = $structure;

// Check if folder exists
if(is_dir($chemin_photo) === false) {
  // Create the folder
  if(!mkdir($chemin_photo, 0777, true)) {
    echo json_encode("400");
    die("500");
  }
}

// Convert the photo from base64 to data
$photo_data = $photo["base64"];
// list($type, $photo_data) = explode(';', $photo_data);
// list(, $photo_data) = explode(',', $photo_data);
// Add the photo to the folder
try {
  file_put_contents(($chemin_photo . $nom_photo), base64_decode($photo_data), LOCK_EX);
  file_put_contents("data.json", base64_decode($photo_data), LOCK_EX);
} catch(Exception $e) {
  echo $e->getMessage();
}

$prestation = strtolower("prestation_" . $categorie_prestation);
// Insert into db
$stmt = $conn->prepare("INSERT INTO $prestation (libelle_prestation, description_prestation, nom_photo, chemin_photo, id_vehicule) VALUES (?,?,?,?,?)");
$stmt->bind_param("ssssi", $libelle_prestation, $description_prestation, $nom_photo, $chemin_photo, $id_vehicule);

$stmt->execute();
$id_prestation = mysqli_insert_id($conn);

// Remove the duplicate folder create by ???
removeDirectory(__DIR__ . "/images/" . date("Y-m-d"));

// Populate the coresponding table with the data
switch($categorie_prestation) {
  case "piece":
    $stmt = $conn->prepare("INSERT INTO traitement (id_carosserie, nom_traitement, id_prestation) VALUES (?,?,?)");
    $stmt->bind_param("isi", $id_piece, $type_traitement, $id_prestation);
    break;
  case "carosserie":
    $stmt = $conn->prepare("INSERT INTO quantite (id_piece, id_prestation, quantite) VALUES (?,?,?)");
    $stmt->bind_param("iii", $id_piece, $id_prestation, $quantite);
    break;
}
// Execute the query
$stmt->execute();
echo $stmt->error;
$stmt->close();
$conn->close();

echo json_encode("200");
