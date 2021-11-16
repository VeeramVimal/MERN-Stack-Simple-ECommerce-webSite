
import './App.css';
import Main from './Components/Main/Main';
import Header from './Components/Header/Header';
import ReactDOM from "react-dom";
import {  BrowserRouter} from "react-router-dom"


function App() {
  return (
    <BrowserRouter>

      <Header />
      <Main />
    </BrowserRouter>
  );
}
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement)
export default App;
