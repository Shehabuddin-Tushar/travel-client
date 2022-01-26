import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import Authprovider from './hooks/Context';
import useFirebase from './hooks/Firebasehook';

function App() {
  const { user } = useFirebase();
  return (
    <div className="App">
      <Authprovider>
      <BrowserRouter>
        <Switch>
           <Route exact path="/">
               <Home></Home>
          </Route>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/registration">
            <Registration />
          </Route>
         </Switch>
        </BrowserRouter>
      </Authprovider>
    </div>
  );
}

export default App;
