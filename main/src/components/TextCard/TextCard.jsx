import './TextCard.css';

export default function TextCard({ subtitle, text, fading }) {
    return (
        <div className={`text-card fade ${fading ? "hidden" : ""}`}>
            <h3>{ subtitle }</h3>
            <p>{ text }</p>
        </div>
    );
}