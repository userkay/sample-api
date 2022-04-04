import express from 'express';
import { v4 as uuid } from 'uuid';

let data = {
	users: [
		{
	        id: 1,
	        firstname: "Jane",
	        lastname: "Doe",
	        age: 20
	    },
	    {
	        id: 2,
	        firstname: "John",
	        lastname: "Doe",
	        age: 20
	    }
	],
	products: [],
	pages: [],
	orders: []
}

const filterByField = ({ model, field, value }) => {
	return data[model] != undefined ? data[model].filter((entry) => entry[field] == value) : []
};

const filterByNotField = ({ model, field, value }) => {
	return data[model] != undefined ? data[model].filter((entry) => entry[field] != value) : []
};

export const getAllEntries = ((req, res) => {
	const { model } = req.params

	if (data[model] == undefined) {
		res.send(`Model ${model} does not exit in database. Couldn't insert record`)
	}

	console.log(data[req.params.model])
	res.send(data[req.params.model]);
});

export const getEntries = ((req, res) => {
	const { model } = req.params

	if (data[model] == undefined) {
		res.send(`Model ${model} does not exit in database. Couldn't insert record`)
	}

	const entry = filterByField(req.params)
	console.log(entry)
	res.send(entry);
});

export const updateEntries = ((req, res) => {
	const { model } = req.params

	if (data[model] == undefined) {
		res.send(`Model ${model} does not exit in database. Couldn't insert record`)
	}

	let entries = filterByField(req.params)

	entries.forEach(entry => {
		Object.keys(req.body).map(item => entry[item] = req.body[item])
		// entry = { ...entry, ...req.body }
	})

	console.log(`${entries.length} entries updated`)
	res.send(`${entries.length} entries updated`);
});

export const createEntry = ((req, res) => {
	const { model } = req.params

	if (data[model] == undefined) {
		res.send(`Model ${model} does not exit in database. Couldn't insert record`)
	}

	data[model].push({ ...req.body })

	console.log(`Record inserted successfully`)
	res.send(`Record inserted successfully`);
});

export const deleteEntry = ((req, res) => {
	const { model } = req.params

	if (data[model] == undefined) {
		res.send(`Model ${model} does not exit in database. Couldn't insert record`)
	}
	
	const entries = filterByNotField(req.params)
	let num_deleted = data[model].length - entries.length
	data[model] = entries
	res.send(`${num_deleted} entries deleted`);
});
