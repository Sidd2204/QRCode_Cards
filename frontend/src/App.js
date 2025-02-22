import "./App.css";
import GenerateQRCode from "./components/generateQRCode";
import Profile from "./components/profile";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ProfileV2 } from "./components/profileV2";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route exact path="/profile/:username" element={<Profile />}></Route>
          <Route
            exact
            path="/profile2/:username"
            element={<ProfileV2 />}
          ></Route>
          <Route exact path="/" element={<GenerateQRCode />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
