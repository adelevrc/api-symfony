import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function Animals() {
    
    useEffect(() => {
        fetchAnimals();
    },[])

    const [animals, setAnimals] = useState([]);

    const fetchAnimals = async () => {
 
        const data = await fetch('https://127.0.0.1:8000/api/animal/');
        const animals = await data.json();
        console.log(animals)
        setAnimals(animals)
        // console.log(items[0].title)
    }

    // const showItems =  items.map((item) => <p> {items.name} </p>)
    
  return (
    <div>
        <h1> Nos rescapés </h1>
        <div className="container-all-animals">
        {animals.map((animal) => (
        <div className="container-one-animal">
            <figure>
                <img src={animal.photo} alt="description" />
            </figure>
            
            <h1 className="h1-animal-blue"> {animal.name} </h1> 
        
            <Link to={`/animals/${animal.id}`}>
            <button> Voir </button>
            </Link>
        </div>
        ))}        
        </div>
    </div>
  );
}

export default Animals;
