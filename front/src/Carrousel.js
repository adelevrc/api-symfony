import React, {Component} from 'react';
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './App.css';
import { Link } from 'react-router-dom';


export default class Carrousel extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      galleryItems: [],
    };
}
 getData (){
    axios.get(`https://127.0.0.1:8000/api/animal/`, {})
        .then(res => {
                const data = res.data
              const img = data.map(m => 
                <img src={m.photo} alt=""/>
              )
              this.setState({
                galleryItems: img
              })
            }).catch((error) => {
                console.log(error)
            })
  }
  responsive = {
    0: { items: 2 },
    1024: { items: 3 },
  }
  componentDidMount() {
   this.getData()
}
  
  render() {
    return (
      <div>
        <AliceCarousel
        items={this.state.galleryItems}
        responsive={this.responsive}
        autoPlayInterval={2000}
        autoPlayDirection="rtl"
        autoPlay={false}
        fadeOutAnimation={true}
        mouseTrackingEnabled={true}
        disableAutoPlayOnAction={true}
      />
      <div className="div-see-animals-button">
      <Link to={`/animals`}> 
        <button className="link-to-btn green-large-btn">Voir tous les animaux</button>
        </Link>
      </div>
      </div>
    )
  }
}
