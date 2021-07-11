import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Container from "./pages/Container/Container";
import Weather from "./pages/Weather/Weather";
import Air from "./pages/Air/Air";
import Footer from "./components/Footer";
import AirCity from "./pages/Air/AirCity";
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Container} />
        <Route path="/weather" exact component={Weather} />
        <Route path="/aqi" exact component={Air} />
        <Route path="/aqi-by-city" exact component={AirCity} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
