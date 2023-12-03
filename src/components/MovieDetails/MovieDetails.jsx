import { Loader } from 'components/Loader/Loader';
import {
  BackLink,
  Container,
} from 'components/MovieDetails/MovieDetails.styled';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMovieDetails } from 'services/themoviedborg-api';

const MovieDetails = () => {
  const [movie, setMovie] = useState({ imgSrc: '', alt: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backLocation = useRef(location.state?.from ?? '/');
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(movieId);
        setMovie({
          imgSrc: data.poster_path,
          title: data.title,
          overview: data.overview,
          genres: data.genres.map(x => x.name).join(' '),
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [movieId]);
  return (
    <main>
      <BackLink to={backLocation.current}>Go back</BackLink>
      {loading && <Loader />}
      {error && <p>{error.message}</p>}
      {!loading && (
        <>
          <Container>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.imgSrc}`}
              alt={movie.title}
              width="200"
            ></img>
            <section>
              <h2>{movie.title}</h2>
              <h4>Overview</h4>
              <p>{movie.overview}</p>
              <h4>Genres</h4>
              <p>{movie.genres}</p>
              <h4>Additional information</h4>
              <ul>
                <li>
                  <Link to="cast">Cast</Link>
                </li>
                <li>
                  <Link to="reviews">Reviews</Link>
                </li>
              </ul>
            </section>
          </Container>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </>
      )}
    </main>
  );
};
export default MovieDetails;
