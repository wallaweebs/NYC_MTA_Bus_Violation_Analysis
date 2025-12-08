import DashBoard from '../components/DashBoard/DashBoard.jsx';

export default function DashBoard1() {
    const title = "Where Are the Worst Violation Hotspots?"
    const visualizations = [
        {
            "subtitle": "Quarter 1 (Jan-Mar 2025)",
            "text": "Bunch of text.",
            "htmlFile": "q1_map.html"
        },
        {
            "subtitle": "Quarter 2 (Apr-Jun 2025)",
            "text": "Bunch of text.",
            "htmlFile": "q2_map.html"
        },
        {
            "subtitle": "Quarter 3 (Jul-Sept 2025)",
            "text": "Bunch of text.",
            "htmlFile": "q3_map.html"
        },
        {
            "subtitle": "Quarter 4 (Oct-Dec 2025)",
            "text": "Bunch of text.",
            "htmlFile": "q4_map.html"
        }
    ];

    return <DashBoard title={title} visualizations={visualizations} />;
}