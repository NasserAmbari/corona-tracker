import React, {useState, useEffect} from 'react'

const Search = () => {
    let items = [
        'David',
        'Ahmad',
        'Nasser',
        'Ambari',
        'Ayu',
        'Domba',
        'Daging'
    ];

    const [suggestion, setSugguestions] = useState([]);

    const onTextChange = (e) => {
        const value = e.target.value;
        let newSuggestion = [];

        console.log(value);

        if(value.length > 0){
            const regex = new RegExp(`^${value}`,'i');
            newSuggestion = items.sort().filter(v => regex.test(v));
        }
        setSugguestions(newSuggestion);
    }

    const renderSuggestion = () =>{ 
        const toRender = suggestion;
        console.log(toRender);
        if(toRender.length === 0){
            return null;
        }
        return(
            <ul>
                { toRender.map((item,index) => <li key={index}>{item}</li>) }
            </ul>
        )
    }

    return(
        <div>
            <input onChange={onTextChange} type="text"/>
            {renderSuggestion()}
        </div>
    );
}

export default Search;