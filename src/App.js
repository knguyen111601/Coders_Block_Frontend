import './App.scss';
import SideBar from './components/SideBar';
import Main from './pages/Main';
import { createContext, useState, useEffect} from 'react';
export const GlobalCtx = createContext(null)



function App() {

  const [gState, setGstate] = useState({
    url: "https://blog-capstone-backend.herokuapp.com/",
    token: null,
    username: null,
    pfp: null, 
    user_id: null
  })


  // Seeing is the user is already logged in
  useEffect(()=>{
    const token = JSON.parse(window.localStorage.getItem("token"))
    console.log(token)
    if (token){
      setGstate({...gState, token: token.token, username:token.user.username, pfp: token.user.pfp, user_id: token.user.id})
    }
  }, [])



  return (
    <GlobalCtx.Provider value={{gState, setGstate}}>
    <div className="App">
      <SideBar />
      <div className="mainSection">
      <Main />
      </div>
    </div>
    </GlobalCtx.Provider>
  );
}

export default App;
