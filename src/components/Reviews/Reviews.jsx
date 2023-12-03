import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from 'services/themoviedborg-api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  useEffect(() => {
    const fetch = async id => {
      setLoading(true);
      try {
        const data = await getMovieReviews(id);
        setReviews(data.results);
        if (data.results.length === 0) setError({ message: 'No Reviews' });
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
      <ul>
        {reviews.map(x => (
          <li key={x.created_at}>
            <h5>{x.author}</h5>
            <p>{x.content}</p>
          </li>
        ))}
      </ul>
      {loading && <Loader />}
      {error && <p>{error.message}</p>}
    </>
  );
};
export default Reviews;
