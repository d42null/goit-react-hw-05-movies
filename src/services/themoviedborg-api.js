import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWJmMDkxZTAyMWNkZmJjMWYxOTY3NWM0Y2E5ZDRmOSIsInN1YiI6IjY1Njg5MGY1ZDEzMzI0MDBmZWU4MzQ0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nK9GQ_7GBvsy7RiLUSdn8KKUHJGeDfbf8eLgJYMnVB0',
};
const searchParams = new URLSearchParams({
   language: 'en-US',
});
export const getTrending = async () => {
  const resp = await axios.get(`trending/movie/day?${searchParams}`);
  return await resp.data;
};
export const getMovieDetails = async id => {
  const resp = await axios.get(`movie/${id}?${searchParams}`);
  return await resp.data;
};
export const getMoviesBySearchQ = async searchQ => {
  searchParams.set('query', searchQ);
  const resp = await axios.get(`search/movie?${searchParams}`);
  return await resp.data;
};
export const getMovieCast = async id => {
  const resp = await axios.get(`movie/${id}/credits?${searchParams}`);
  return await resp.data;
};
export const getMovieReviews = async id => {
  const resp = await axios.get(`movie/${id}/reviews?${searchParams}`);
  return await resp.data;
};
