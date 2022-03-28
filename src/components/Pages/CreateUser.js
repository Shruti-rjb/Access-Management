import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { BsPlusLg } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";


const initialValues = {
  name: "",
  email: "",
  password: ""
};
const validationSchema = Yup.object({
  name: Yup.string().required("This is required field"),
  email: Yup.string().email('Not a Valid Mail').required("This is required"),
  password: Yup.string().min(6).max(12).required('Required')
});

const CreateUser = () => {

  

  // const [editData, setEditData] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);


  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  
  const [data, setData] = useState([]);
  const api = " https://ecom-react-task.herokuapp.com/user";
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token, "tokken");

  useEffect(() => {
    axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setData(res.data.data);
        return res.data.data;
      });
  }, [data]);
  //console.log(data, "dataa");


  const onSubmit = async(values,onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    //console.log(values)
    
    try {
        const response = await axios({
            method : 'post',
            url: 'https://ecom-react-task.herokuapp.com/user',
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

        console.log(response)
       
  }catch (err) {
        
  }
}



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
  } catch (err) {}
};



// const { values} = useFormik({
//   enableReinitialize: true,
//   initialValues: values,
 
//   onSubmit: (_, { resetForm }) => {
//     handleFormSubmit(resetForm);
//   },
// });






// const handleFormSubmit = async (resetForm) => {

//   let response;
//   if (editData) {
//     response = await axios.put(
//       `https://ecom-react-task.herokuapp.com/user/${editData?._id}`,values
//     );
//   } else {
//    response = await axios.post(
//       " https://ecom-react-task.herokuapp.com/user",
//       values
//     );
//   }

//   if (response?.data?._id) {
    

   
//     setEditData(null);
//   } else {
//     console.log("Something went wrong");
//   }

//   console.log(response);
// };


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
                <th scope="col">User</th>
                <th scope="col">Email</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ele, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{ele.id}</td>
                    <td>{ele.email}</td>
                    <td>
                      {/* {edit} */}
                      <AiOutlineEdit
                        className="text-primary me-3"
                        onClick={handleShow1}
                      />
                      <Modal show={show1} onHide={handleClose1}>
                        <Modal.Header closeButton>
                          <Modal.Title>Edit User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <form>
                            <div class="form-group">
                              <label htmlFor="name">Username</label>
                              <input
                                type="text"
                                className="form-control mt-2"
                                id="name"
                                aria-describedby="emailHelp"
                                placeholder="Enter Name"
                                // value={values.name}
                              />
                            </div>

                            <div class="form-group mt-4">
                              <label htmlFor="description">Email</label>
                              <input
                                type="email"
                                className="form-control mt-2"
                                id="email"
                                // value={values.email}
                                aria-describedby="emailHelp"
                                placeholder="Enter Email"
                              />
                            </div>
                          </form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="primary" onClick={handleClose1}>
                           Edit
                          </Button>
                          <Button variant="danger" onClick={handleClose1}>
                            Cancel
                          </Button>
                        </Modal.Footer>
                      </Modal>


                      {/* {delete} */}
                      <RiDeleteBin5Line className="text-danger" onClick ={handleShow2}/>

                      <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div><h5>Are you sure you want to delete this user?</h5></div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => deleteData(ele.id)}>
              Delete
            </Button>
            <Button variant="primary" onClick={handleClose2}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>


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
