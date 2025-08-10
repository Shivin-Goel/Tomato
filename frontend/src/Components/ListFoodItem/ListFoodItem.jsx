import React, { useState, useEffect, useContext } from 'react'
import './ListFoodItem.css'
import axios from "axios";
import { StoreContext } from '../../context/StoreContext';

const ListFoodItem = () => {

    const {url, token, hotelInfo} = useContext(StoreContext);
    let newUrl = url + `/api/hotel/${hotelInfo._id}/items`;

    // console.log(newUrl);

    const [list,setList] = useState([]);

    const fetchList = async ()=>{
        const response = await axios.get(newUrl)
        // console.log(response);

        if(response.data.success){
            setList(response.data.items);
        }
        else{
            // toast.error("Error");
            alert("error");
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchList();
    },[]);

    // const removeFood = async (foodId) => {
    //     const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    //     await fetchList();

    //     if(response.data.success){
    //         toast.success(response.data.message);
    //     }
    //     else{
    //         toast.error("Error");
    //     }
    // }


  return (
    <div className='list add flex-col'>
        <p>All Foods Lists</p>
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {list.map((item,index)=>{
            return (
                <div key={index} className="list-table-format">
                    <img src={item.imageUrl} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
                </div>
            )
        })}
    </div>
  )
}

export default ListFoodItem