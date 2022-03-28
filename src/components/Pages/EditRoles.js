import React from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';



const validationSchema = Yup.object({
    name: Yup.string().required("This is required field"),
   description: Yup.string().required("This is required field"),
   
  });


export default function EditRoles({handleClose1,show1,name,description,id}) {

    const token = JSON.parse(localStorage.getItem("token"));
    const initialValues = {
        name: name,
        description: description
    }

    const onSubmit = async(values)=>{
       
        try{
            const response = await axios({
                method : 'put',
                url: `https://ecom-react-task.herokuapp.com/roles/${id}`,
                headers: {
                  "content-type":"application/json",
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  name:values.name,
                  description:values.description,
                 
                  
                }
    
                }
                )

        }catch(err){

        }

    }

  return (
   
      <Modal show={show1} onHide={handleClose1}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Roles</Modal.Title>
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
                      <ErrorMessage name="description"  />

                          </span>
                        </div>
                
                      </div>
             
  
                      <Modal.Footer>
                        <Button type="submit" variant="primary" onClick={handleClose1}>
                         Edit Role
                        </Button>
                        <Button variant="danger" onClick={handleClose1}>
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal.Body>
                </Formik>
          </Modal>
  )}
