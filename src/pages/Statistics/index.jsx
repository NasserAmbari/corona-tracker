import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import Styled from 'styled-components';
import { Card, PieChartsColorized } from '../../components';
import { Dimension } from '../../config'; 
import { faUserInjured, faSkullCrossbones, faHeart } from '@fortawesome/free-solid-svg-icons';
import {
   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const Container = Styled.div`
   display: flex;
   flex-direction:column;
   padding:1.2rem;
   width:100%;
   min-height: 100vh;
   background: #F7F8FC;
   font-size: 1rem;
`

const CardContainer = Styled.div`
   display:flex;
   gap: 1rem;
   padding:1rem 0 2rem 0;
   overflow-x :auto;
   max-width : 1440px;
`

const InnerCardContainer = Styled.div`
   display:flex;
   flex-direction:column;
   gap: 1rem;
   padding:1rem 0 2rem 0;
   width:100%;
   max-width : 360px;
   box-shadow : 2px 4px 10px 0px rgba(0,0,0,0.23);
   justify-content:center;
   align-items : center;
   background: #FFFFFF;
   border-radius : 8px;
   
   @media(max-width:28.75em){
      &{
         max-width:460px;
      }
   }
`
const NewCardContainer = Styled.div`
   display:flex;
   gap:1.2rem;
   overflow-x :auto;
   padding:1rem 0 2rem 0;
   width:100%;
   max-width : 1440px;
   
   @media(max-width:28.75em){
      &{
         flex-direction:column;
      }
   }
`

const GapMargin = Styled.div`
   width:100&;
`
const box = {
   boxShadow: "2px 4px 10px 0px rgba(0,0,0,0.23)",
   borderRadius:"8px",
   padding:"1rem", 
   background:"#FFFFFF",
};

const data = [
   {
      name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
   },
   {
      name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
   },
   {
      name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
   },
   {
      name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
   },
   {
      name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
   },
   {
      name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
   },
   {
      name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
   },
];

const Statistics = () => {
   const { height, width } = Dimension();

   const days = [0,6,13,20,27,34,41]; 

   const [ infoWorldCases, setInfoWorldCases ] = useState([]);
   const [ latestInfoWorld, setLatestInfoWorld ] = useState([]);
   const [ domainCases, setDomainCases ] = useState([]);
   const [ domainRecovered, setDomainRecovered ] = useState([]);
   const [ domainDeath, setDomainDeath ] = useState([]);
   
   useEffect(()=>{
      Axios.get(`https://disease.sh/v3/covid-19/historical/all?lastdays=42`)
         .then(res => { 
            const data = res.data;
            const newArray = [];
            const cases = Object.values(data.cases);
            const recovered = Object.values(data.recovered);
            const deaths = Object.values(data.deaths);

            for(let i = 0; i < days.length ; i++){
               newArray.push({
                  cases : cases[days[i]],
                  recovered : recovered[days[i]],
                  deaths : deaths[days[i]]
               })
            };

            const [lastCases, lastRecovered, lastDeath] = [ 
               cases[days[days.length-1]],
               recovered[days[days.length-1]],
               deaths[days[days.length-1]]
            ];

            const [nowCases, nowRecovered, nowDeath] = [ 
               cases[0],
               recovered[0],
               deaths[0]
            ];

            setDomainCases(
               [nowCases, // Last 42 Days
               lastCases] // Now Days
            );

            
            setDomainRecovered( 
               [nowRecovered, // Last 42 Days
               lastRecovered ] // Now Days
            );

            setDomainDeath( 
               [nowDeath, // Last 42 Days
               lastDeath ]// Now Days
               );

            setInfoWorldCases(newArray);
            
            setLatestInfoWorld([
               { name : "Cases", value : nowCases },
               { name : "Recovered", value : nowRecovered},
               { name : "Death", value : nowDeath},
            ])
         }
      );
   },[])

   return (
      <Container>
         <h3>World Cases</h3>
         <CardContainer>
            <Card title="Cases"     icon={faUserInjured}     nums={domainCases[1]}     color="638475" isSingle={true} dataCovid={infoWorldCases} keys="cases" domain={domainCases}></Card>
            <Card title="Recovered" icon={faHeart}           nums={domainRecovered[1]} color="90E39A" isSingle={true} dataCovid={infoWorldCases} keys="recovered" domain={domainRecovered}></Card>
            <Card title="Death"     icon={faSkullCrossbones} nums={domainDeath[1]}     color="CE4760" isSingle={true} dataCovid={infoWorldCases} keys="deaths" domain={domainDeath}></Card>
         </CardContainer>

         <NewCardContainer>

            <InnerCardContainer>
               <h4>Percentage</h4>
               <PieChartsColorized data={latestInfoWorld}/>
            </InnerCardContainer>
            
            <InnerCardContainer style={{maxWidth:"520px"}}>
               <h4>Dialy Change</h4>

               <AreaChart
               width={width < 360 ? 320 : 520 } 
               height={280}
               data={data}
               margin={{
                  top: 10, right: 30, left: 0, bottom: 0,
               }}
               >
               <CartesianGrid strokeDasharray="3 3" />
               
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip />
               <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
               <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
               <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
               </AreaChart>
            </InnerCardContainer>

            </NewCardContainer>
            <GapMargin style={{margin:"1.6rem 0"}} />
      </Container>
   )
}

export default Statistics;