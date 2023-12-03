import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from 'services/themoviedborg-api';
import { CastCard, CastList } from './Cast.styled';
import { Loader } from 'components/Loader/Loader';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  useEffect(() => {
    const fetch = async id => {
      setLoading(true);
      try {
        const data = await getMovieCast(id);
        setCast(data.cast);
        if (data.cast.length === 0) setError({ message: 'No Results' });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetch(movieId);
  }, [movieId]);
  return (
    <>
      {loading && <Loader />}
      {error && <p>{error.message}</p>}
      <CastList>
        {cast.map(x => (
          <CastCard key={x.name}>
            {x.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${x.profile_path}`}
                alt={`${x.name}`}
                width="80"
              />
            )}
            <div>
              <h5>{x.name}</h5>
              {x.character && <h6>{`${x.character}`}</h6>}
            </div>
          </CastCard>
        ))}
      </CastList>
    </>
  );
};
export default Cast;
