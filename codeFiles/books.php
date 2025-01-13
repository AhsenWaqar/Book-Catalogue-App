<?php
$filename = 'books.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    file_put_contents($filename, json_encode($data));
    echo json_encode(['status' => 'success']);
} else {
    if (file_exists($filename)) {
        $data = json_decode(file_get_contents($filename), true);
        echo json_encode($data);
    } else {
        echo json_encode([]);
    }
}
?>
