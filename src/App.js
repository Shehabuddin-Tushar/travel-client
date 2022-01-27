import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import Authprovider from './hooks/Context';
import useFirebase from './hooks/Firebasehook';
import Addexperience from './Pages/Addexperience/Addexperience';
import Blogpage from './Pages/Blog/Blogpage';
import PrivateRoute from './PrivateRoute/Privateroute';
import Singlepage from './Pages/Singlepage/Singlepage';
import Dashboard from './Pages/Dashboard/Dashboard';

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
            <Route  path="/blog">
              <Blogpage></Blogpage>
            </Route>

            <PrivateRoute path="/singlepage/:id">
              <Singlepage></Singlepage>
            </PrivateRoute>

            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/addexperience">
              <Addexperience></Addexperience>
            </PrivateRoute>

          <Route path="/registration">
            <Registration />
          </Route>

            <Route path="/dashboard">
              <Dashboard></Dashboard>
            </Route>
         </Switch>
        </BrowserRouter>
      </Authprovider>
    </div>
  );
}

export default App;
