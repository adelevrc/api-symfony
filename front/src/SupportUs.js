import React from 'react'; 
import { Link } from 'react-router-dom';


const SupportUs = () => {
    return (
        <div className="support-us-div">
            <h3 className="h3-blue-bold h3-centered"> Nous soutenir </h3>
            <p className="paragraph-description-white-left">
                 Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
            </p>

            <div className="support-us-btn-div">
                <Link to={`/donation`}>
                    <button className="link-to-btn green-small-btn">Faire un don</button>
                </Link>

                <Link to={`/shop`}>
                    <button className="link-to-btn green-small-btn">Boutique</button>
                </Link>
            </div>
        </div>
    )
}

export default SupportUs; 