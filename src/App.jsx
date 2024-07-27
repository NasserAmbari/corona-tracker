import React from 'react';
import Styled from 'styled-components';

import { BrowserRouter as Router } from 'react-router-dom';

import './App.css'
import { Routes } from './config';
import { Navbar } from './components';

const Container = Styled.div`
      width:100%;
      height:100vh;
   `;

const MainContainer = Styled.main`
   margin-left:5rem;

   @media (max-width:28.75em){
      margin-left:0;
   }
`

const App = () => {
   return (
      <Container>
         <Router>
            <Navbar />
            <MainContainer>
               <Routes />
            </MainContainer>
         </Router>
      </Container>
   )
}

export default App;