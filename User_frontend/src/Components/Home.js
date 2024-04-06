
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { Link } from 'react-router-dom';
import { DropdownButton } from 'react-bootstrap';
import { API_URL } from '../config/config';

var config = {
  imagePath: `${API_URL}/images/`,
};

const Home = (props) => {

  var CartsOld = localStorage.getItem('Carts');
  if (CartsOld == null) {
    CartsOld = [];
  }
  else {
    CartsOld = JSON.parse(CartsOld)
  }
  const [Carts, setCarts] = useState(CartsOld);

  var CartsOld = localStorage.getItem('Carts');
  if (CartsOld == null) {
    localStorage.setItem('Carts', JSON.stringify([]));
  }

  const [data, setData] = useState([])
  const [ItemCount] = useState(0);
  const [searchText, setSearchText] = useState(data);
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    getItemList()
    searchItem()

  }, [])

  const getItemList = () => {
    axios.get(`${API_URL}/Admin/getProduct`)
      .then((response) => {
        // console.log('reeeeeeeeeeeeeeees',response)
        setData(response.data)

      })
  };

  const searchItem = () => {
    axios.get(`${API_URL}/Admin/getProduct`)
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => {
        console.log('Error getting fake data: ' + error);
      })
  };

  // exclude column list from filter
  const excludeColumns = ["title", "price"];
  const handleSearch = value => {
    setSearchText(value);
    filterData(value);
  };

  // filter records by search text
  const filterData = (value) => {
    // console.log('filtreererer', filterData);
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(data);
    else {
      const filteredData = data.filter(item => {
        return Object.keys(item).some(key =>
          excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  }

  const handleSubmit = () => {
    var hastoken = localStorage.getItem('savedUserToken');
    if (!hastoken) {
        alert("go first login")
        props.history.push("/login")
    }else {
      console.log("come handle click fun");
      props.history.push({
        pathname: "/cart",
        data: {}
      });
      console.log('dataclick', data);
    }  
  }


  const quantityChanges = (item, addOrLess) => {
    var dataCopy = JSON.parse(JSON.stringify(data));
    const check = dataCopy.findIndex(element => element._id === item._id);
    if (check !== -1) {
      if (typeof dataCopy[check].qty == 'undefined') {
        dataCopy[check].qty = 0;
      }
      if (addOrLess == 'add') {
        dataCopy[check].qty++;
      } else {
        dataCopy[check].qty--;
      }
      if (dataCopy[check].qty < 1) {
        dataCopy[check].qty = 1;
      }
      setData(dataCopy);
    }
  }

  const addToCart = (item) => {
    var CartsCopy = JSON.parse(JSON.stringify(Carts));
    const check = CartsCopy.findIndex(element => element._id === item._id);
    if (check == -1) {
      if (typeof item.qty == 'undefined') {
        item.qty = 1;
      }
      CartsCopy.push({ Id: item._id});
    } else {
      // already add
      alert("Already selected this cart")
    }
    setCarts(CartsCopy);
    localStorage.setItem('Carts', JSON.stringify(CartsCopy));
  }


  return (

    <div>
      <h1 className="text-center mt-3">All Shopping Products</h1>

      <div className="SearchBar">
        <div style={{ margin: '0 auto', marginTop: '3%' }}>
          <label>Search:</label>
          <input
            placeholder="Type to search..."
            value={searchText}
            type="text"
            onChange={(e) => handleSearch(e.target.value)} />
        </div>
      </div>

      <div class="dropdown dropstart text-end">
        <DropdownButton class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
          <li><a class="dropdown-item" href="#">Normal</a></li>
          <li><a class="dropdown-item" href="#">Active</a></li>
          <li><a class="dropdown-item" href="#">Disabled</a></li>
        </DropdownButton>
      </div>

      <section className="py-4 container">
        <div className="row justify-content-center">
          {data && data.length > 0 && data.map((item, index) => {
            // console.log("item", item);
            return (
              <div className="col-11 col-md-6 coll-lg-3 mx-0 mb-4">
                <div class="card p-0 overflow-hidden h-100 shadow" >
                  <img
                    src={config.imagePath + 'product/' + item.image}
                    className="card-img-top img-fluid"
                    alt={item.title} />


                  <div class="card-body text-center" >
                    <h5 class="card-title">{item.title}</h5>
                    <h6 class="card-price">₹ {item.price}</h6>

                    <p class="card-text">{item.description}</p>
                    <div key={item.id}>
                      Add: <input type="submit" value="+" onClick={() => quantityChanges(item, 'add')} />
                      Less: <input type="submit" value="-" onClick={() => quantityChanges(item, 'less')} />
                    </div>
                    <div key={item.id}>
                      <input type="submit" value="Add to Cart" onClick={() => addToCart(item)} /> ({item.qty ? item.qty : 0})
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="clearboth"></div>
          {data.length === 0 && <span>No records found to display!</span>}

        </div>

      </section>

      <div className="col-md-12 text-center">
        <Badge
          color="secondary"
          badgeContent={Carts.length}>
          <ShoppingCartIcon />{" "}
        </Badge>
      </div>
      <div>
        <div className="col-md-12 text-center">
            <Button
              type="Submit"
              class="btn btn-success"
              // onSubmit={() => handleSubmit(Carts)}
              onClick={handleSubmit}
            >cart view</Button>
        </div>

      </div>
    </div>
  )
}
export default Home;