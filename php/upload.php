<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

include("./db.php");

if(!empty($_FILES['file_attachment']['name']))
{
  // Create the path to upload the directory
  $target_dir = "/home/meung/public_html/" . $user_id . "/" . $user_folder . "/";
  // Check if the folder exist
  if (!file_exists($target_dir))
  {
    // Create the directory if it doesn't exist (recursive mode)
    mkdir($target_dir, 0777, true);
  }
  
  // Check if file already exists
  if (file_exists($target_file)) {
    // Rename the image
    $target_file = $target_dir . basename($_FILES["file_attachment"]["name"]) . random_int(0, 100);
  }
  else {
    // Name of the image
    $target_file = $target_dir . basename($_FILES["file_attachment"]["name"]);
  }

  // Lowercase the image name to avoid case sensitive issues
  $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
  
  if (
    move_uploaded_file(
      $_FILES["file_attachment"]["tmp_name"], $target_file
    )
  ) {
    echo json_encode(
      array(
        "status" => 201,
        "data" => array(),
        "msg" => "The file " . 
                  basename( $_FILES["file_attachment"]["name"]) .
                  " has been uploaded."));
  } else {
    echo json_encode(
      array(
        "status" => 400,
        "data" => array(),
        "msg" => "Sorry, there was an error uploading your file."
      )
    );
  }
}