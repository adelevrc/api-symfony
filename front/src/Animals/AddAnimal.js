import React, {useState} from 'react'; 
import axios from 'axios';

export class AddAnimal extends React.Component {

      state = {
        name: '',
        care:'',
        description:'', 
        photo:'', 
        isChecked: true,
      };
   
    handleChange = (e) => {
      
      this.setState({ 
        name: e.target.value,
        care: e.target.value,
        description: e.target.value,
        photo: e.target.value,
        isDead: e.target.value
       });
       console.log(e.target.value); 

    }
  
    handleSubmit = (e) => {
      e.preventDefault();

      const myForm = {
        name: this.state.name, 
        care: this.state.care, 
        description: this.state.description, 
        photo: this.state.photo,
        isDead: this.state.isChecked
      };  
      console.log(myForm); 
      console.log(JSON.stringify(myForm))

      axios.post('https://127.0.0.1:8000/api/animal', myForm )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

    
    toggleChange = () => {
        this.setState({
          isChecked: !this.state.isChecked,
        });
      }
  
    render() {
      return (
        <div>

          <h1 className="h1-white-centered-uppercase"> 
            Ajouter un animal 
          </h1>
          
        <form onSubmit={this.handleSubmit}>
          <div className="bloc-animal-form-label-input">
            <label htmlFor="name">Nom</label>
            <input id="name" name="name" type="text" placeholder="Entrez le nom de l'animal" onChange={this.handleChange} />
          </div>

          <div className="bloc-animal-form-label-input">
            <label htmlFor="dateOfBirth">Date de naissance</label>
            <input id="dateOfBirth" name="dateOfBirth" type="text" placeholder="JJ/MM/AA" onChange={this.handleChange} />
          </div>

          <div className="bloc-animal-form-label-input">
            <label htmlFor="photo">Photo</label>
            <input id="photo" name="photo" type="text" placeholder="Entrez le lien de la photo" onChange={this.handleChange} />
          </div>

          <div className="bloc-animal-form-label-input">
            <label htmlFor="description">Description</label>
            <input id="description" name="description" type="text" placeholder="Entrez la description de l'animal" onChange={this.handleChange} />
          </div>

          <div className="bloc-animal-form-label-input">
            <label htmlFor="care">Soins à apporter / Remarques </label>
            <input id="care" name="care" type="text" placeholder="Entrez les soins à apporter à l'animal" onChange={this.handleChange} />
          </div>

          <div className="bloc-animal-checkbox-label-input">
            <label>
                <input id="checkbox-is-dead" type="checkbox" name="isDead"
                defaultChecked={this.state.isChecked}
                onChange={this.toggleChange}
                />
                Cochez si l'animal est décédé
            </label>
          </div>
          <div className="div-btn-add-animal">
            <button className="green-large-btn add-animal-btn">Ajouter un animal</button>
          </div>
        </form>

        </div>
      );
    }
  }

  export default AddAnimal;