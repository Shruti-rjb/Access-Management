import React, { useState, useEffect} from "react";
import axios from "axios";
import { BsPlusLg } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditRoles from "./EditRoles";
import {FiSettings} from "react-icons/fi";

const initialValues = {
  name: "",
  description: "",
 
};
const validationSchema = Yup.object({
  name: Yup.string().required("This is required field"),
 description: Yup.string().required("This is required field"),
 
});


const RoleSetting = () => {

  const [name,setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [id,setId] =useState(null)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  
  const handleShow1 = (name,description,id) => {
    setShow1(true);
    setName(name);
    setId(id);
    setDescription(description);
    
  };


  const [data, setData] = useState([]);
  const api = " https://ecom-react-task.herokuapp.com/roles";
  const token = JSON.parse(localStorage.getItem("token"));




  

  useEffect(() => {
    axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setData(res.data.data);
        return res.data.data;
      });
  }, [data]);

  const onSubmit = async(values) => {
   
    try {
        const response = await axios({
            method : 'post',
            url: 'https://ecom-react-task.herokuapp.com/roles',
            headers: {
              "content-type":"application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
              name: values.name,
              description: values.description,
            }
            })

  console.log(response)
       
  }catch (err) {
        
  }
}

  
const deleteData = async (id) => {
  try {
    const response = await axios({
      method: "delete",
      url: `https://ecom-react-task.herokuapp.com/roles/${id}`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Deleted successfully");
  } catch (err) {
    console.log("Error")
  }
};

  return (
    <div className="role">
      <div className="container ">
        <div className="row">
        <h4 className="ms-4">Role Setting</h4>
        <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-primary addbtn me-5"
          onClick={handleShow}
        >
          <BsPlusLg className="me-2" onClick={handleShow} />
          Add Roles
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Roles</Modal.Title>
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
                      <ErrorMessage name="name"  />
                      <div className="col-6">
                        <label for="description">Description</label>
                        <span>
                          <Field
                            type="text"
                            id="description"
                            name="description"
                          />
                        </span>
                      </div>
                      
                    </div>
                    <ErrorMessage name="description"  />

                    <Modal.Footer>
                      <Button type="submit" variant="primary" onClick={handleClose}>
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
                <th scope="col">Role Name</th>
                <th scope="col">Description</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>{ele.id}</td>
                    <td>{ele.name}</td>
                    <td>{ele.description}</td>
                    <td>

                      {/* {-------edit-----} */}
                      <AiOutlineEdit
                        className="text-primary me-3"
                        onClick={()=>{handleShow1(ele.name,ele.description,ele.id)}}
                      />
                      <EditRoles handleClose1={handleClose1} show1={show1} name={name} id={id} description={description}/>
                     

                      {/* {-----delete----} */}
                     
                      <RiDeleteBin5Line className="text-danger me-3"  onClick={() => {
                              deleteData(ele.id);
                              toast.error("Role has been deleted");
                            }}/>
                             <FiSettings className="me-3"/>
                            
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

export default RoleSetting;
