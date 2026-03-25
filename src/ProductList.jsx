import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const plants = [
  { id: 1, name: "Aloe Vera", price: 10, category: "Indoor", image: "https://via.placeholder.com/100" },
  { id: 2, name: "Snake Plant", price: 15, category: "Indoor", image: "https://via.placeholder.com/100" },
  { id: 3, name: "Peace Lily", price: 12, category: "Indoor", image: "https://via.placeholder.com/100" },

  { id: 4, name: "Rose", price: 8, category: "Outdoor", image: "https://via.placeholder.com/100" },
  { id: 5, name: "Tulip", price: 9, category: "Outdoor", image: "https://via.placeholder.com/100" },
  { id: 6, name: "Sunflower", price: 7, category: "Outdoor", image: "https://via.placeholder.com/100" },

  { id: 7, name: "Bonsai", price: 20, category: "Decorative", image: "https://via.placeholder.com/100" },
  { id: 8, name: "Cactus", price: 5, category: "Decorative", image: "https://via.placeholder.com/100" },
  { id: 9, name: "Orchid", price: 18, category: "Decorative", image: "https://via.placeholder.com/100" },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const isInCart = (id) => {
    return cartItems.find(item => item.id === id);
  };

  const grouped = plants.reduce((acc, plant) => {
    acc[plant.category] = acc[plant.category] || [];
    acc[plant.category].push(plant);
    return acc;
  }, {});

  return (
    <div>
      <h1>Plants</h1>

      {/* Navbar */}
      <div>
        <span>Cart Items: {cartItems.length}</span>
      </div>

      {Object.keys(grouped).map(category => (
        <div key={category}>
          <h2>{category}</h2>

          {grouped[category].map(plant => (
            <div key={plant.id}>
              <img src={plant.image} alt={plant.name} />
              <h3>{plant.name}</h3>
              <p>${plant.price}</p>

              <button
                onClick={() => dispatch(addItem(plant))}
                disabled={isInCart(plant.id)}
              >
                {isInCart(plant.id) ? "Added" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ProductList;
