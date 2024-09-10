import React from 'react'
import '../../styles/Destination/attraction.css'
import NavigationBar3 from '../../components/NavigationBar3'
import sigiriyaImage from '../../images/Destination/sigiriya.jpg'
import kandyImage from '../../images/Destination/kandy.jpg'
import ellaImage from '../../images/Destination/ella.jpg'
import mirissaImage from '../../images/Destination/mirissa.jpg'
import Package02 from '../../components/Destination/Package02'

export default function Attraction() {
  return (
    <div className="dContainer">
        <div className='dNavBar'>

            <NavigationBar3/>

        </div>
        <div className='dContent'>

            <Package02 
                destination="Sigiriya"
                rate="4.8" 
                describe="Sigiriya, also known as Lion Rock, is a UNESCO World Heritage site located in the central Matale District of Sri Lanka. This ancient rock fortress and palace complex stands majestically atop a 200-meter high rock plateau, dominating the surrounding landscape. Sigiriya holds great historical and archaeological significance, dating back over 1,500 years."
                to="/attraction"
            >
                <img src={sigiriyaImage}></img>
            </Package02>

            <Package02 
                destination="Kandy"
                rate="4.6" 
                describe="Kandy is a picturesque city nestled in the central hills of Sri Lanka, renowned for its rich cultural heritage, lush landscapes, and spiritual significance. As the second-largest city in Sri Lanka and the capital of the Central Province, Kandy holds a special place in the hearts of both locals and visitors."
            >
                <img src={kandyImage}></img>
            </Package02>

            <Package02 
                destination="Ella"
                rate="4.9" 
                describe="Ella is a charming town nestled in the lush green hills of Sri Lanka's Central Highlands, renowned for its breathtaking natural beauty, cool climate, and laid-back atmosphere. Situated in the Badulla District, Ella has emerged as a popular destination for travelers seeking tranquility, adventure, and stunning vistas."
            >
                <img src={ellaImage}></img>
            </Package02>

            <Package02 
                destination="Mirissa"
                rate="4.5" 
                describe="Mirissa is a picturesque coastal town nestled along the southern coast of Sri Lanka, renowned for its stunning beaches, tranquil atmosphere, and abundant marine life. Situated in the Matara District, Mirissa has emerged as a popular destination for travelers seeking sun, sand, and relaxation, as well as those looking for adventure and marine experiences."
            >
                <img src={mirissaImage}></img>
            </Package02>
            
        </div>
    </div>
  )
}
