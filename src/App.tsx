import React from "react";
import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import SearchEngine from "./components/searchEngine";
import Header from "./components/Header";
import SpeechRecognitionComponent from "./components/SpeechRecognition";

function App() {
  return (
    <PrimeReactProvider>
      <Header></Header>
      <SearchEngine></SearchEngine>
    </PrimeReactProvider>
  );
}

export default App;
