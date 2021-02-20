import React from 'react'; 
import shark from './img/shark.svg'; 
import promotion from './img/promotion.svg'; 
import planetearth from './img/planet-earth.svg'; 
import lifesaver from './img/life-saver.svg'; 
import SupportUs from './SupportUs'
import AliceCarousel from './Carrousel'; 

const LandingPage = () => {
    return (
        <div>
            <h1 className="h1-blue-right-uppercase">
                titre 
            </h1>

            <h2 className="h2-white-right-uppercase">
                sous-titre
            </h2>

            <p className="paragraph-description-white paragraph-landing-page">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
            </p>

            <div className="grid-items-actions">
                <div className='div-action'>
                    <img src={planetearth} className="icone-item"/>
                    <h3 className="h3-blue-bold" > Préservation </h3>
                    <p className="paragraph-description-white-centered">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.                    
                    </p>
                </div>

                <div className='div-action'>
                    <img src={lifesaver} className="icone-item"/>
                    <h3 className="h3-blue-bold"> Réhabilitation </h3>
                    <p className="paragraph-description-white-centered">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.                    
                    </p>
                </div>

                <div className='div-action'>
                    <img src={promotion} className="icone-item"/>
                    <h3 className="h3-blue-bold"> Militantisme </h3>
                    <p className="paragraph-description-white-centered">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.                    
                    </p>
                </div>

                <div className='div-action'>
                    <img src={shark} className="icone-item"/>
                    <h3 className="h3-blue-bold"> Sensibilisation </h3>
                    <p className="paragraph-description-white-centered">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.                    
                    </p>
                </div>

            </div>

            <div className="carousel">
                <AliceCarousel />
            </div>
            <SupportUs />
        </div>
    )
}

export default LandingPage;