import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Settings } from "./pages/Settings";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/" element={<div>bezpeka-veritas</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
