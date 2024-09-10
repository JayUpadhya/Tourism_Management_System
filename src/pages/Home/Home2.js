import React from 'react'
import NavigationBar2 from '../../components/NavigationBar2'
import Footer from '../../components/Footer'
import '../../styles/Home/home.css'
import elephantImage from '../../images/Destination/elephant.png'
import dollarMark from '../../images/Destination/dollar1.png'
import secureMark from '../../images/Destination/secure.png'
import exMark from '../../images/Destination/experience.png'
import kandyImage from '../../images/Destination/kandy.jpg'
import mirissaImage from '../../images/Destination/mirissa.jpg'
import sigiriyaImage from '../../images/Destination/sigiriya.jpg'
import ellaImage from '../../images/Destination/ella.jpg'
import SearchBar from '../../components/SearchBar'
import Package01 from '../../components/Destination/Package01'


export default function Home() {
  return (
    <div className='all'>
        <div className='cover'>
          <div className='navBar'>
            <NavigationBar2 />
          </div>

          <div className='content1'>
            <img src={elephantImage} width='200px' height='100%' className='ele-img'></img>
            <h1 className='srilanka'>SRI LANKA</h1>
            <h4 className='title'>Book your dream vacation today</h4>
            <SearchBar/>
          </div>
        </div>

        <div className='why'>
          <h2 className='why-title'>WHY CHOOSE US?</h2>
          <div className='items'>
            <div className='item'>
              <img src={dollarMark} width='35px' height='35px' className='item-img'></img>
              <p className='item-title'>Competitive Prices</p>
              <p className='item-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div className='item'>
              <img src={secureMark} width='35px' height='35px' className='item-img'></img>
              <p className='item-title'>Secure Booking</p>
              <p className='item-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div className='item'>
              <img src={exMark} width='35px' height='35px' className='item-img'></img>
              <p className='item-title'>Seamless Experience</p>
              <p className='item-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
          </div>

        </div>

        <div className='explore'>
          <h1 className='ex-srilanka'>EXPLORE SRI LANKA</h1>

          <div className='ex-container'>
            <div className='ex-left'>
              <p className='ex-description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <button className='ex-btn'>See All</button>
            </div>
            <div className='ex-right'>
              <div className='ex-item'>
                <img src={kandyImage} width='170px' height='200px' className='ex-img'></img>
                <p className='ex-item-name'>Kandy</p>
              </div>
              <div className='ex-item'>
                <img src={mirissaImage} width='170px' height='200px' className='ex-img'></img>
                <p className='ex-item-name'>Mirissa</p>
              </div>
              <div className='ex-item'>
                <img src={sigiriyaImage} width='170px' height='200px' className='ex-img'></img>
                <p className='ex-item-name'>Sigiriya</p>
              </div>
              <div className='ex-item'>
                <img src={ellaImage} width='170px' height='200px' className='ex-img'></img>
                <p className='ex-item-name'>Ella</p>
              </div>
              
            </div>

          </div>

        </div>

        
          <h1 className='pcks-title'>Popular Packages</h1>

          <div className='pcks'>
            <Package01
              destination="Kandy"
              describe="A tour to explore the main attractions of kandy"
            >
                <img src={kandyImage}></img>
            </Package01>

            <Package01
              destination="Sigiriya"
              describe="Ancient rock fortress, UNESCO site, Sri Lanka's pride."
            >
                <img src={sigiriyaImage}></img>
            </Package01>

            <Package01
              destination="Ella"
              describe="Scenic hill station, waterfalls, hiking trails, tea plantations."
            >
                <img src={ellaImage}></img>
            </Package01>

            <Package01
              destination="Mirissa"
              describe="Pristine beaches, surfing, whale watching."
            >
                <img src={mirissaImage}></img>
            </Package01>

          </div>
        

        <div className='footer'>
          <Footer/>
        </div>
    </div>
  )
}
