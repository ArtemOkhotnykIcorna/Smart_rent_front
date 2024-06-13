import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import MainPage from "./Pages/MainPage/MainPage";



function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path='/'>
                  <Route index element = {<MainPage/>}></Route>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
