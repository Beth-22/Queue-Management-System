import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <Router> {/* ✅ Single Router wrapping the whole app */}
      <Navbar />
      <div className="ml-64 p-6">
        <AppRouter />
      </div>
    </Router>
  );
};

export default App;
