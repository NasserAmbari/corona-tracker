import React, { useState, useEffect, useRef } from 'react';
import Styled from 'styled-components';
import { 
   Map as ConteinerMap, TileLayer, Marker, Popup, 
} from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { Search } from '../index';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


let DefaultIcon = new Icon({
   iconUrl: icon,
   shadowUrl: iconShadow
});

const Container = Styled.section`
   Width:100%;
   height:100vh;
   padding:1rem;
   position:relative;
   @media (max-width:28.75em){
      padding:0;
      height:100vh;
   }
`;

const Map = ({ data, getIdCountry, filteredCountry }) => {
   const [ positionMap, setPositionMap ] = useState([-1.23, 116.89]);
   const [ selected, setSelected ] = useState();
   const markerRefs  = useRef([]);

   const getCapitalized = (str) => {
      let splitStr = str.toLowerCase().split(' ');
      for (let i = 0; i < splitStr.length; i++) {
         splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
      }
      return splitStr.join(' '); 
   }

   const handleSeachCountry = (newValue) => {
      
      const newString = getCapitalized(newValue);
      const country = data.find((elm) => {
         return elm.country === newString 
      })

      setPositionMap([
         country ? country.countryInfo.lat  : -1.23,
         country ? country.countryInfo.long : 116.89,
      ]);

      getIdCountry(country.countryInfo._id);
   }

   const test = (id) => {
      // markerRefs[id].leafletElement.openPopup();
      console.log("YOMANN");
      console.table(markerRefs);
   }


   function PointsLayer(props) {
      const { data,selectedIndex } = props;
      return data.map((item, index) => (
         <PointMarker
            key={index}
            content={item.name}
            center={{ lat: item.lat, lng: item.lng }}
            openPopup={selectedIndex === index}
         />
      ));
   }

   function PointMarker(props) {
      const markerRef = useRef(null);
      const { position, icon, countryName, openPopup, idCountry } = props;

      useEffect(() => {
         if (openPopup) markerRef.current.leafletElement.openPopup();
      }, [openPopup]);

      return (
         <Marker 
            ref={markerRef}
            position={position}
            icon={icon}
            onclick={
               () => {
                  getIdCountry(idCountry);
                  setPositionMap(position);
                  console.log(markerRef);
               }
            }
            >
            <Popup >{countryName}</Popup>
         </Marker>
      );
   }

   const onOpenPopUp = () => {
      getIdCountry(element.countryInfo._id);
      setPositionMap([element.countryInfo.lat,element.countryInfo.long]);
   }

   return (
      <Container>
         <Search getNameCountry={handleSeachCountry} filteredCountry={ filteredCountry } test={test}></Search>

         <ConteinerMap center={positionMap} zoom={5}>
            <TileLayer
               attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
               data.map((element,index) => {
                  const flagIcon = new Icon({
                     iconUrl: element.countryInfo.flag,
                     iconSize:[20,15]
                  })
                  if(element.countryInfo._id){
                     return (

                        // <PointsLayer 
                        //    selectedIndex={selected} 
                        //    data={[
                        //       element.country,
                        //       element.countryInfo.lat,
                        //       element.countryInfo.long
                        //    ]}  />

                        // <PointMarker 
                        //    key={ element.countryInfo._id }
                        //    position={[
                        //       element.countryInfo.lat,
                        //       element.countryInfo.long
                        //    ]}
                        //    icon={flagIcon}
                        //    countryName = { element.country }
                        //    idCountry={ element.countryInfo._id }
                        // ></PointMarker>

                        <Marker 
                           key={ element.countryInfo._id } 
                           position={[
                              element.countryInfo.lat,
                              element.countryInfo.long
                           ]}
                           icon={flagIcon}
                           >
                           <Popup onOpen={ () => { 
                              getIdCountry(element.countryInfo._id);
                              setPositionMap([element.countryInfo.lat,element.countryInfo.long]);
                              } }>  
                                 { element.country }
                           </Popup>
                        </Marker>
                     )
                  }
               })
            }

         </ConteinerMap>
      </Container>
   )
}

export default Map;