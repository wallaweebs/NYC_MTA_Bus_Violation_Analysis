import DashBoard from '../components/DashBoard/DashBoard.jsx';

export default function DashBoard5() {
    const title = "What are the major violation types per neighborhood?";
    const visualizations = [
        {
            "text": "1. Top Mobile Bus Lane Offenders: Harlem, Upper East Side\n2.Top Mobile Bus Stop Offenders: Upper West Side, Lower East Side, South Bronx \n3.Top Double Parking Offenders: South Bronx, Upper East Side, Flatbush",
            "img": "viol_types.png"
        }
    ]
    return <DashBoard title={title} visualizations={visualizations} />;
}