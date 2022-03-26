import React, { useEffect, useState } from "react";
import "./login.css";
import { Formik } from "formik";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = ({ authenticate, name, setName }) => {
  // const navigate = useNavigate();


  return (
    <div className="main">
      <div className="container">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().required("Required!"),
            password: Yup.string().required("Required!"),
          })}
          onSubmit={async (values) => {
            let response = await axios({
              url: "https://ecom-react-task.herokuapp.com/auth/login",
              method: "post",
              data: values,
            });
            console.log(response,"response")
            localStorage.setItem(
              "token",
              JSON.stringify(response.data.data.token)

   
            );

            authenticate();
            setName(response.data.data.user.name);
            //navigate("/dashboard");
          }}
        >
          {(formik) => (
            <form className="loginForm" onSubmit={formik.handleSubmit}>
              <div className=" text-center">
                <h4 className="header">Login Page </h4>
              </div>

              <div className="form-group mt-3 ">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-control  mt-3"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger mt-2">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="form-group mt-3 ">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control  mt-3"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger mt-2">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="text-center  my-5">
                <button type="submit" className="btn btn-success px-4 " >
                  Log In
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
