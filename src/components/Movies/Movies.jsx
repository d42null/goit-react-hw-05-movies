import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getMoviesBySearchQ } from 'services/themoviedborg-api';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const location = useLocation();
  useEffect(() => {
    if (!query) return;
    const fetch = async query => {
      setLoading(true);
      try {
        const data = await getMoviesBySearchQ(query);
        setMovies(data.results);
        if (data.results.length === 0) setError({ message: 'No Results' });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetch(query);
  }, [query]);

  const onSubmit = e => {
    e.preventDefault();
    setSearchParams(
      e.target.query.value.trim() ? { query: e.target.query.value.trim() } : {}
    );
    setMovies([]);
    setError(null);
    e.target.reset();
  };
  return (
    <main>
      <form onSubmit={onSubmit}>
        <input name="query" type="text" />
        <button type="submit">Search</button>
      </form>
      {loading && <Loader />}
      {error && <p>{error.message}</p>}
      {movies.length > 0 && (
        <ul>
          {movies.map(x => (
            <li key={x.id}>
              <Link to={`${x.id}`} state={{ from: location }}>
                {`${x.title}(${x.release_date})`}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};
export default Movies;
