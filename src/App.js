import React,{useState} from 'react';
import "./App.css";
import {Login} from "./components/Login/Login";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, Navigate } from "react-router-dom";

import Dashboard from './components/Dashboard';
import ScreenSetup from './components/Pages/ScreenSetup';
import RoleSetting from './components/Pages/RoleSetting';
import CreateUser from './components/Pages/CreateUser';


function App() {

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");


  return <div className="App">

        {/* <Routes>
          <Route path='/'  element={<Login/>} />
          <Route path='/dashboard'  element={<Dashboard/>} >
          <Route path='user'  element={<CreateUser/>}/>
          <Route path='role'  element={<RoleSetting/>}/>
            <Route path='screen'  element={<ScreenSetup/>}/>
           
           
          </Route>

        </Routes> */}

<Routes>
        {!user && (
          <Route
            path="/"
            element={
              <Login
                authenticate={() => setUser(true)}
                name={name}
                setName={setName}
              />
            }
          />
        )}

        {user && (
          <Route path="dashboard" element={<Dashboard name={name} />}>
           
            <Route path="user" element={<CreateUser />} />
            <Route path="role" element={<RoleSetting />} />
            <Route path="screen" element={<ScreenSetup />} />
          </Route>
        )}
        <Route
          path="*"
          element={<Navigate to = {user ? "dashboard" : "/"} replace />}
        />
      </Routes>
     
   
   
    
  </div>;
}

export default App;
