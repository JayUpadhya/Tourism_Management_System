import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Destination/attraction02.css';
import NavigationBar3 from '../../components/NavigationBar3';
import Footer from '../../components/Footer';
import starImage from '../../images/Destination/BlackStar.png';
import mapImage from '../../images/Destination/map.png';
import sigiriyaImage from '../../images/Destination/sigiriya.jpg'

export default function Attraction02() {
    const [destination, setDestination] = useState(null);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/destination/1'); // Fetching destination with id 1
                setDestination(response.data.response);
            } catch (error) {
                console.error('Error fetching destination:', error);
            }
        };

        fetchDestination();
    }, []);

    return (
        <div className='attraction2-container'>
            <div className='attraction2-navBar'>
                <NavigationBar3 />
            </div>
            <div className='attraction2-content'>
                {destination && (
                    <>
                        <div className='attraction2-top'>
                            <div className='attraction2-destination'>
                                <h1>{destination.title}</h1>
                            </div>
                            <div className='attraction2-rates'>
                                <img src={starImage} alt='Star' />
                                <p>4.89 - 55 reviews</p>
                            </div>
                            <div className='attraction2-imgs'>
                                <img src={sigiriyaImage} alt='Destination' />
                            </div>
                        </div>
                        <div className='attraction2-middle'>
                            <p>{destination.description}</p>
                        </div>
                        <div className='attraction2-below'>
                            <h1>Where you'll be</h1>
                            <a href={destination.url} target='_blank'>
                                <img src={mapImage} alt='Map' />
                            </a>
                        </div>
                    </>
                )}
            </div>
            <div className='attraction2-footer'>
                <Footer />
            </div>
        </div>
    );
}
