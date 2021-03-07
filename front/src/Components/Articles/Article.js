import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Counter from './Counter'; 

function Article({ match }) {    
    useEffect(() => {
        fetchArticle();
    })

    const [article, setArticle] = useState([]);

    const fetchArticle = async () => {
        const fetchArticle = await fetch(`https://127.0.0.1:8000/api/article/${match.params.id}`);
        const animal = await fetchArticle.json();
        setArticle(animal);
        console.log(animal);
    }
    

    const deleteHandler = ({ match })  => {

      fetch(`https://127.0.0.1:8000/api/article/${match.params.id}`, { method: 'DELETE' })
          .then(() => this.setState({ status: 'Delete successful' }));
}

  return (
    <div className="container-one-article">
        
            <h2 className="h2-name-article-green"> {article.name} </h2>    
            <img className="img-article-presentation" src={article.image} alt="description"/>
        
        <div className="presentation-block article-presentation-block">
          <h3 className="h3-price-article"> {article.price} € </h3>
          <p className="paragraph-description-white-left-margin"> {article.description} </p>
        </div>
        <Counter />

        <Link to={`/update/articles/${article.id}`}>
          <button className="blue-small-btn"> Modifier </button>
        </Link>

        <button className="blue-small-btn" onClick={deleteHandler}> Supprimer </button>
       

    </div>
  );
}

export default Article;
 