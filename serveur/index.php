<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/thread', 'getThreads');
$app->get('/thread/:id','getThread');
$app->get('/thread/search/:query', 'findByTags');
$app->post('/thread', 'addThread');
$app->put('/thread/:id', 'updateThread');
$app->delete('/thread/:id',	'deleteThread');

$app->run();

function getThreads() {
	$sql = "select * FROM thread ORDER BY id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$threads = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		// echo '{"thread": ' . json_encode($threads) . '}';
		echo json_encode($threads);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getThread($id) {
	$sql = "SELECT * FROM thread WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$thread = $stmt->fetchObject();  
		$db = null;
		echo json_encode($thread); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addThread() {
	$request = Slim::getInstance()->request();
	$thread = json_decode($request->getBody());
	$sql = "INSERT INTO thread (title, date_time, content, tags) VALUES (:title, :date_time, :content, :tags)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql); 
		$stmt->bindParam("title", $thread->title);
		$stmt->bindParam("date_time", $thread->date_time);
		$stmt->bindParam("content", $thread->content);
		$stmt->bindParam("tags", $thread->tags);
		$stmt->execute();
		$thread->id = $db->lastInsertId();
		$db = null;
		echo json_encode($thread); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateThread($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$thread = json_decode($body);
	$sql = "UPDATE thread SET title=:title, date_time=:date_time, content=:content, tags=:tags WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("title", $thread->title);
		$stmt->bindParam("date_time", $thread->date_time);
		$stmt->bindParam("content", $thread->content);
		$stmt->bindParam("tags", $thread->tags);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($thread); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteThread($id) {
	$sql = "DELETE FROM thread WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findByTags($query) {
	$sql = "SELECT * FROM thread WHERE UPPER(tags) LIKE :query ORDER BY tags";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$threads = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($threads);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="root";
	$dbname="freecat";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>