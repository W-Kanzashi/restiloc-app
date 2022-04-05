<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
include('db.php');

$prestations = $decodedData['Prestations'];

$decodeData = include 'file.json';

echo json_encode($decodedData);

$SQL = "INSERT INTO `piece` (`id_piece`, `nom_piece`, `libelle_piece`) VALUES ([value-1],[value-2],[value-3 JOIN quantite (`quantite`) VALUES () JOIN `prestation` ()";

mysqli_close($conn);
