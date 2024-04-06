
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from "react-use-cart"
import { API_URL } from '../config/config';

var config = {
  imagePath: `${API_URL}/images/`,
};

const CouponTable = (props) => {

    const [offers, setOffers] = useState(0);
    const [couponCode, setCouponCode] = useState([]);
    const [Amount, setAmount] = useState(0);
    const [couponAmt, setCouponAmt]= useState(0);

    console.log(Amount, 'Amount', couponAmt);

    useEffect(() => {
        getItemList();
        getCouponAmount();
        TotalCouponAmount();
    }, [])

    useEffect(() => {
        TotalOfferCalc();

    }, [couponCode])

    useEffect(() => {
        TotalCouponAmount();
    }, [Amount])


    const getItemList = () => {
        var myCoupon = JSON.parse(localStorage.getItem('Carts'))
        setCouponCode(myCoupon)
    };


    const getCouponAmount =() =>{
        axios.get(`${API_URL}/Admin/getCoupen`).then((response) => {
          setAmount(response.data);
        });
       
        
    }
  
    const TotalCouponAmount =()=>{
    
        let CouponTotal = 0;
        let OfferAmount = 0
        {
            Amount && Amount.length > 0 && Amount.map(item => {
                let CouponCodeName = item.couponCodeName;
                let Discount = item.Discount;
                let Offer_Price = item.Offer_Price;
                let Price = item.Price;

                if(CouponCodeName){
                    if(Price < offers){
                        OfferAmount = ((offers) * (Discount)/100) 
                        console.log(OfferAmount, 'OfferAmount');
                    } 
                }
                if(Offer_Price < OfferAmount){
                    CouponTotal = (offers - Offer_Price )
           
                }
                else if(Offer_Price > OfferAmount){
                    CouponTotal = (offers - OfferAmount )
                }
            })
        }
        setCouponAmt(CouponTotal)

    }

    const TotalOfferCalc = () => {
        let totalOffer = 0;

        {
            couponCode && couponCode.length > 0 && couponCode.map(game => {

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

    return (
        <div>
             <div className='col-sm-12 center'>
                <h3>List of Coupon Details</h3>
            </div>
            <section className="py-4 container">
                <div className="row justify-content-center">
                    <div className="col-12">
                
                        <div className="col-auto ms-auto">
                            <h2>Sub Total: ₹{offers}</h2>
                        </div>
                        <div className="col-auto ms-auto">
                            { Amount && Amount.length > 0 && Amount.map(item => {
                                return(<h2>Coupon: ₹{item.Offer_Price}</h2>)
                            })}
                        </div> 
                           <div className="col-auto ms-auto">
                            <h2>Total: ₹{couponAmt}</h2>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )

}

export default CouponTable;