import './VisualizationCard.css';

export default function VisualizationCard({ chart, htmlFile }) {
  
    // If it's an HTML map → render iframe
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
  
    // If it's a JSX component → render it directly
    if (chart) {
      return (
        <div className="viz-card">
          {chart}
        </div>
      );
    }
  
    return <div className="viz-card">No visualization provided.</div>;
  }
  