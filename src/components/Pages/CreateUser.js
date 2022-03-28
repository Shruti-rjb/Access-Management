import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { BsPlusLg } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import EditUser from "./EditUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  name: "",
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  name: Yup.string().required("This is required field"),
  email: Yup.string().email("Not a Valid Mail").required("This is required"),
  password: Yup.string().min(6).max(12).required("Required"),
});

const CreateUser = () => {
  

  const [show, setShow] = useState(false);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  const [id, setId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);

  const handleShow1 = (id, name, email) => {
    setShow1(true);
    setId(id);
    setEmail(email);
    setName(name);

    
  };

 

  const [data, setData] = useState([]);
  const api = " https://ecom-react-task.herokuapp.com/user";
  const token = JSON.parse(localStorage.getItem("token"));
 

  useEffect(() => {
    axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setData(res.data.data);
        return res.data.data;
      });
  }, [data]);

  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();

    try {
      const response = await axios({
        method: "post",
        url: "https://ecom-react-task.herokuapp.com/user",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      });

      console.log(response);
    } catch (err) {}
  };

  const deleteData = async (id) => {
    try {
      const response = await axios({
        method: "delete",
        url: `https://ecom-react-task.herokuapp.com/user/${id}`,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Deleted successfully");
    } catch (err) {
      console.log("error");
    }
  };

  

  return (
    <div className="role">
      <div className="container ">
        <div className="row">
          <h4 className="ms-4">Create User</h4>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary addbtn me-5"
              onClick={handleShow}
            >
              <BsPlusLg className="me-2" onClick={handleShow} />
              Add User
            </button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
              </Modal.Header>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Modal.Body>
                  <Form>
                    <div className="row">
                      <div className="col-6">
                        <label for="name">Name</label>
                        <span>
                          <Field type="text" id="name" name="name" />
                        </span>
                      </div>
                      {/* <ErrorMessage name="name" component={TextError} /> */}
                      <div className="col-6">
                        <label for="email">Email</label>
                        <span>
                          <Field type="text" id="email" name="email" />
                        </span>
                      </div>
                      <div className="col-6">
                        <label for="password">Password</label>
                        <span>
                          <Field
                            type="password"
                            id="password"
                            name="password"
                          />
                        </span>
                      </div>
                    </div>
                    <ErrorMessage name="password" />

                    <Modal.Footer>
                      <Button
                        type="submit"
                        variant="primary"
                        onClick={handleClose}
                      >
                        Add User
                      </Button>
                      <Button variant="danger" onClick={handleClose}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal.Body>
              </Formik>
            </Modal>
          </div>
          <div className="wrapper">
            <div className="m-5">
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th scope="col">S.N</th>
                    <th scope="col">User</th>
                    <th scope="col">Email</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((ele, index) => {
                    return (
                      <tr key={index}>
                        <td>{ele.id}</td>
                        <td>{ele.name}</td>
                        <td>{ele.email}</td>
                        <td>

                          {/* {------edit------} */}
                          <AiOutlineEdit
                            className="text-primary me-3"
                            onClick={() => {
                              handleShow1(ele.id, ele.name, ele.email);
                            }}
                          />

                          <EditUser
                            show1={show1}
                            handleClose1={handleClose1}
                            name={name}
                            id={id}
                            email={email}
                          />
                          

                          {/* {-----delete-----} */}
                          <RiDeleteBin5Line
                            className="text-danger"
                            onClick={() => {
                              deleteData(ele.id);
                              toast.error("User has been deleted");
                            }}
                          />
                          <ToastContainer
                            position="top-right"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                          />
            
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
