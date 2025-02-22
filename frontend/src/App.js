import "./App.css";
import GenerateQRCode from "./components/generateQRCode";
import Profile from "./components/profile";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route exact path="/profile/:username" element={<Profile />}></Route>
          <Route exact path="/" element={<GenerateQRCode />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
