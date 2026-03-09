const express = require('express');
const app = express();
app.use(express.json());

let people = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  response.send(`phone book has info for ${people.length} people \n ${new Date()}`);
})


app.get('/api/people', (request, response) => {
  response.json(people);
})

app.post('/api/people', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or Number missing'
    })
  }

  const nameExists = people.some(person => person.name === body.name)

  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: Math.floor(Math.random() * 100000).toString(),
    name: body.name,
    number: body.number
  }

  people = people.concat(person);

  response.json(person)
})

app.delete('/api/people/:id', (request, response) => {
  const id = request.params.id;
  people = people.filter(obj => obj.id !== id)
  response.status(204).end();
})

app.get('/api/people/:id', (request, response) => {
  const id = request.params.id;
  const person = people.find(person => person.id === id)
  person ? response.json(person) : response.status(404).end();
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
