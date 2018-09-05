const pg = require('pg');

const client = new pg.Client({
  connectionString: 'postgres://postgres:123@localhost:5432/stellar'
})
client.connect()
  .then(() =>{
  	console.log('connected')
  	client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)', (err, res) => {
	  if (err) throw err
	  console.log(res)
	  client.end()
	})
  })
  .catch(e => console.error('---------- connection error ----------', e.stack));