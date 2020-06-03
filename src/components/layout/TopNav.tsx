import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { pages } from "../../config/pages";

const NavCtnr = styled.aside`
  width: 100%;
  background: #555;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const NavItem = styled.li`
  a {
    text-decoration: none;
    padding: 1rem;
    display: inline-block;
    color: #eee;
  }
`;

export default function TopNav() {
  return (
    <NavCtnr>
      <NavList>
        <NavItem>
          <Link to={pages.home.path}>Home</Link>
        </NavItem>
        <NavItem>
          <Link to={pages.about.path}>About</Link>
        </NavItem>
      </NavList>
    </NavCtnr>
  );
}
