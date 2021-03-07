import React from 'react'; 
import axios from 'axios';


export default class UpdateArticle extends React.Component {


    state = {
      item: {
        name: '',
        category: '',
        description: '',
        image: '', 
        price: '',
        inStock: true, 
      }
    }

    componentDidMount = () => {
        console.log('coucou axios get')
        axios.get(`https://127.0.0.1:8000/api/article/${this.props.match.params.id}`)
          .then(res => {
            this.setState({item: res.data});
          })
          .catch(err => console.log(err))
      }

      handleChange = e => {
          console.log("coucou handle change")
        e.persist();
        this.setState(article => ({
          item: { ...article.item,  
            [e.target.name]: e.target.value,  }, 
        })
        )
        console.log(this.setState); 
      }

      handleSubmit = event => {
          console.log('hey handleSumbit !'); 
          let data = this.state.item
          delete data['id']
          console.log('hey handleSumbit 2 !'); 
        axios.put(`https://127.0.0.1:8000/api/article/${this.props.match.params.id}`, data)
        .then(res => {
          console.log(res); 
          console.log("DONE");
        })
        .catch(err => console.log(err));
      }


      render() {
          return(
          
            <form onSubmit={this.handleSubmit}>
                <fieldset className="bloc-animal-form-label-input">
                <label>
                    <p className="label-form">Nom du produit</p>
                    <input id="name" type="text" name="name" value={this.state.item.name} onChange={this.handleChange}/>
                </label>
                </fieldset>

                <fieldset className="bloc-animal-form-label-input">
                <label>
                <p className="label-form"> Catégorie </p>
                <textarea id="category" name="category" value={this.state.item.category} onChange={this.handleChange}/>
                </label>
                </fieldset>

                <fieldset className="bloc-animal-form-label-input">
                <label>
                <p className="label-form">Description</p>
                <input id="description" name="description" value={this.state.item.description} onChange={this.handleChange} step="1"/>
                </label>
                </fieldset>

                <fieldset className="bloc-animal-form-label-input"> 
                <label>
                <p className="label-form">Photo</p>
                <textarea id="image" name="image" value={this.state.item.image} onChange={this.handleChange} step="1"/>
                </label>
                </fieldset>

                <fieldset className="bloc-animal-form-label-input"> 
                <label>
                <p className="label-form">Prix</p>
                <textarea id="price" name="price" value={this.state.item.price} onChange={this.handleChange} step="1"/>
                </label>
                </fieldset>
                
                <fieldset className="bloc-animal-form-label-input">
                <label className="bloc-animal-checkbox-label-input">
                    <p className="question-checkbox-form">Est ce que cet article est en stock ?  </p>
                    <input id="checkbox-is-dead" type="checkbox" name="isDead" value={this.state.item.name} onChange={this.handleChange} />
                </label>
                </fieldset>
                <div className="div-btn-add-animal">
                <button onClick={this.handleSubmit}className="green-large-btn add-animal-btn" type="submit">Ajouter l'animal</button>
                </div>      
        </form>

          )
      }
      }