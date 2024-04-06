import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Table, Button } from 'react-bootstrap';
import '../Styles/Styles.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddCatagory from "./AddCatagory";
import { API_URL } from "../../config/config";

var config = {
    imagePath: `${API_URL}/images/`,
}

function ListUser(props) {
    const [data, setDate] = useState([]);

    useEffect(() => {
        getUserList();
        // getCategory();
    }, [])

    const getUserList = () => {
        axios.get(`${API_URL}/Admin/getProduct`).then((response) => {
          setDate(response.data);
        });
    };


    const deleteList = (id) => {
        axios
          .delete(`${API_URL}/Admin/deleteProduct/` + id)
          .then((response) => {
            getUserList();
          });
    }

    let history = useHistory();
    const getItemById = (id) => {
        history.push(`/editProduct/${id}`)
    }

    const handleClick = () => {
        props.history.push({
            pathname: "/addUser",
            data: {}
        });
    }

    return (
        <div>
            <section>
                <AddCatagory />
            </section>
            <section className="py-4 container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div>
                            <button className="btn btn-success btn-lg float-end"
                                onClick={handleClick}>Add New Product</button>
                        </div>
                        <Table className="table table-light table-hover m-0">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    data && data.length > 0 && data.map((item, i) => {

                                        return (
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td><img
                                                    src={config.imagePath + 'product/' + item.image}
                                                    style={{ height: '6rem' }} /></td>
                                                <td>{item.title}</td>
                                                <td>{item.description}</td>
                                                <td>{item.price}</td>
                                                <td>{item.Action}</td>

                                                <td>
                                                    <Button variant="info" onClick={() => getItemById(item._id)} className="btn btn-primary">Edit</Button>
                                                </td>
                                                <td>
                                                    <Button onClick={() => deleteList(item._id)} bsStyle="danger" >Delete</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>

                        </Table>
                    </div>
                </div>
            </section>
        </div>
    )

}
export default ListUser;