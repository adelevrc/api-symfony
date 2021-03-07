import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
// import {DeleteAnimal} from '../Animals/DeleteAnimal'; 

import SupportUs from '../../SupportUs'; 

function AnimalDetail({ match }) {    
    useEffect(() => {
        fetchAnimal();
    })

    const [animal, setAnimal] = useState([]);

    const fetchAnimal = async () => {
        const fetchAnimal = await fetch(`https://127.0.0.1:8000/api/animal/${match.params.id}`);
        const animal = await fetchAnimal.json();
        setAnimal(animal);
        console.log(animal);
    }

    const deleteHandler = async () => {
      await fetch(`https://127.0.0.1:8000/api/animal/${match.params.id}`, { method: 'DELETE' })
      .then(() => this.setState({ status: 'Delete successful' }));
    }
    
  return (
    <div className="container-one-animal">

      
        <h2 className="h2-name-animal-blue h2-animal-bigger"> {animal.name} </h2>    
        <img src={animal.photo} alt="description"/>
  

        <div className="presentation-block">
          <h3 className="h3-blue-bold"> Présentation </h3>
          <p className="paragraph-description-white"> {animal.description} </p>
        </div>

        <Link to={`/update/animal/${animal.id}`}>
          <button className="blue-small-btn"> Modifier </button>
        </Link>

          <button className="blue-small-btn" onClick={deleteHandler}> Supprimer </button>

        <SupportUs />
    </div>
  );
}

export default AnimalDetail;
 