import { useState } from 'react';
import './App.css';
import mainImg from '../assests/IMG_4829.PNG';

// Pre-fill target data with 5 egg items based on percentages
// These specify the top-left percentage (x,y) and size dimension for a square hotspot.
// The coordinates have been adjusted from center points to top-left coordinates.
// Pre-fill target data with 6 egg items based on provided percentages
const INITIAL_TARGETS = [
  { id: 1, x: 54.8, y: 58.3, size: 8 },
  { id: 2, x: 55.5, y: 42.8, size: 8 },
  { id: 3, x: 57.7, y: 61.8, size: 8 },
  { id: 4, x: 70.1, y: 69.8, size: 8 },
  { id: 5, x: 17.9, y: 66.2, size: 8 },
  { id: 6, x: 87.8, y: 27.6, size: 8 }
];

function App() {
  const [foundItems, setFoundItems] = useState([]);
  const [targets] = useState(INITIAL_TARGETS);

  const handleHotspotClick = (id) => {
    if (!foundItems.includes(id)) {
      setFoundItems((prev) => [...prev, id]);
    }
  };

  const isWon = foundItems.length === targets.length;

  return (
    <div className="game-container">
      {/* LEFT COLUMN: Main Game Area */}
      <div className="main-area">
        <div className="image-wrapper">
          <img 
            src={mainImg} 
            alt="Main Hidden Object Scene" 
            className="main-image"
          />
          
          {/* Render hot-spots over the image */}
          {targets.map((target) => {
            const isFound = foundItems.includes(target.id);
            return (
              <div
                key={target.id}
                className={`hotspot ${isFound ? 'found' : ''}`}
                style={{
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                  width: `${target.size}%`,
                  height: `${target.size}%`,
                }}
                onClick={() => handleHotspotClick(target.id)}
              />
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: Side Panel */}
      <div className="side-panel">
        <div className="panel-content">
          <h1 className="panel-title">HIDDEN OBJECTS</h1>
          <p className="panel-subtitle">Find the objects below in the main scene</p>
          
          <div className="clues-grid">
            {targets.map((target) => {
              const isFound = foundItems.includes(target.id);
              
              // CSS Math for perfectly centering the target region in the thumbnail
              const zoom = 6; // Relates to backgroundSize: '600%'
              const getBgPos = (pos, size) => {
                // The center of the target bounding box
                const centerPos = pos + (size / 2);
                // The CSS background-position formula to align mapping point
                const mappedPos = (zoom * centerPos - 50) / (zoom - 1);
                return `${mappedPos}%`;
              };

              return (
                <div key={`thumb-${target.id}`} className={`thumbnail-container ${isFound ? 'found' : ''}`}>
                  <div
                    className="thumbnail-crop"
                    style={{
                      backgroundImage: `url(${mainImg})`,
                      backgroundSize: `${zoom * 100}%`,
                      backgroundPosition: `${getBgPos(target.x, target.size)} ${getBgPos(target.y, target.size)}`
                    }}
                  />
                  {isFound && <div className="thumbnail-overlay"><span className="checkmark">✓</span></div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* WIN STATE: Full Screen Overlay */}
      {isWon && (
        <div className="fullscreen-win">
          <div className="win-content">
            <h1 className="win-title-large">Happy Easter!</h1>
            <p>Congratulations, you found all the eggs!</p>
            <button className="replay-btn-large" onClick={() => setFoundItems([])}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
