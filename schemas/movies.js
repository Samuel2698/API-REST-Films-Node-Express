import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    required_error: 'Movie title is required',
    invalid_type_error: 'Movie title must be an string'
  }),
  year: z.number().int().min(1895).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url(),
  rate: z.number().int().min(0).max(10).default(0),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Thriller',
      'Sci-Fi',
      'Crime'
    ]),
    {
      required_error: 'Movie genre is required',
      invalid_type_error: 'Movie genre must be an array of strings'
    }
  )
})

export function validatedMovie(input) {
  return movieSchema.safeParse(input)
}

export function validatedPartialMovie(input) {
  return movieSchema.partial().safeParse(input)
}
