import React, { useState } from 'react'
import './AddFoodItem.css'
import axios from 'axios'
import './AddFoodItem.css'
import { toast } from 'react-toastify'

const AddFoodItem = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl,setImageUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    // console.log(token);

    if (!token) {
      alert('You need to be logged in to add a food item.');
      return;
    }

    const foodItem = {
      name,
      price,
      description,
      imageUrl
    };
    // http://localhost:4000
    try {
      const response = await axios.post('https://tomato-backend-lutg.onrender.com/api/hotel/items', foodItem, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      toast.success(response.data.message)
      // alert('Food item added successfully');
      
      // console.log(response.data.item)

    } catch (error) {
      console.error('Error adding food item', error);
      toast.error('Failed to add food item');
    }


    setName('');
    setPrice('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <div className="add-item-form form-container ">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Food Item Photo:</label>
          <input
            type="file"
            // value={name}
            onChange={(e) => {
              const file = e.target.files[0];

              var reader = new FileReader();
              reader.onloadend = function (){
                setImageUrl(reader.result);
              }

              reader.readAsDataURL(file);
            }}
            required
          />

          <img src={imageUrl} className={imageUrl ? 'preview-image' : ''}/>
        </div>
        <div>
          <label>Food Item Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Food Item</button>
      </form>
    </div>
  );
};

export default AddFoodItem;
