const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const client = new pg.Pool({
  connectionString: 'postgres://postgres:123@localhost:5432/stellar'
})

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '..', '..', 'client', 'views', 'index.html'));
});


router.post('/api/v1/todos', async (req, res, next) => {
	// Grab data from http request
	const data = {text: req.body.text, complete: false};
	// Get a Postgres client from the connection pool
	try{
		await client.connect();
	}catch(err){
		console.log(err);
      	return res.status(500).json({success: false, data: err});
	}

	// SQL Query > Insert Data
	let insert = await client.query('INSERT INTO items(text, complete) values($1, $2)',
	[data.text, data.complete]);
	// SQL Query > Select Data
	let query = await client.query('SELECT * FROM items ORDER BY id ASC');
	// Stream results back one row at a time

	query.rows.forEach(row=>{
	    console.log(row);
	});
	//await client.end();
	return res.json({result: "success"});

});

router.get('/api/v1/todos', async(req, res) => {

	try{
		await client.connect();
	}catch(e){
		console.log(err);
      	return res.status(500).json({success: false, data: err});
	}
	const query = await client.query('SELECT * FROM items ORDER BY id ASC;');
	return res.json(query);
});


router.put('/api/v1/todos/:todo_id', async (req, res, next) => {

	// Grab data from the URL parameters
	const id = req.params.todo_id;
	// Grab data from http request
	const data = {text: req.body.text, complete: req.body.complete};
	// Get a Postgres client from the connection pool
	try{
		await client.connect();
	}catch(e){
		console.log(err);
	  	return res.status(500).json({success: false, data: err});
	}

    // SQL Query > Update Data
    await client.query('UPDATE items SET text=($1), complete=($2) WHERE id=($3)',
    [data.text, data.complete, id]);
    // SQL Query > Select Data
    const query = await client.query("SELECT * FROM items WHERE id=($1)", [id]);
	//await client.end();
	return res.json(query.rows);
});


router.delete('/api/v1/todos/:todo_id', async (req, res, next) => {

	// Grab data from the URL parameters
	const id = req.params.todo_id;

	try{
		await client.connect();
	}catch(e){
		console.log(err);
	  	return res.status(500).json({success: false, data: err});
	}

	// SQL Query > Delete Data
	await client.query('DELETE FROM items WHERE id=($1)', [id]);
	// SQL Query > Select Data
	var query = await client.query('SELECT * FROM items ORDER BY id ASC');
	return res.json(query);

});

module.exports = router;
