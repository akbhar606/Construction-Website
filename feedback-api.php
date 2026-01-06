<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$feedbackFile = 'feedbacks.json';

// GET - Read feedbacks
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($feedbackFile)) {
        $feedbacks = json_decode(file_get_contents($feedbackFile), true);
        echo json_encode($feedbacks);
    } else {
        echo json_encode([]);
    }
}

// POST - Add new feedback
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if ($input) {
        $feedbacks = [];
        if (file_exists($feedbackFile)) {
            $feedbacks = json_decode(file_get_contents($feedbackFile), true);
        }
        
        $newFeedback = [
            'id' => time(),
            'name' => $input['name'],
            'email' => $input['email'],
            'phone' => $input['phone'] ?? '',
            'project' => $input['project'] ?? '',
            'rating' => (int)$input['rating'],
            'feedback' => $input['feedback'],
            'location' => 'Dehradun',
            'date' => date('Y-m-d'),
            'timestamp' => date('c')
        ];
        
        $feedbacks[] = $newFeedback;
        file_put_contents($feedbackFile, json_encode($feedbacks, JSON_PRETTY_PRINT));
        
        echo json_encode(['success' => true, 'feedback' => $newFeedback]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid input']);
    }
}
?>