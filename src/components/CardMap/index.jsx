import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { faUserInjured, faCrutch, faSkullCrossbones, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../index'

const Container = Styled.section`
   grid-template-rows: 1fr 1fr 1fr 1fr;
   grid-template-columns: 1fr;
   gap: 1rem;
   height:100vh;
   width:20vw;
   padding: 1rem;
   @media (max-width:28.75em){
      display:none;
   }
`;

const CardContainer = Styled.article`
   height:100%;
   width:100%;
   border-radius:8px;
   box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
               0 2px 4px rgba(0,0,0,0.07), 
               0 4px 8px rgba(0,0,0,0.07), 
               0 8px 16px rgba(0,0,0,0.07),
               0 16px 32px rgba(0,0,0,0.07), 
               0 32px 64px rgba(0,0,0,0.07);
   padding:1rem;
   display:grid;
   grid-template-columns: 1fr;
   grid-template-rows: 1fr 1fr 1fr 1fr;
   gap: 2rem;
`

const CardMap = ({ country }) => {

   return (
      <Container>
         <CardContainer>
            <Card title="Cases" icon={faUserInjured} nums={country.cases} color="638475"></Card>
            <Card title="Recovered" icon={faHeart} nums={country.recovered} color="90E39A"></Card>
            <Card title="Critical" icon={faCrutch} nums={country.critical} color="F2C14E"></Card>
            <Card title="Death" icon={faSkullCrossbones} nums={country.deaths} color="CE4760"></Card>
         </CardContainer>
      </Container>
   )
}

export default CardMap;