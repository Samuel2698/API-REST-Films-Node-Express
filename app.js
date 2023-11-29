const express = require('express')
const crypto = require('node:crypto')
const { validatedMovie, validatedPartialMovie } = require('./schemas/movies')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')
app.use(express.json())

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'https://movies.com'
]

app.get('/', (req, res) => {
  res.send('<h1>Welcome ! ;)</h1>')
})

app.get('/movies', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )
    res.json(filteredMovies)
  }

  return res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const findedMovie = movies.find((movie) => movie.id === id)
  if (findedMovie) return res.json(findedMovie)
  return res.status(404).json({ message: 'Movie id not finded' })
})

app.post('/movies', (req, res) => {
  const result = validatedMovie(req.body)
  if (result.error) {
    res.json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)

  return res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const result = validatedPartialMovie(req.body)
  if (!result.success) {
    res.json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const findedIndexMovie = movies.findIndex((movie) => movie.id === id)
  if (findedIndexMovie === -1) {
    res.status(404).json({ message: 'Movie id not found' })
  }

  const updatedMovie = {
    ...movies[findedIndexMovie],
    ...result.data
  }

  movies[findedIndexMovie] = updatedMovie

  return res.json(updatedMovie)
})

app.delete('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { id } = req.params
  const findedIndexMovie = movies.findIndex((movie) => movie.id === id)
  if (findedIndexMovie === -1) {
    res.status(404).json({ message: 'Movie id not found' })
  }

  movies.splice(findedIndexMovie, 1)

  return res.json({ message: 'The movie has been deleted' })
})

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'DELETE')
  }

  res.send()
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`)
})
