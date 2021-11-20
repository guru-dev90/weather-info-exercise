import React from "react";

import "./App.css";
import PlacePicker from "./components/PlacePicker";
import PlaceList from "./components/PlaceList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather info</h1>
      </header>
      <section className="App-place-picker">
        <PlacePicker />
      </section>
      <section className="App-place-list">
        <PlaceList />
      </section>
    </div>
  );
}

export default App;
