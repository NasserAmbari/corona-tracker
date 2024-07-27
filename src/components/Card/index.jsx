import React, {useEffect, useState} from 'react';
import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dimension } from '../../config';

import {
   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const Card = Styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:column;
   justify-content:space-evenly;
   align-items:center;

   h3{
      font-size:1rem;
   }

   .icon {
      color:#${props => props.colorIcon};
      font-size:1.6rem;
   }

   p{
      font-size:1rem;
   }
`


const Cards = ({title, icon, nums, dataCovid, keys, color, isSingle, domain}) => {
   
   const box = {
      boxShadow: "2px 4px 10px 0px rgba(0,0,0,0.23)",
      borderRadius:"8px",
      padding:"1rem", 
      background:"#FFFFFF",
      minWidth: "180px",
      maxWidth: "280px"
   };

   const { height, width } = Dimension();

   return(
      <Card colorIcon={ color } style={isSingle ? box : true}>
         <h3>
            {title}
         </h3>

         {isSingle ? 
         <LineChart  width={width < 480 ? 150 : 200}  height={width < 480 ? 75 : 100} data={dataCovid} >
            <Line type="monotone"  dataKey={keys} stroke={"#"+color} strokeWidth={1}/>
            
            <YAxis hide={true} domain={domain[0]}/>
         </LineChart>
         :
         <FontAwesomeIcon icon={icon} className="icon"/> 
         }

         <h3>
            {nums}
         </h3>
      </Card>
   )
}

export default Cards;