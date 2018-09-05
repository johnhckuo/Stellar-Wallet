const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const client = new pg.Pool({
  connectionString: 'postgres://postgres:123@localhost:5432/stellar'
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
	return "connection close";

});

router.get('/api/v1/todos', async(req, res) => {
	const results = [];
	try{
		await client.connect();
	}catch(e){
		console.log(err);
      	return res.status(500).json({success: false, data: err});
	}
	const query = await client.query('SELECT * FROM items ORDER BY id ASC;');
	return res.json(query);
});

module.exports = router;
