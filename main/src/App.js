import './App.css';
import TitlePage from "./pages/TitlePage/TitlePage.jsx";
import Dashboard1 from "./dashboards/DashBoard1.jsx";


function App() {
  return (
    <div className="App">
      <div className="scroll-wrapper">
        <section className="snap-section"><TitlePage /></section>
        <section className="snap-section"><Dashboard1 /></section>
      </div>
    </div>
  );
}

export default App;
