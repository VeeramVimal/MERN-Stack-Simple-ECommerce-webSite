import React, { useState, useEffect } from "react";
import '../Styles/Styles.css';
import axios from "axios";
import { Radio, Input } from "antd";
import "antd/dist/antd.css";
import { useHistory, useParams } from "react-router-dom";
var fs = require('fs').promises;

function AddProduct(props) {
  let { id } = useParams();
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [imageRaw, setImageRaw] = useState([]);
  const [catagory, setCatagory] = useState();
  const [selectCatagory, setSelectCatagory] = useState([]);
  const [subCatagory, setsubCatagory] = useState([]);
  const [nextSub, setNextSub] = useState();
  const [selectSubCatagory, setSelectSubCatagory] = useState([]);
  const [nextSubCatagory, setNextSubCatagory] = useState([]);
  const [OrderType, SetOrderType] = useState(1);
  const [OrderValue, SetOrderValue] = useState(0);
  const [Errors, SetErrors] = useState({});
  const [limitValue, setLimitValue] = useState(0);

  const [State, setState] = useState({
    title: '',
    description: '',
    price: '',
 
  });

  useEffect(() => {
    getAddCatagory();
    getAddSubCatagory();
  }, [])

  const getAddCatagory = () => {
    axios.get("http://localhost:8000/Admin/getCatagory")
      .then((response) => {
        setsubCatagory(response.data)
      })
  }

  const handleCatagoryOnChange = (event) => {
    setSelectCatagory(event.target.value)
  }

  const handleSubOnChange = (event) => {
    setSelectSubCatagory(event.target.value)
  }

  const getAddSubCatagory = () => {
    axios.get("http://localhost:8000/Admin/getsubCatagory")
      .then((response) => {
        setNextSubCatagory(response.data)
      })
  }

  const InputChange = (event) => {
    switch (event.target.name) {
      case 'OrderValue':
        SetOrderValue(event.target.value);
        break;
      case 'limitValue':
        setLimitValue(event.target.value);
        break;
      default:
        break;
    }
    validationCheck(event.target);
  }

  const validationCheck = (target) => {
      if (target.name == 'OrderValue') {
        var errorsCopy = JSON.parse(JSON.stringify(Errors));
        if (errorsCopy.OrderValue) {
          delete errorsCopy.OrderValue
        }
  
        if (OrderType == 2) {
          if (target.value > State.price) {
            errorsCopy.OrderValue = 'error msg in fiat';
          }
        }
        else if (OrderType == 3) {
          if (target.value > 100) {
            errorsCopy.OrderValue = 'error message in percentage';
          }
        }
        SetErrors(errorsCopy);
      }
      else if (target.name == 'limitValue') {
        var maxPrice = JSON.parse(JSON.stringify(Errors));
        if (maxPrice.limitValue) {
          delete maxPrice.limitValue
        }
  
        if (OrderType == 3) {
          var maxLimit = State.price * OrderValue/100;
          if (target.value > maxLimit) {
            maxPrice.limitValue = 'error message is Limited the value';
          }
        }
        if (OrderType == 2) {
          if (target.value) {
            maxPrice.limitValue = 'error msg in fiat';
          }
        }
        SetErrors(maxPrice)
      }  
  }

  const handleInputChange = (event) => {
    setState((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();  
    const formData = new FormData();
    formData.append("title", State.title);
    formData.append("description", State.description);
    formData.append("price", State.price);
    formData.append("Catagory_id", selectCatagory);
    formData.append("SubCatagory_id", selectSubCatagory);
    formData.append("OfferType", OrderType);
    formData.append("OfferValue", OrderValue);
    formData.append("MaxOfferLtd", limitValue);

    imageRaw.forEach(img => {
      formData.append("image", img);
    })

    axios({
      method: "post",
      url: 'http://localhost:8000/Admin/image',
      data: formData,

      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        props.history.push('/list')

      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0])
      });
      var data = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const element = e.target.files[i];
        data.push(element);
      }
      setImageRaw(data);

    }
  };

  const handleBtnChange = (event) => {
    SetOrderType(event.target.value);
    SetOrderValue(0);
  };

  return (
    <div className='Container'>
      <div className='col-sm-12 center'>
        <h3>Admin Edit Product</h3>
      </div>
      <div>
        <label htmlFor="upload-button">
          {image.preview ? (
            <img src={image.preview} alt="dummy" width="300" height="300" />
          ) : (
            <>
              <span className="fa-stack fa-2x mt-3 mb-2">
                <i className="fas fa-circle fa-stack-2x" />
                <i className="fas fa-store fa-stack-1x fa-inverse" />
              </span>
              <h5 className="text-center">Upload Products</h5>
            </>
          )}
        </label>
        <input
          type="file"
          id="upload-button"
          style={{ display: "none" }}
          onChange={handleChange}
          multiple
        />
        <br /></div>

      <div className='col-sm-12 center'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            {/* <label> Name </label> */}
            <input
              className="form-control"
              type="text"
              placeholder="Enter title"
              name="title"
              value={State.title}
              onChange={handleInputChange} />

          </div>
          <div className='form-group'>
            <input
              type="file"
              onChange={handleChange}
              multiple
            />
            <img src={State.image} />
          </div>


          <div className="form-group">
            <label> Description </label>
            <textarea
              className="form-control"
              name="description"
              onChange={handleInputChange}
            /></div>

          <div className='form-group'>
            {/* <label> Password </label> */}
            <input
              className="form-control"
              type="price"
              placeholder="price"
              name="price"
              value={State.price}
              onChange={handleInputChange}
            />

          </div>
          <div className='col-sm-12 center'>
            <div className='col-sm-12 center'>
              <select onChange={handleCatagoryOnChange} value={selectCatagory}>
                <option >--Selected--</option>
                {
                  subCatagory && subCatagory.length > 0 &&
                  subCatagory.map(items => {


                    return (

                      <option value={items._id}>{items.Catagory_name}</option>

                    )
                  })
                }

              </select>
              <br />

              <select onChange={handleSubOnChange} value={selectSubCatagory} >
                <option >--Selected--</option>
                {
                  nextSubCatagory && nextSubCatagory.length > 0 &&
                  nextSubCatagory.map(item => {

                    return (
                      <option value={item._id}>{item.SubCatagory_name}</option>

                    )
                  })
                }
              </select>

            </div>

          </div>

          <Radio.Group onChange={handleBtnChange}>
            <Radio value={1}>Not-Available</Radio>
            <Radio value={2}>FIAT</Radio>
            <Radio value={3}>Percentage</Radio>
          </Radio.Group>
          {(OrderType == 2 || OrderType == 3) &&
            <Input
              className="form-control"
              placeholder="enter the Value"
              type="text"
              name="OrderValue"
              value={OrderValue}
              onChange={InputChange} />}


          <div className='form-group'>
          {(OrderType == 3) &&
            <input
              className="form-control"
              type="text"
              placeholder="MaxOfferLtd"
              name="limitValue"
              value={limitValue}
              onChange={InputChange}
            />
          }

          </div>
          <div className='form-grop'>
            <input className='btn btn-primary' type='submit' disabled={Object.keys(Errors).length > 0 ? true : false} />
          </div>


        </form>

      </div>

    </div>

  )
}


export default AddProduct;