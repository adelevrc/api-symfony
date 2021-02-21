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
      <h1>How About Them Apples</h1>
      {submitting &&
        <div> You are submitting the following:
        <ul>
          {Object.entries(formData).map(([name, value]) => (
            <li key={name}><strong>{name}</strong>:{value.toString()}</li>
          ))}
        </ul></div>
      }
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name</p>
            <input name="name" onChange={handleChange}/>
          </label>
        </fieldset>
        <fieldset>
         <label>
           <p>Apples</p>
           <input name="care" onChange={handleChange}/>
         </label>
         <label>
           <p>Count</p>
           <input name="photo" onChange={handleChange} step="1"/>
         </label>
         <label>
           <p>Count</p>
           <input name="description" onChange={handleChange} step="1"/>
         </label>
         <label>
           <p>Gift Wrap</p>
           <input type="checkbox" name="isDead" onChange={handleChange} />
         </label>
       </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form;