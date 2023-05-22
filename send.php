<?php

$recepient = "kateiiverem@gmail.com";
$siteName = "Ajax-форма";

$email = trim($_POST["email"]);
$message = "Имя: $email";

$pagetitle = "Заявка с сайта \"$siteName\"";
mail('missvol4ica@gmail.com', $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>