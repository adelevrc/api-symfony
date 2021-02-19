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
 
      const data = JSON.stringify(myForm);
      
      axios.post('https://127.0.0.1:8000/api/animal', {data} )
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
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Nom</label>
          <input id="name" name="name" type="text" onChange={this.handleChange} />
  
          <label htmlFor="description">Soin</label>
          <input id="description" name="description" type="text" onChange={this.handleChange} />
  
          <label htmlFor="care">description</label>
          <input id="care" name="care" type="text" onChange={this.handleChange} />

          <label htmlFor="photo">photo</label>
          <input id="photo" name="photo" type="text" onChange={this.handleChange} />

          <label>
              <input type="checkbox" name="isDead"
              defaultChecked={this.state.isChecked}
              onChange={this.toggleChange}
              />
              Check Me!
          </label>

          <button>Send data!</button>
        </form>
      );
    }
  }

  export default AddAnimal;