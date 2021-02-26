import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function Articles() {
    
    useEffect(() => {
        fetchArticles();
    },[])

    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
 
        const data = await fetch('https://127.0.0.1:8000/api/article/');
        const articles = await data.json();
        console.log(articles)
        setArticles(articles)
    }
    
  return (
    <div className="container-articles">
        <h1 className="h1-green-centered-uppercase"> Boutique </h1>
        <div className="container-all-animals">
        {articles.map((article) => (
        <div className="container-one-animal">
            <figure>
                <img src={article.image} alt="description" />
            </figure>
            
            <h2 className="h2-name-article-green"> {article.name} </h2> 
            
            <Link to={`/articles/${article.id}`}>
            <button className="blue-small-btn"> Voir </button>
            </Link>

        </div>
        ))}        
        </div>
    </div>
  );
}

export default Articles;
