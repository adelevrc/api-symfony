import React, {useState, useEffect} from 'react';

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
    
  return (
    <div className="container-one-article">
        
            <h2 className="h2-name-article-green"> {article.name} </h2>    
            <img className="img-article-presentation" src={article.image} alt="description"/>
        
        <div className="presentation-block article-presentation-block">
          <h3 className="h3-price-article"> {article.price} € </h3>
          <p className="paragraph-description-white-left-margin"> {article.description} </p>
        </div>

    </div>
  );
}

export default Article;
 