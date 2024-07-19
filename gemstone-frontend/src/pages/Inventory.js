// src/pages/Inventory.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import '../styles/styles.css';

const dummyItems = [
  { id: 38472847821, item_name: 'Gold Ring', metal_type: 'Gold', weight: 10, price: 500, quantity: 5 },
  { id: 25825938252, item_name: 'Silver Necklace', metal_type: 'Silver', weight: 20, price: 300, quantity: 10},
  { id: 81983302093, item_name: 'Platinum Bracelet', metal_type: 'Platinum', weight: 15, price: 700, quantity: 8 },
  { id: 14149488444, item_name: 'Diamond Earrings', metal_type: 'Gold', weight: 5, price: 1500, quantity: 12 },
  { id: 52423423944, item_name: 'Gold Necklace', metal_type: 'Gold', weight: 25, price: 2000, quantity: 25 },
  { id: 10394858586, item_name: 'Silver Bracelet', metal_type: 'Silver', weight: 15, price: 350, quantity: 40 },
  { id: 23824782847, item_name: 'Platinum Ring', metal_type: 'Platinum', weight: 8, price: 800, quantity: 15 },
  { id: 91948928498, item_name: 'Emerald Pendant', metal_type: 'Gold', weight: 12, price: 1200, quantity: 5 },
  { id: 12836666629, item_name: 'Ruby Necklace', metal_type: 'Gold', weight: 20, price: 1800, quantity: 8 },
  { id: 11424712940, item_name: 'Sapphire Earrings', metal_type: 'Platinum', weight: 7, price: 1300, quantity: 12 },
  { id: 10123939011, item_name: 'Amethyst Ring', metal_type: 'Silver', weight: 9, price: 450, quantity: 30 },
  { id: 79130129312, item_name: 'Topaz Bracelet', metal_type: 'Gold', weight: 14, price: 950, quantity: 22 },
  { id: 13777462813, item_name: 'Pearl Necklace', metal_type: 'Silver', weight: 18, price: 600, quantity: 18 },
  { id: 14242484442, item_name: 'Opal Pendant', metal_type: 'Gold', weight: 10, price: 750, quantity: 25 },
  { id: 818938381315, item_name: 'Turquoise Earrings', metal_type: 'Silver', weight: 8, price: 300, quantity: 28 },
  { id: 138876643416, item_name: 'Garnet Ring', metal_type: 'Gold', weight: 11, price: 550, quantity: 20 },
  { id: 137376646447, item_name: 'Aquamarine Necklace', metal_type: 'Silver', weight: 19, price: 500, quantity: 15 },
  { id: 663827313318, item_name: 'Citrine Bracelet', metal_type: 'Gold', weight: 13, price: 900, quantity: 10 },
  { id: 110993133319, item_name: 'Peridot Earrings', metal_type: 'Silver', weight: 6, price: 350, quantity: 35 },
  { id: 23456666720, item_name: 'Spinel Ring', metal_type: 'Platinum', weight: 9, price: 1100, quantity: 8 },
  { id: 212764782447, item_name: 'Onyx Necklace', metal_type: 'Gold', weight: 24, price: 700, quantity: 20 },
  { id: 242446464722, item_name: 'Jade Bracelet', metal_type: 'Silver', weight: 16, price: 400, quantity: 25 },
  { id: 242420909903, item_name: 'Lapis Earrings', metal_type: 'Gold', weight: 7, price: 600, quantity: 15 },
  { id: 11333344324, item_name: 'Amber Pendant', metal_type: 'Silver', weight: 12, price: 450, quantity: 20 },
  { id: 220490249905, item_name: 'Moonstone Ring', metal_type: 'Platinum', weight: 10, price: 750, quantity: 12 },
  { id: 224348238236, item_name: 'Alexandrite Necklace', metal_type: 'Gold', weight: 21, price: 2200, quantity: 5 },
  { id: 243242472887, item_name: 'Coral Bracelet', metal_type: 'Silver', weight: 17, price: 500, quantity: 18 },
  { id: 199994032928, item_name: 'Agate Earrings', metal_type: 'Gold', weight: 8, price: 300, quantity: 20 },
  { id: 213994828288, item_name: 'Carnelian Pendant', metal_type: 'Silver', weight: 11, price: 350, quantity: 22 },
  { id: 319443263230, item_name: 'Obsidian Ring', metal_type: 'Gold', weight: 9, price: 500, quantity: 15 },
  { id: 655889011131, item_name: 'Rhodolite Necklace', metal_type: 'Platinum', weight: 22, price: 1800, quantity: 7 },
  { id: 303736464642, item_name: 'Tanzanite Bracelet', metal_type: 'Silver', weight: 13, price: 600, quantity: 18 },
  { id: 313141423343, item_name: 'Tourmaline Earrings', metal_type: 'Gold', weight: 5, price: 700, quantity: 10 },
  { id: 24246474774, item_name: 'Zircon Pendant', metal_type: 'Platinum', weight: 10, price: 850, quantity: 8 },
  { id: 35424848482, item_name: 'Morganite Ring', metal_type: 'Gold', weight: 12, price: 950, quantity: 10 },
  { id: 32428493496, item_name: 'Malachite Necklace', metal_type: 'Silver', weight: 17, price: 400, quantity: 18 },
  { id: 10399999317, item_name: 'Labradorite Bracelet', metal_type: 'Gold', weight: 15, price: 700, quantity: 20 },
  { id: 687383994438, item_name: 'Azurite Earrings', metal_type: 'Silver', weight: 6, price: 350, quantity: 25 },
  { id: 1388488484839, item_name: 'Kyanite Pendant', metal_type: 'Gold', weight: 8, price: 500, quantity: 12 },
  { id: 1318938914840, item_name: 'Sunstone Ring', metal_type: 'Platinum', weight: 11, price: 900, quantity: 15 },
  { id: 414234424244, item_name: 'Hematite Necklace', metal_type: 'Gold', weight: 19, price: 600, quantity: 18 },
  { id: 4242424242342, item_name: 'Iolite Bracelet', metal_type: 'Silver', weight: 14, price: 500, quantity: 22 },
  { id: 434322346524, item_name: 'Bloodstone Earrings', metal_type: 'Gold', weight: 5, price: 400, quantity: 20 },
  { id: 11311344444, item_name: 'Chrysoprase Pendant', metal_type: 'Silver', weight: 10, price: 350, quantity: 25 },
  { id: 988675656645, item_name: 'Jet Ring', metal_type: 'Gold', weight: 7, price: 450, quantity: 20 },

];

const Inventory = () => {
  const [items, setItems] = useState(dummyItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddItemClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const filteredItems = items.filter(item =>
    item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.metal_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.weight.toString().includes(searchTerm) ||
    item.id.toString().includes(searchTerm)
  );

  return (
    <div className="page inventory-page">
      <Sidebar />
      <div className="page-content inventory-content">
        <div className="inventory-header">
          <input
            type="text"
            placeholder="Search inventory..."
            className="search-bar"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="add-item-button" onClick={handleAddItemClick}>Add Item</button>
        </div>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Metal</th>
              <th>Weight</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.item_name}</td>
                <td>{item.metal_type}</td>
                <td>{item.weight}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onAddItem={handleAddItem} />
    </div>
  );
};

export default Inventory;
