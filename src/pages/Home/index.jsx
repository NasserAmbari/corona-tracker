import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Styled from 'styled-components';
import { Map, CardMap, Search } from '../../components';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

const Container  = Styled.main`
   height:100vh;
   display:flex;
   background: #F7F8FC;
`;

const Home = () => {

   const [ data, setData ] = useState([]);
   const [ dataCountry, setDataCountry ] = useState([]);
   const [ idCountry, setIdCountry ] = useState(0);
   const [ infoCountry, setInfoCountry ] = useState({
      cases: 0,
      recovered: 0,
      critical: 0,
      deaths: 0
   });
   
   const [ searchCountry, setSearchCountry ] = useState("");

   const handleClickCountry = (newValue) => {
      setIdCountry(newValue);
   }

   const getAllNums = (eachData) => {
      return eachData.countryInfo._id === idCountry
   }

   useEffect(()=>{
      if(data.length <= 0){
         Axios.get(`https://disease.sh/v3/covid-19/countries?yesterday=true`)
            .then(res => {
               setData(res.data);
               setDataCountry(res.data.map(function (el) {
                  return el.country;
               }));
            }
         );
         console.log("First Initialization Map");
      }
      else if(idCountry){
         const infoCountry = data.find(getAllNums);
         setInfoCountry({
            cases: infoCountry.cases,
            recovered: infoCountry.recovered,
            critical: infoCountry.critical,
            deaths: infoCountry.deaths
         })
      }
   },[ idCountry ])

   return (
      <Container>
         <Map data={ data } getIdCountry={handleClickCountry} filteredCountry={ dataCountry }></Map>
         <CardMap country={ infoCountry }></CardMap>
      </Container>
   )
}

export default Home;