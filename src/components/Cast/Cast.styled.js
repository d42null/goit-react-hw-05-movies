import styled from 'styled-components';
export const CastList = styled.ul`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 8px;
`;
export const CastCard = styled.li`
  background-color: #777;
  color: #eee;
  flex-basis: calc((100% - 5 * 16px) / 6);
  display: flex;
  border: solid 2px #eee;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.75);
`;
