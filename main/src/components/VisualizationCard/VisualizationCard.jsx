import './VisualizationCard.css';

export default function VisualizationCard({ chart, htmlFile, img }) {
  
    if (htmlFile) {
      const src = process.env.PUBLIC_URL + "/maps/" + htmlFile;
      return (
        <div className="viz-card">
          <iframe
            src={src}
            title={htmlFile}
            className="viz-iframe"
            loading="lazy"
          />
        </div>
      );
    }
  
    if (chart) {
      return (
        <div className="viz-card">
          {chart}
        </div>
      );
    }

    if (img) {
      const src = process.env.PUBLIC_URL + "/images/" + img;
      return (
        <div className="viz-card">
          <img 
            src={src} 
            alt={img} 
            className="viz-image"
          />
        </div>
      );
    }
  
    return <div className="viz-card">No visualization provided.</div>;
  }
  