import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './components/Home';
import AdminControl from './components/Admin/AdminControl';
import Market from './components/Market/Market';
import PlayerControl from "./components/Player/PlayerControl";
import AdminPlayersAndStudents from "./components/Admin/AdminPlayersAndStudents";
import PlayerResults from "./components/Player/PlayerResults/PlayerControl";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/home" element = {<Home/>}/>
          <Route path="/player" element = {<PlayerControl/>}/>
          <Route path="/playerResults" element = {<PlayerResults/>}/>
          <Route path="/adminControl" element = {<AdminControl />}/>
          <Route path="/adminPlayerAndStudents" element = {<AdminPlayersAndStudents />}/>
          <Route path="/market" element = {<Market />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

//"react-router-dom": "^6.3.0" ---> por esta razon se usa Routes and Route
// en vez de component se usa element y se agregan los < />

export default App;
