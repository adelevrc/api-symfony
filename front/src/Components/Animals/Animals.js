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
    }

    
  return (
    <div className="container-animals">
        <h1 className="h1-blue-centered-uppercase"> Nos rescapés </h1>
        <div className="container-all-animals">
        {animals.map((animal) => (
        <div className="container-one-animal">
            <figure>
                <img src={animal.photo} alt="description" />
            </figure>
            
            <h2 className="h2-name-animal-blue"> {animal.name} </h2> 
            
            <Link to={`/animals/${animal.id}`}>
            <button className="green-small-btn"> Voir </button>
            </Link>

        </div>
        ))}        
        </div>
    </div>
  );
}

export default Animals;
