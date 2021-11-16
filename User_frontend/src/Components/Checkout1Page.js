
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from "react-use-cart";
import { useHistory } from "react-router-dom";

var config = {
  imagePath: "http://localhost:8000/images/",
}

const CheckOut1 = (props) => {
  const [checkOut, setcheckOut] = useState([]);
  const [Count, setCount] = useState(0);
  const [offers, setOffers] = useState(0);
  const [subCoupon, setsubCoupon] = useState();
  const { emptyCart } = useCart
  const [coupon, setCoupon] = useState({ Coupon: "" });
  const history = useHistory();
  console.log(subCoupon, 'subCoupon');

  useEffect(() => {
    getItemList();
    getCoupondata();

  }, [])

  useEffect(() => {
    calculateTotal();
    TotalOfferCalc();
  }, [checkOut])

  const getItemList = () => {
    var mycheckOut = JSON.parse(localStorage.getItem('Carts'))
    setcheckOut(mycheckOut)
  };

  const calculateTotal = () => {
    let total = 0;

    {
      checkOut && checkOut.length > 0 && checkOut.map(i => {

        return (
          total += parseInt(i.price * i.qty)

        )

      })
    };
    setCount(total)
  }

  const TotalOfferCalc = () => {
    let totalOffer = 0;

    {
      checkOut && checkOut.length > 0 && checkOut.map(game => {

        if (game.OfferType == 3) {
          totalOffer += parseInt((game.price) - (game.MaxOfferLtd)) * (game.qty)


        } else if (game.OfferType == 2) {
          totalOffer += parseInt(((game.price) - (game.OfferValue)) * (game.qty))


        } else if (game.OfferType == 1) {
          totalOffer += parseInt((game.price) * (game.qty))

        }
      })
    };
    setOffers(totalOffer)
  }

  const deleteCarts = (id) => {
    var deletedcheckOut = JSON.parse(localStorage)

      // axios.get('http://localhost:8080/User/deleteCarts/' + id)
      .then((response) => {
        getItemList()

      })
  }

  const InputChange = (event) => {
    setCoupon((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value
    }));

  }

  // const InputChange =(event)=>{

  //   var check = event.target.value
  //   {   subCoupon && subCoupon.length > 0 && subCoupon.map(item => {
  //     for(var i=0; i < check.length; i++ ){
  //       let data = item.couponCodeName
  //       // console.log(data, 'datadata++++++');
  //       // let dataCheck;
  //       if(data == true){
  //         console.log('hiiiii');
  //       }

  //     }

  //   })}


  //   setCoupon(check)
  // }

  const getCoupondata = (event) => {
    axios.get("http://localhost:8000/Admin/getCoupen")
      .then((response) => {
        setsubCoupon(response.data)
      })
  }

  const handleClick = (event) => {
    event.preventDefault();
    if (subCoupon && subCoupon.length > 0) {
      let checkCoupon = subCoupon.find(el => el.couponCodeName == coupon.Coupon)
        if(typeof checkCoupon == 'undefined') {
            alert("sorry try another coupon")
        }
        if(checkCoupon.Price > offers) {
            alert(`Need to add more items worth ${offers - checkCoupon.Price} to the list for this coupon to be enabled`)
        }
        else {
            history.push("/Coupon_Detail");
        }
    }
}
  // const handleClick = (event) => {
  //   event.preventDefault();
  //   if (subCoupon && subCoupon.length > 0) {
  //     let checkCoupon = subCoupon.find(el => el.couponCodeName == coupon.Coupon)
  //     if (checkCoupon) {
  //         //  Push next page
  //         history.push("/Coupon");
        
  //     } else if (checkCoupon !== coupon.Coupon) {
  //       alert("sorry try another coupon")
  //     }

  //   }

  // }

  return (
    <div>
       <div className='col-sm-12 center'>
                <h3>List of Check_Out Details</h3>
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
                  <th>qty</th>

                  <th>productPrice</th>
                  <th>Price</th>


                  <th>OfferPrice</th>
                  {/* <th>Offer type</th> */}
                </tr>
              </thead>
              <tbody>

                {checkOut && checkOut.length > 0 && checkOut.map(item => {
                  return (
                    <tr>
                      <td><img
                        src={config.imagePath + 'product/' + item.image}
                        style={{ height: '6rem' }} /></td>
                      <td>{item.title}</td>
                      <td>{item.qty}</td>
                      <td>{item.price}</td>

                      <td>
                        {(item.qty * item.price)}

                      </td>


                      {item.OfferType == 3 &&
                        <td>perc({((item.price) - (item.MaxOfferLtd)) * (item.qty)})</td>

                      }
                      {
                        item.OfferType == 2 && <td>fiat({((item.price) - (item.OfferValue)) * (item.qty)})</td>
                      }
                      {

                        item.OfferType == 1 &&
                        <td>NA({(item.price) * (item.qty)})</td>
                      }


                    </tr>

                  )

                })}
              </tbody>


              <div className="col-auto ms-auto">
                <h2>Actual Price: ${Count}</h2>
              </div>

              <div className="col-auto ms-auto">
                <h2>Offer Price: ${offers}</h2>
              </div>
            </table>
          </div>
        </div></section>

      <section>
        <div className="row justify-content-center">
          <div className='d-flex justify-content-end'>
            <div className='col-md-5 col-md-push-3 col-sm-12 '>
                <h3>Coupon</h3>
                <div className='form-group'>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter 5-digit Coupen "
                  name="Coupon"
                  value={coupon.Coupon}
                  onChange={InputChange}
                /></div>
              <input className='btn btn-primary' onClick={handleClick} type='submit' />
            </div>
          </div></div>
      </section>
    </div>
)}
export default CheckOut1;