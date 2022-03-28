import React from 'react'
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';

  const validationSchema = Yup.object({
    name: Yup.string().required("This is required field"),
    email: Yup.string().email('Not a Valid Mail').required("This is required"),
    password: Yup.string().min(6).max(12).required('Required')
  });

export default function EditUser({show1,handleClose1,name,email,id}) {

    const token = JSON.parse(localStorage.getItem("token"));

    const initialValues = {
        name: name,
        email: email,
        password: ""
      };
    
      const onSubmit = async(values) => {
        
        try {
            const response = await axios({
                method : 'put',
                url: `https://ecom-react-task.herokuapp.com/user/${id}`,
                headers: {
                  "content-type":"application/json",
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  name: values.name,
                  email: values.email,
                  password:values.password
                  
                }
    
                })
    
           // console.log(response)
           
      }catch (err) {
            
      }
    }

  return (
       
      <Modal show={show1} onHide={handleClose1}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
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
                            <Field
                              type="text"
                              id="email"
                              name="email"
                              
                            />
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
                      {/* <ErrorMessage name="password" component={TextError} /> */}
  
                      <Modal.Footer>
                        <Button type="submit" variant="primary" onClick={handleClose1}>
                         Edit user
                        </Button>
                        <Button variant="danger" onClick={handleClose1}>
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal.Body>
                </Formik>
          </Modal>
 
  )
}
