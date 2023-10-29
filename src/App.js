import React from 'react'
import Main from './Component/Layout/Main/Main.jsx'
import StarProduct from './Component/Layout/StarProduct/StarProduct.jsx'
import './Utility/font/font.css';
import Webfront from 'webfontloader';
import About from './Component/Layout/About/About.jsx';
import Growing from './Component/Layout/Growing/Growing.jsx';
import Footer from './Component/Layout/Footer/Footer.jsx';

function App() {
  React.useEffect(() => {

    Webfront.load({
      custom: {
        families: ['Estedad'],
        urls: ['./utility/Font/font.css'],
      },
      google: {
        families: ['Gothic A1:100,200,300,400,500,600,700,800,900','Almarai: 300, 400, 700, 800'],
      },
    });
  }, [])
  return (
    <div className='.App'>
      <Main />
      <About />
      <StarProduct />
      <Growing/>
      <Footer /> 
    </div>
  )
}

export default App