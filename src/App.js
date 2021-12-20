import logo from './logo.svg';
import './App.scss';
import TextEditor from './components/TextEditor';
import SideBar from './components/SideBar';
import Main from './pages/Main';

function App() {
  return (
    <div className="App">
      <SideBar />
      <div className="mainSection">
      <Main />
      </div>
    </div>
  );
}

export default App;
