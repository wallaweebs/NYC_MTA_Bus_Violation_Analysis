import './DashBoard.css';
import ArrowButton from "../ArrowButton/ArrowButton.jsx";
import TextCard from "../TextCard/TextCard.jsx";
import VisualizationCard from "../VisualizationCard/VisualizationCard.jsx";
import { useState } from "react";


export default function DashBoard({ title, visualizations }) {

  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % visualizations.length);
  const prev = () => setIndex((i) => (i - 1 + visualizations.length) % visualizations.length);

  const current = visualizations[index];

  return (
    <div className="dashboard">
        <div className="left">
            <h1 className="radial-text">{title}</h1>
            <TextCard subtitle={current.subtitle} text={current.text} />
        </div>

        <div className="right">
            <div className="viz-row">
                <div className="viz-wrapper-1">
                    <div className="viz-wrapper-2">
                        <VisualizationCard chart={current.chart} htmlFile={current.htmlFile} />
                    </div>
                </div>
            </div>
            <div className="arrow-row">
            <div className="arrow-slot left-slot">
        {index !== 0 && (
            <ArrowButton direction="left" onClick={prev} />
        )}
    </div>

    <div className="arrow-slot center-slot">
        {/* nothing here, just spacing */}
    </div>

    <div className="arrow-slot right-slot">
        {index !== visualizations.length - 1 && (
            <ArrowButton direction="right" onClick={next} />
        )}
    </div>
            </div>
        </div>
    </div>
  );
}
