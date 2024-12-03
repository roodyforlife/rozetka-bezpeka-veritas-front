import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Settings } from "./pages/Settings";


function App() {
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/feed.xml', {
  //       headers: {
  //         'Content-Type': 'application/xml',
  //       },
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Ошибка при запросе:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData()
  // }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
