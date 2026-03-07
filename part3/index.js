const http = require('http');

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "CSS is easy",
    important: false
  },
  {
    id: 3,
    content: "JS is easy",
    important: true
  },
]


const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})

const PORT = 3001;

app.listen(PORT)
console.log(`Server running on port ${PORT}`)
