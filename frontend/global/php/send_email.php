<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST["message"]);

    // Überprüfen, ob die E-Mail-Adresse gültig ist
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Ungültige E-Mail-Adresse.");
    }

    // Empfänger-Adresse (ÄNDERE DIESE E-MAIL)
    $to = "info@how-to-rescue.de"; 

    // Betreff der E-Mail
    $subject = "Neue Kontaktanfrage von $name";

    // Nachricht formatieren
    $emailBody = "Name: $name\n";
    $emailBody .= "E-Mail: $email\n";
    $emailBody .= "Nachricht:\n$message\n";

    // Header setzen
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // E-Mail senden
    if (mail($to, $subject, $emailBody, $headers)) {
        echo "Danke, Ihre Nachricht wurde gesendet!";
    } else {
        echo "Fehler beim Senden der Nachricht.";
    }
} else {
    echo "Ungültige Anfrage.";
}
?>
