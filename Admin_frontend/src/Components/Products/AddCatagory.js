import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../Styles/Styles.css';
import { API_URL } from "../../config/config";

function AddCatagory() {
    const [catagory, setCatagory] = useState();
    const [selectCatagory, setSelectCatagory] = useState([]);
    const [subCatagory, setsubCatagory] = useState([])
    const [nextSub, setNextSub] = useState()
    const [selectSubCatagory, setSelectSubCatagory] = useState([])
    const [nextSubCatagory, setNextSubCatagory] = useState([])

    // useEffect(() => {
    //     getAddCatagory();
    //     getAddSubCatagory();
    //     // getCategory();
    // }, [])

    const handleInputChange = (event) => {
        setCatagory(event.target.value);
    };

    const variable = {
        Catagory_name: catagory
    }

    const handleClick = () => {
      axios.post(`${API_URL}/Admin/addcatagory`, variable).then((response) => {
        let checkCatagory = JSON.parse(response.config.data);
        let checkCat = checkCatagory.Catagory_name;
        if (checkCat == catagory) {
          alert("Already added this catagory");
        }
        if (checkCat !== catagory) {
          alert("New Category Added");
        } else {
          axios.get(`${API_URL}/Admin/getCatagory`).then((response) => {
            setsubCatagory(response.data);
          });
        }
      });
    }

// const getAddCatagory = () => {
//     // axios.get("http://localhost:8000/Admin/getCatagory")
//     //     .then((response) => {
//     //         setsubCatagory(response.data)
//     //         // console.log('resdfsfasdf', response.data);
//     //     })
// }

const handleCatagoryOnChange = (event) => {
    setSelectCatagory(event.target.value)
}

const handleInChange = (event) => {
    setNextSub(event.target.value);

};
const SubVariable = {
    Catagory_id: selectCatagory,
    SubCatagory_name: nextSub
}
// console.log(SubVariable,"SubVariable", selectSubCatagory);
const handleOnClick = () => {
    axios
      .post(`${API_URL}/Admin/addsubcatagory`, SubVariable)
      .then((response) => {
        alert("New Sub_Category Added");

        if (response) {
          axios.get(`${API_URL}/Admin/getsubCatagory`).then((response) => {
            setNextSubCatagory(response.data);
          });
        }
      });
}

const handleSubOnChange = (event) => {
    setSelectSubCatagory(event.target.value)
}

// const getAddSubCatagory = () => {
//     axios.get("http://localhost:8000/Admin/getsubCatagory")
//         .then((response) => {
//             setNextSubCatagory(response.data)
//         })
// }

return (
    <section>
        <div className='col-sm-12 center'>
            <div className='form-group'>
                <input
                    type="text"
                    placeholder="Enter Category"
                    name="shoes"
                    value={catagory}
                    onChange={handleInputChange} />
                <button className="btn btn-success" onClick={handleClick}> Add Category</button>
            </div>
            <br />

            <select onChange={handleCatagoryOnChange} value={selectCatagory}>
                {
                    subCatagory && subCatagory.length > 0 &&
                    subCatagory.map(items => {

                        return (
                            <option value={items._id}>{items.Catagory_name}</option>
                        )
                    })
                }</select>
            <br />

            <div className='form-group'>
                <input
                    type="text"
                    placeholder="Enter Sub-Category"
                    name="Electronics"
                    value={nextSub}
                    onChange={handleInChange} />
                <button className="btn btn-success" onClick={handleOnClick}> Add sub_Catagory</button>
            </div>
            <br />

            <select onChange={handleSubOnChange} value={selectSubCatagory} >
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
    </section>
)
}
export default AddCatagory;