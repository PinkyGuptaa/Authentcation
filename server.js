const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
require("dotenv").config();
const Port = process.env.SERVER_PORT || 6001;
const db = require('./util/db_connection');
const cors = require("cors");

app.use(cors());
app.use(express.json());


app.use("/user", require("./routes/user.routes"));

app.listen(Port, () => {
    try {
        console.log(`API running at port no. ${Port}!`);
        db.authenticate()
            .then(() => {
                console.log(`${process.env.DB_DIALECT} database is connected!`);
            })
                .catch(err => console.error(err));
    }
    catch (error) {
        console.error(`Error while running API ${error}!`);
    }
})


/*
let database = [{
	name: 'pinky gupta',
	password: "pink123"
},
{
	name: 'Rahul',
	password: "abc"
}
];


app.get('/', (req,res) => {
	res.json({
		route: '/',
		authentication: false
	});
});


app.post('/login', (req, res) => {
	const name = req.body.name;
	const password = req.body.password;

	let isPresent = false;
	let isPresentIndex = null;

	for (let i=0;i<database.length; i++)
	{
		if(database[i].name === name && database[i].password === password){
			isPresent = true;
			isPresentIndex = i;
			break;
		}
	}
	if(isPresent){
		const token = jwt.sign(
			database[isPresentIndex],
			'secret' 
		);
		res.json ({
			login: true,
			token: token,
			data: database[isPresentIndex]
		});
	}else {
		res.json({
			login: false,
			error: 'name and password are invalid.'
		});
	}

});
app.get("/auth", (req, res) => {
	const token = req.body.token;
	if (token) {
	  const decode = jwt.verify(token, "secret");
	  res.json({
		login: true,
		data: decode,
	  });
	} else {
	  res.json({
		login: false,
		data: "error",
	  });
	}
  });
  app.listen(port, () => {
	console.log(`server is running at port ${port}`);
});*/