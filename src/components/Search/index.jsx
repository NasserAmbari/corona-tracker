import React, { useState } from 'react';
import Styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Container = Styled.div`
   width:300px;
   height:32px;
   position:absolute;
   right:1rem;
   z-index:1;
   margin:1rem;

   @media (max-width:320px){
      right:0rem;
   }
`;

const InputSearch = Styled.input`
   width:100%;
   height:100%;
   border-radius:6px;
   border:none;
   padding:1rem 2rem 1rem 1rem;
   &:focus {
      outline: none;
      border: none;   
   }
`;

const Label = Styled.label`
   position:absolute;
   right:0;
   top:50%;
   // display:flex;
   // align-items:center;
   transform:translateY(-50%);

   .fa-search{
      font-size:16px;
      width:32px;
      color:black;
   }
`;

const Form = Styled.div`
   width:100%;
   height:100%;
`;

const UnOrdered = Styled.ul`
   width:100%;
   max-height:50vh;
   overflow-y: scroll;
   overflow-x: hidden;
   background-color: white;
   position: absolute;
   top: 27px;
   border-radius: 0 0 6px 6px;
`;

const List = Styled.li`
   list-style-type:none;
   padding: 1rem 1rem;
   font-size:0.8rem;
   cursor:pointer;

   &:hover{
      background-color:#f3f3f3;
   }

   @media(min-width:768){
      font-size:1rem;
   }
`;



const Search = ({ getNameCountry, filteredCountry, test }) => {
   const [ nameCountry, setNameCountry ] = useState("");
   const [ suggestion, setSugguestions ] = useState([]);

   const onSearch = (nameCountry) => {
      getNameCountry(nameCountry);
   }

   const onChangeCountry = (evt) => {
      setNameCountry(evt.target.value);

      const value = evt.target.value;
      let newSuggestion = [];

      if(value.length > 0){
         const regex = new RegExp(`^${value}`,'i');
         newSuggestion = filteredCountry.sort().filter(v => regex.test(v));
      }
      setSugguestions(newSuggestion);
      
   }

   const destroyList = () => {
      setSugguestions([]);
   }

   const setInput = (text) => {
      setNameCountry(text);
   }

   const onListClick = (e) => {
      const nameCountry = e.target.innerText;
      destroyList();
      setInput(nameCountry);
      onSearch(nameCountry);
      test(nameCountry);
   }

   const searchimmediately = (e) => {
      if(e.keyCode == 13){
         if(e.target.value && filteredCountry.find(element => element === e.target.value)){
            onSearch(e.target.value);
         }
      }
   }

   return (
      <Container>
         <Form>
            <Label htmlFor="search"> 
               <FontAwesomeIcon icon={ faSearch } />
            </Label>
            <InputSearch 
               value={nameCountry} 
               type="text" 
               id="search" 
               placeholder="Search Country" 
               onChange={ onChangeCountry } 
               autoComplete="off"
               onKeyDown={ searchimmediately }
               />

            <UnOrdered> 
               {suggestion.length === 0 ? null : suggestion.map((item,index) =><List key={index} onClick={ onListClick }>{item}</List> ) }
               </UnOrdered>
            
         </Form>

      </Container>
   );
}

export default Search;