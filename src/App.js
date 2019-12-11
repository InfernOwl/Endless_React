import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <div className="App">
          <div className="Header">
              <Header />
          </div>
          <div className="Promo">
              <Promo />
          </div>
          <div className="HowItWorks">
              <HowItWorks />
          </div>
    </div>
  );
}

function Header() {
    return(
        <div>
            <p>Endless</p>
        </div>
    );
}

function Promo() {
    return (
        <div>
            <p> This is where the promo will go</p>
        </div>
    )
}

function HowItWorks() {
    return (
        <div>
            <p>This is where the How-It-Works Section will go</p>
        </div>
    )
}

export default App;
