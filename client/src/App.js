import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './components/Home';
import PlayerControl from './components/PlayerControl';
import AdminControl from './components/Admin/AdminControl';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/home" element = {<Home/>}/>
          <Route path="/player" element = {<PlayerControl/>}/>
          <Route path="/admin" element = {<AdminControl />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

//"react-router-dom": "^6.3.0" ---> por esta razon se usa Routes and Route
// en vez de component se usa element y se agregan los < />

export default App;
