import React from 'react';
import { Link } from 'react-router-dom';

import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faGlobeAsia, faCogs } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-regular-svg-icons';

const Container = Styled.nav`
   width:5rem;
   height:100vh;
   position:fixed;
   background-color: #23232e;
   z-index:10;

   .fa-chart-bar, .fa-map-marked-alt, .fa-globe-asia, .fa-cogs{
      font-size:2rem;
   }

   @media (max-width:28.75em){
      height:5rem;
      width:100vw;
      bottom:0;
   }
`;

const NavbarNav = Styled.ul`
   height:100%;
   list-style:none;
   padding:0;
   display:flex;
   flex-direction:column;
   align-items:center;

   @media (max-width:28.75em){
      height:5rem;
      width:100vw;
      bottom:0;
      flex-direction:row;
      justify-content:space-evenly;
   }
`;

const NavbarLink = Styled.li`
   padding:1.6rem 0;
   color: #F2AF29; 

   &, a:visited{
      color: #F2AF29; 
   }

   :last-child{
      margin-top:auto;
   }

   :hover{
      color:#AD343E;
   }
`;

const Navbar = () => {

   return(
      <Container>
         <NavbarNav>
            <NavbarLink>
               <Link to="/">
                  <FontAwesomeIcon 
                     icon={faMapMarkedAlt} />
               </Link>
            </NavbarLink>
            <NavbarLink>
               <Link to="/statistics">
                  <FontAwesomeIcon 
                     icon={faChartBar} />
               </Link>
            </NavbarLink>
            <NavbarLink>
               <Link to="/country">
                  <FontAwesomeIcon 
                     icon={faGlobeAsia} />
               </Link>
            </NavbarLink>
            <NavbarLink>
               <FontAwesomeIcon icon={faCogs} />
            </NavbarLink>
         </NavbarNav>
      </Container>
   )
}

export default Navbar;