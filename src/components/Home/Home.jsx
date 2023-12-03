import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getTrending } from 'services/themoviedborg-api';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const data = await getTrending();
        setMovies(data.results);
        if (data.results.length === 0) setError({ message: 'No Results' });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <main>
      <h2>Trending Today</h2>
      <ul>
        {movies.map(x => (
          <li key={x.id}>
            <Link to={`movies/${x.id}`} state={{ from: location }}>
              {x.title}
            </Link>
          </li>
        ))}
      </ul>
      {loading && <Loader />}
      {error && <p>{error.message}</p>}
    </main>
  );
};
export default Home;
