import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsPlusLg } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";

const ScreenSetup = () => {
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
  const api = " https://ecom-react-task.herokuapp.com/screens";
  const token = JSON.parse(localStorage.getItem("token"));
  

  useEffect(() => {
    axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setData(res.data.data);
        return res.data.data;
      });
  }, []);
  console.log(data, "screen");
  return (
    <div className="role">
      <div className="container ">
        <div className="row">
        <h4 className="ms-4">Screen Setup</h4>
        <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-primary addbtn me-5"
          onClick={handleShow}
        >
          <BsPlusLg className="me-2" onClick={handleShow} />
          Add Screen
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Screen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div class="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="name"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                />
              </div>

              <div class="form-group mt-4">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  id="description"
                  aria-describedby="emailHelp"
                  placeholder="Enter Description"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Add
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="wrapper">
        <div className="m-5">
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">S.N</th>
                <th scope="col">Screen Name</th>
                <th scope="col">Description</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((ele, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{ele.name}</td>
                    <td>{ele.description}</td>
                    <td>
                      <AiOutlineEdit
                        className="text-primary me-3"
                        onClick={handleShow1}
                      />
                      <Modal show={show1} onHide={handleClose1}>
                        <Modal.Header closeButton>
                          <Modal.Title>Add Screen</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <form>
                            <div class="form-group">
                              <label htmlFor="name">Name</label>
                              <input
                                type="text"
                                className="form-control mt-2"
                                id="name"
                                aria-describedby="emailHelp"
                                placeholder="Enter Name"
                              />
                            </div>

                            <div class="form-group mt-4">
                              <label htmlFor="description">Description</label>
                              <input
                                type="text"
                                className="form-control mt-2"
                                id="description"
                                aria-describedby="emailHelp"
                                placeholder="Enter Description"
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
                      <RiDeleteBin5Line className="text-danger" onClick={handleShow2}/>
                      <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div><h5>Are you sure you want to delete this screen?</h5></div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose2}>
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

export default ScreenSetup;
