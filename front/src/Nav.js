import React from 'react'; 
import logo from './img/logo-noir.png';
import shoppingcart from './img/shopping_cart-white-18dp.svg'
import { Link } from 'react-router-dom';


const Nav = () => {
return(
    <div>
        <nav>
        <Link to={`/`}> 
            <img src={logo} className="logo" alt="logo de l'assocation : une baleine en trait blanc sur un fonf bleu clair"/>
        </Link>

        <Link to={`/cart`}> 
            <img src={shoppingcart} className="shopping-cart" alt="icone en forme de chariot"/>
        </Link>
            <h3>menu</h3>
        </nav>
    </div>
)
}

export default Nav; 