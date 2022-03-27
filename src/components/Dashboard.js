import React from "react";
import { Accordion } from "react-bootstrap";
import { Link, Outlet, NavLink, useNavigate } from "react-router-dom";
import brand from "./Images/brand.jpg";
import {CgLogOff} from "react-icons/cg"

const Dashboard = () => {
  const navigate = useNavigate();
  return (

   
    <div className="px-0 bg-light dashboard ">   
    
      <div className="d-flex">
        <div className="d-flex align-items-center" id="navbar">
          <a className="text-decoration-none fs14 ps-3" htmlFor="#">
            <img src={brand} className="brand img-fluid" />
          </a>
         

        
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-items"
          aria-controls="navbarSupportedContent"
          aria-expanded="true"
          aria-label="Toggle navigation"
        ></button>
      </div>

      <div className="d-md-flex">
        <ul id="navbar-items" className="p-0">
          <li>
            <span className="ps-3 name">Home</span>
          </li>

          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="text-white">
                <span class="ps-3 name fw-bold">USER SETTING</span>
              </Accordion.Header>
              <Accordion.Body>
                <NavLink to="user"> Create User</NavLink>
                <NavLink to="role"> Role Setting</NavLink>
                <NavLink to="screen"> Screen Setup</NavLink>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </ul>
        

        <Outlet />
        {/* <div className='fs-3 ms-4 float-end'>
          <button onClick={()=>{navigate("/")}}><CgLogOff /></button>
        </div> */}
       
        
      </div>
   
    </div>
  );
};

export default Dashboard;
