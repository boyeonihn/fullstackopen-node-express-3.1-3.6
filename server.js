

const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]; 



app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const date = new Date(); 
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id); 
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(entry => entry.id != id)
    response.status(204).end()
})


const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }

  

app.post('/api/persons', (request, response) => {
    const body = request.body 
    
    let entry = {
        'id': generateId, 
        'name': body.name,
        'number': body.number  
    }

    persons = persons.push(entry)
    response.json(entry)
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}, betta go catch it!`)
})


/* 
3.5: Phonebook backend step5
Expand the backend so that new phonebook entries can be added by making HTTP POST requests to the address http://localhost:3001/api/persons.

Generate a new id for the phonebook entry with the Math.random function. Use a big enough range for your random values so that the likelihood of creating duplicate ids is small.

3.6: Phonebook backend step6
Implement error handling for creating new entries. The request is not allowed to succeed, if:

The name or number is missing
The name already exists in the phonebook
Respond to requests like these with the appropriate status code, and also send back information that explains the reason for the error, e.g.:

{ error: 'name must be unique' }
*/
