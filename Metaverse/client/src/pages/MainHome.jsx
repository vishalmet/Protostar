

import Community from '../components/Community'
import Features from '../components/Features'
import Footer from '../components/Footer'
import GameLoop from '../components/GameLoop'
import Hero from '../components/Hero'
import MiniGames from '../components/MiniGames'
import Nav from '../components/Nav'
import NftMarket from '../components/NftMarket'
import SofiaAi from '../components/SofiaAi'
import "./home.css"

function MainHome() {


  return (
    <>
    
     <Nav/>
     <Hero/>
     <Features/>
     <GameLoop/>
     <MiniGames/>
     <NftMarket/>
     <SofiaAi/>
     <Community/>
     <Footer/>
    
    </>
  )
}

export default MainHome
