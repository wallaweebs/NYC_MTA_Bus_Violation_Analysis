import './ArrowButton.css';

export default function ArrowButton({ direction = "right", onClick }) {
    const src = direction === "left" 
      ? process.env.PUBLIC_URL + "/arrows/arrow-left.png"
      : process.env.PUBLIC_URL + "/arrows/arrow-right.png";
  
    return (
      <button className="arrow-btn" onClick={onClick}>
        <img src={src} alt={`${direction} arrow`} className="arrow-img" />
      </button>
    );
  }
  