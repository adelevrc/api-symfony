import React, { useReducer, useState } from 'react';
import axios from 'axios'; 

const formReducer = (state, event) => {
 return {
   ...state,
   [event.name]: event.value 
  }
}

function Form() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 3000)

console.log(formData); 

    axios.post('https://127.0.0.1:8000/api/animal', formData)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
  }

  const handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,    });
  }


  return(
    <div className="wrapper">
      <h1 className="h1-white-centered-uppercase"> 
            Ajouter un animal 
          </h1>
      {submitting &&
        <div> Vous envoyez les données suivantes:
        <ul>
          {Object.entries(formData).map(([name, value]) => (
            <li key={name}><strong>{name}</strong>:{value.toString()}</li>
          ))}
        </ul></div>
      }
      <form onSubmit={handleSubmit}>
        <fieldset className="bloc-animal-form-label-input">
          <label>
            <p className="label-form">Nom</p>
            <input id="name" type="text" name="name" placeholder="Entrez le nom de l'animal" onChange={handleChange}/>
          </label>
        </fieldset>

        <fieldset className="bloc-animal-form-label-input">
         <label>
           <p className="label-form">Soins à apporter / remarques </p>
           <input id="care" name="care" placeholder="Entrez les soins à apporter à l'animal" onChange={handleChange}/>
          </label>
        </fieldset>

        <fieldset className="bloc-animal-form-label-input">
         <label>
           <p className="label-form">Photo</p>
           <input id="photo" name="photo" placeholder="Entrez le lien de la photo" onChange={handleChange} step="1"/>
         </label>
        </fieldset>

        <fieldset className="bloc-animal-form-label-input"> 
         <label>
           <p className="label-form">Description</p>
           <input id="description" name="description" placeholder="Entrez la description de l'animal" onChange={handleChange} step="1"/>
         </label>
         </fieldset>
        
         <fieldset className="bloc-animal-form-label-input">
          <label className="bloc-animal-checkbox-label-input">
            <p className="question-checkbox-form">Est ce que l'animal est décédé ? </p>
            <input id="checkbox-is-dead" type="checkbox" name="isDead" onChange={handleChange} />
          </label>
         </fieldset>
         <div className="div-btn-add-animal">
          <button className="green-large-btn add-animal-btn" type="submit">Submit</button>
        </div>      
      </form>
    </div>
  )
}

export default Form;