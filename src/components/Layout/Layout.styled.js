import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
export const StyledNavLink = styled(NavLink)`
  color: #eee;
  background-color: #333;
  border-radius: 8px;
  padding: 4px;
  text-decoration: none;
  &.active {
    color: #333;
    background-color: #eee;
    text-decoration: underline;
  }
`;
export const StyledNav = styled.nav`
  display: flex;
  gap: 8px;
  border-bottom: solid 2px #777;
  padding: 4px;
`;
