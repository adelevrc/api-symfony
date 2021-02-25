import React from 'react'; 
import axios from 'axios'; 

export default class UpdateAnimal extends React.Component {

    state = {
      item: {
        name: '',
        description: '',
        care: '',
        photo: '', 
        isDead : false, 
      }
    }

    componentDidMount = () => {
        console.log('coucou axios get')
        axios.get(`https://127.0.0.1:8000/api/animal/${this.props.match.params.id}`)
          .then(res => {
            this.setState({item: res.data});
          })
          .catch(err => console.log(err))
      }

      handleChange = e => {
          console.log("coucou handle change")
        e.persist();
        // e.preventDefault(); 
        this.setState(animal => ({
          item: { ...animal.item,  
            [e.target.name]: e.target.value,  }, 
        })
        )
        console.log(this.setState); 
      }

      handleSubmit = item => {
          console.log('hey handleSumbit !'); 

        axios.put(`https://127.0.0.1:8000/api/animal/${this.props.match.params.id}`, item)
        .then(res => {
          this.setState({
              name: item.title, 
              care: item.care,
              description: item.description, 
              photo: item.photo
            });
          console.log(item); 
          console.log(res.data); 
        })
        .catch(err => console.log(err));

        JSON.stringify(item, UpdateAnimal())
      }


      render() {
          return(
          
            <form onSubmit={this.handleSubmit}>
                <fieldset className="bloc-animal-form-label-input">
                <label>
                    <p className="label-form">Nom</p>
                    <input id="name" type="text" name="name" value={this.state.item.name} onChange={this.handleChange}/>
                </label>
                </fieldset>

                <fieldset className="bloc-animal-form-label-input">
                <label>
                <p className="label-form">Soins à apporter / remarques </p>
                <textarea id="care" name="care" value={this.state.item.care} onChange={this.handleChange}/>
                </label>
                </fieldset>

                <fieldset className="bloc-animal-form-label-input">
                <label>
                <p className="label-form">Photo</p>
                <input id="photo" name="photo" value={this.state.item.photo} onChange={this.handleChange} step="1"/>
                </label>
                </fieldset>

                <fieldset className="bloc-animal-form-label-input"> 
                <label>
                <p className="label-form">Description</p>
                <textarea id="description" name="description" value={this.state.item.description} onChange={this.handleChange} step="1"/>
                </label>
                </fieldset>
                
                <fieldset className="bloc-animal-form-label-input">
                <label className="bloc-animal-checkbox-label-input">
                    <p className="question-checkbox-form">Est ce que l'animal est décédé ? </p>
                    <input id="checkbox-is-dead" type="checkbox" name="isDead" value={this.state.item.name} onChange={this.handleChange} />
                </label>
                </fieldset>
                <div className="div-btn-add-animal">
                <button onClick={() => {console.log('hey')}}className="green-large-btn add-animal-btn" type="submit">Ajouter l'animal</button>
                </div>      
        </form>

          )
      }
      }