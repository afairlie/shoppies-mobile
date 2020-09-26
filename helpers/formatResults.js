export default function formatSearchResults(results, nominations) {

  if (!results) {
    return []
  }

  return results.map((movie) => {
    // if movie is nominated, format true, else format false
    const nominated = nominations.find(nom => nom.id === movie.imdbID)
    return nominated ? { id: movie.imdbID, title: movie.Title, year: movie.Year, nominated: true } 
      : { id: movie.imdbID, title: movie.Title, year: movie.Year, nominated: false }
  })
}