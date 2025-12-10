import './App.css';
import TitlePage from "./pages/TitlePage/TitlePage.jsx";
import Dashboard1 from "./dashboards/DashBoard1.jsx";
import DashBoard2 from './dashboards/DashBoard2.jsx';
import DashBoard3 from './dashboards/DashBoard3.jsx';
import DashBoard4 from './dashboards/DashBoard4.jsx';

function App() {
  return (
    <div className="App">
      <div className="scroll-wrapper">
        <section className="snap-section"><TitlePage /></section>
        <section className="snap-section"><Dashboard1 /></section>
        <section className="snap-section"><DashBoard2 /></section>
        <section className="snap-section"><DashBoard3 /></section>
        <section className="snap-section"><DashBoard4 /></section>
      </div>
    </div>
  );
}

export default App;
