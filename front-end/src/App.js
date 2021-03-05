import React, { useContext } from "react";
import './App.css';
import Route from "./components/Navbar/Routers";

// import {GlobalStateProvider} from './context/globalContext'
import {GlobalStateProvider} from './context/GlobalContext'


function App() {
  return (
    <div>
      <GlobalStateProvider>
      <Route/>
      </GlobalStateProvider>
    </div>
  );
}

export default App;

