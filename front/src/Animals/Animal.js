import React, {useState, useEffect} from 'react';

function AnimalDetail({ match }) {    
    useEffect(() => {
        fetchAnimal();
    },[])

    const [animal, setAnimal] = useState([]);

    const fetchAnimal = async () => {
        const fetchAnimal = await fetch(`https://127.0.0.1:8000/api/animal/${match.params.id}`);
        const animal = await fetchAnimal.json();
        setAnimal(animal);
        console.log(animal);
    }
    
  return (
    <div>
        
        <h1> {animal.name} </h1>    
        <img src={animal.photo} alt="description"/>
        <p> {animal.description} </p>
    
    </div>
  );
}

export default AnimalDetail;
 