import DashBoard from '../components/DashBoard/DashBoard.jsx';

export default function DashBoard1() {
    const title = "Where Are the Worst Violation Hotspots?"
    const visualizations = [
        {
            "subtitle": "Quarter 1 (Jan-Mar 2025)",
            "text": "1. Harlem 2. South Bronx 3. Upper East Side 4. Jamaica Center 5. Flatbush",
            "htmlFile": "q1_map.html"
        },
        {
            "subtitle": "Quarter 2 (Apr-Jun 2025)",
            "text": "Staten Island North Shore, Howard Beach, Lower Manhattan, and SoHo had a slight increase in violations while there was a slight decrease in Flushing. ",
            "htmlFile": "q2_map.html"
        },
        {
            "subtitle": "Quarter 3 (Jul-Sept 2025)",
            "text": "There was a slight increase in Williamsburg and a slight decrease in Elhmurst",
            "htmlFile": "q3_map.html"
        },
        {
            "subtitle": "Quarter 4 (Oct-Dec 2025)",
            "text": "Staten Island North Shore and Astoria had a slight increase in violations while Bushwick had a slight decrease.",
            "htmlFile": "q4_map.html"
        }
    ];

    return <DashBoard title={title} visualizations={visualizations} />;
}