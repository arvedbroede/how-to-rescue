<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  $to = 'brodearved@gmail.com'; // Hier deine E-Mail-Adresse eintragen

  $subject = 'Kontaktformular - FeuerwehrTalk';
  $body = "Name: $name\n\nE-Mail: $email\n\nNachricht:\n$message";

  if (mail($to, $subject, $body)) {
    echo 'success';
  } else {
    echo 'error';
  }
}
?>
