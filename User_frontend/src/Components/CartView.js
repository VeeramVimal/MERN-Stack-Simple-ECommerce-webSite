
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from "react-use-cart";

import { Button, Table } from 'react-bootstrap';

import { Link } from 'react-router-dom';

var config = {
  imagePath: "http://localhost:8000/images/",
}

const CartView = (props) => {

  const [data, setData] = useState([]);
  const [Counts, setCounts] = useState(0);
  const [OfferCounts, setOfferCounts] = useState(0);

  useEffect(() => {
    getItemList();
  }, [])

  useEffect(() => {
    calculateTotal();
    calculateOfferTotal();
  }, [data])

  const getItemList = () => {
    var myData = JSON.parse(localStorage.getItem('Carts'))
    setData(myData)
  };

  const calculateTotal = () => {
    let total = 0;
    {data && data.length > 0 && data.map(item => {
        return (
          total += parseInt((item.price * item.qty))
        )
      })
    };
    setCounts(total)
  }

  const calculateOfferTotal = () => {
    let total = 0;
    {
      data && data.length > 0 && data.map(item => {
        return (
          total += parseInt((item.price * item.qty) - (item.MaxOfferLtd * item.qty))
        )
      })
    };
    setOfferCounts(total)
  }

  const deleteCarts = (item,id) => {
    // var CartsCopy = JSON.parse(JSON.stringify(Carts));
    // for (var i = 0; i < Carts.length; i++) {
    //   // var Carts = JSON.parse(Carts[i]);
    //   if (Carts._id == 3) {
    //     Carts.splice(i, 1);
    //   }
    // }
    // Carts = JSON.stringify(Carts); //Restoring object left into items again
    // localStorage.setItem("Carts", Carts);

  }

  const handleFirstCheck = (data) => {
    console.log("come handle click fun");
    props.history.push({
      pathname: "/CheckOut1",
      data: {}
    });
  }

  const emptyCart = () => {
    localStorage.removeItem('Carts');
    props.history.push('/');
    // localStorage.removeItem('Carts'._id)  
  }


  return (
    <div>
       <div className='col-sm-12 center'>
                <h3>List of CART Details</h3>
            </div>
      <section className="py-4 container">
        <div className="row justify-content-center">
          <div className="col-12">
            {/* <h5>Cart({totalUniqueItems}) Total Items:({totalItems})</h5> */}
            <table className="table table-light table-hover m-0">
              <thead>
                <tr>
                  <th>image</th>
                  <th>title</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>Sub_total</th>
                </tr>
              </thead>
              <tbody>

                {data && data.length > 0 && data.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td><img
                        src={config.imagePath + 'product/' + item.image}
                        style={{ height: '6rem' }} /></td>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                      <td>( {item.qty} )</td>

                      <td>
                        {(item.MaxOfferLtd) &&
                          ((item.qty * item.price) - (item.MaxOfferLtd * item.qty))
                        }
                        <td>
                          {(item.qty * item.price)}
                        </td>
                      </td>
                      <td>
                        <Button onClick={() => deleteCarts(item)} bsStyle="danger" >Delete</Button>
                      </td>
                    </tr>
                  )

                })}
              </tbody>

              <div className="col-auto ms-auto">
                <h2>Total Price: ${Counts}</h2>
              </div>
            </table>
          </div>

          {/* <div className="col-auto">
                <button className="btn btn-danger m-2"
                  bsStyle="danger"
                  type='submit'
                  onclick={emptyCart}>Clear Cart</button> 
          </div> */}

          <div className="col-auto">
          <button
              class="btn btn-danger m-2"
              bsStyle="danger"
              onClick={emptyCart}
              // onClick={() => handleFirstCheck(Counts)}
            >Clear Cart</button>
          </div>
        </div>

        <div className="col-md-12 text-right">
            <Button
              class="btn btn-success"
              // onClick={handleClick}
              onClick={() => handleFirstCheck(Counts)}
            >Check Out 1</Button></div>
      </section>
    </div>
  )

}

export default CartView;