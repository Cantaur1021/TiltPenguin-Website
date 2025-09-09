import React from 'react';
import { CardColumn } from '../CardColumn';
import { Button } from '../Button';

const HeroSection: React.FC = () => {
  const leftCards = [
    {
      title: "FIXED A BUG WHERE AI TEAMMATES WOULD START CHANTING THE PLAYERS NAME IN UNISON [NOT FIXED]"
    },
    {
      title: "V 0.5.3",
      subtitle: "NERFED THE PENGUINS, REMOVED THE ABILITY FOR THEM TO UNIONIZE, COMPENSATED WITH BREADCRUMBS"
    },
    {
      title: "DEVLOG 382",
      subtitle: "IMPLEMENTED A DYNAMIC WEATHER FEATURE. UNFORTUNATELY ITS RAINING BUGS RIGHT NOW."
    },
    {
      title: "DEVLOG 576",
      subtitle: "DESIGNED AND DEVELOPED A REALISTIC BURNOUT SIMULATOR (ALREADY WORKING AS INTENDED)"
    }
  ];

  const rightCards = [
    {
      title: '"I ASKED THE DEVS FOR MULTIPLAYER. THEY SAID: \'LIFE IS MULTIPLAYER. FIGURE IT OUT.\'"'
    },
    {
      title: "QA TESTER",
      subtitle: '"FOUND 78 BUGS IN ONE HOUR. REPORTED THEM. GOT PROMOTED TO \'LEAD ENTOMOLOGIST.\'"'
    },
    {
      title: "PENGUIN QUOTES",
      subtitle: "[LOOSELY TRANSLATED]",
      content: '"WE DIDN\'T ASK TO BE HERE. BUT HERE WE ARE. TILTING."'
    },
    {
      title: "CRITICS",
      subtitle: '"...THIS GAME DOESN\'T WASTE YOUR TIME. IT STEALS IT, AGGRESSIVELY...."'
    }
  ];

  return (
    <div className="hero-container">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@400;600&display=swap');
        
        :root {
          --color-mint: #c2eee1;
          --color-light: #fefaef;
          --color-yellow: #ffc700;
          --color-black: #000000;
        }
      `}</style>

      <style jsx>{`
        .hero-container {
          position: relative;
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(to bottom, var(--color-mint) 25%, var(--color-light) 100%);
          overflow: hidden;
          font-family: 'Poppins', sans-serif;
        }

        .grid-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(0deg, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .content-wrapper {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          z-index: 1;
        }

        .main-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 15vw, 10rem);
          letter-spacing: 0.05em;
          margin: 0;
          color: var(--color-yellow);
          text-shadow: 
  4px 4px 0 var(--color-black),
  5px 5px 0 var(--color-black),
  6px 6px 0 var(--color-black);


          padding: 1rem 2rem;
          text-align: center;
          line-height: 0.9;
        }

        .subtitle-container {
          text-align: center;
          margin: 2rem 0 3rem 0;
          max-width: 600px;
        }

        .subtitle {
          font-size: 1rem;
          line-height: 1.5;
          margin: 0.25rem 0;
          color: var(--color-black);
        }

        .emoji {
          font-size: 1.2rem;
        }

        .buttons-container {
          display: flex;
          gap: 2rem;
          margin-top: 2rem;
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: clamp(3rem, 12vw, 6rem);
          }
          
          .buttons-container {
            flex-direction: column;
            gap: 1rem;
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>

      <div className="grid-background"></div>

      <CardColumn cards={leftCards} position="left" />

      <div className="content-wrapper">
        <h1 className="main-title">TILTPENGUIN</h1>
        <div className="subtitle-container">
          <p className="subtitle">A scrappy solo studio powered by caffeine and delusion.</p>
          <p className="subtitle">
            Everything here is open source and free, so I can break things and you can fix them <span className="emoji">😊</span>
          </p>
        </div>
        <div className="buttons-container">
          <Button>FOLLOW THE JOURNEY</Button>
          <Button variant="secondary">VIEW SOURCE</Button>
        </div>
      </div>

      <CardColumn cards={rightCards} position="right" />
    </div>
  );
};

export default HeroSection;
