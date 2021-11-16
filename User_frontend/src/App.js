import './App.css';
import ReactDOM from "react-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import Header from './Components/Header';
import Main from './Components/Main/Main'

const App = () => (
  <BrowserRouter>
        <Header/>
        <Main/>
  </BrowserRouter>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement)
export default App;

