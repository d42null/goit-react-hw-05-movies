import { Outlet } from 'react-router-dom';
import { StyledNav, StyledNavLink } from './Layout.styled';
import { Suspense } from 'react';
import { Loader } from 'components/Loader/Loader';

export const Layout = () => (
  <>
    <header>
      <StyledNav>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/movies">Movies</StyledNavLink>
      </StyledNav>
    </header>
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  </>
);
