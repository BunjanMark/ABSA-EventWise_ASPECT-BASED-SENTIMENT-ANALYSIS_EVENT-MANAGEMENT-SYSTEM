import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { IoArrowBack } from 'react-icons/io5'; // Import the necessary icons
import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io';

const Equipment = () => {
  const location = useLocation();
  const [inventoryData, setInventoryData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [newItemCount, setNewItemCount] = useState("");
  const [removeMode, setRemoveMode] = useState(false);
  const [itemsToRemove, setItemsToRemove] = useState([]);
  const eventId = location.state?.eventId;
  const navigate = useNavigate(); 
  const fetchInventory = useCallback(async () => {
    if (!eventId) {
      console.error("Event ID is not defined.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/api/equipment?event_id=${eventId}`);
      setInventoryData(response.data);
    } catch (error) {
      console.error("Error fetching inventory data:", error.response?.data || error.message);
    }
  }, [eventId]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const handleAddItem = async () => {
    if (newItem.trim() && newItemCount > 0 && eventId) {
      try {
        await axios.post('http://localhost:8000/api/equipment', {
          item: newItem.trim(),
          number_of_items: parseInt(newItemCount),
          number_of_sort_items: 0,
          status: "",
          event_id: eventId
        });
        fetchInventory();
        resetNewItemInputs();
      } catch (error) {
        console.error("Error adding the item:", error.response?.data || error.message);
      }
    } else {
      console.error("Please provide a valid item name and count.");
    }
  };

  const resetNewItemInputs = () => {
    setNewItem("");
    setNewItemCount("");
    setModalVisible(false);
  };

  const handleRemoveItem = (equip_id) => {
    setItemsToRemove(prevItems => 
      prevItems.includes(equip_id) 
        ? prevItems.filter(item => item !== equip_id) 
        : [...prevItems, equip_id]
    );
  };

  const handleRemoveModeToggle = () => {
    setRemoveMode(prev => !prev);
  };

  const totalItems = inventoryData.reduce((sum, item) => sum + item.number_of_items, 0);
  const totalBroken = inventoryData.filter(item => item.status === "Broken").length;
  const totalMissing = inventoryData.filter(item => item.status === "Missing").length;

  const handleIncrementSortItem = async (equip_id, currentSortItems) => {
    if (!equip_id) return;

    const updatedSortItems = currentSortItems + 1; // Increment by 1
    
    await updateSortItemsInDB(equip_id, updatedSortItems); // Send update to backend
};


const handleDecrementSortItem = async (equip_id, currentSortItems) => {
  if (!equip_id) return;

  const updatedSortItems = Math.max(0, currentSortItems - 1); // Decrement by 1 but no lower than 0
  
  await updateSortItemsInDB(equip_id, updatedSortItems); // Send update to backend
};


const updateSortItemsInDB = async (equip_id, number_of_sort_items) => {
  try {
      await axios.put(`http://localhost:8000/api/equipment/${equip_id}`, {
          number_of_sort_items, // The updated value
          event_id: eventId
      });
      fetchInventory(); // Refresh the inventory after the update
  } catch (error) {
      console.error("Error updating sort items:", error.response?.data || error.message);
  }
};


  return (
    <div className="equipment-container">
      <header className="header-equipment">
  <button className="back-button-equipment" onClick={() => navigate('/events')}>
    <IoArrowBack size={32} color="#eeba2b" />
  </button>
  <h1 className="header-text-equipment">
    <span className="header-highlight">Equipment</span> Tracker
  </h1>
</header>
<hr className="header-line" />



      <div className="table-container-equipment">
        <div className="table-equipment">
          <div className="table-header-equipment">
            <div className="table-header-cell-equipment">ITEMS</div>
            <div className="table-header-cell-equipment">NO. OF ITEMS</div>
            <div className="table-header-cell-equipment">NO. OF SORT ITEMS</div>
            <div className="table-header-cell-equipment">STATUS</div>
          </div>
          {inventoryData.map((item) => (
            !itemsToRemove.includes(item.equip_id) && (
              <div key={item.equip_id} className="table-row-equipment">
                {removeMode && (
                  <button 
                    className="remove-button-equipment" 
                    onClick={() => handleRemoveItem(item.equip_id)}>
                    <IoMdRemoveCircle size={24} color="red" />
                  </button>
                )}
                <div className="table-cell-equipment">{item.item}</div>
                <div className="table-cell-equipment">{item.number_of_items}</div>
                <div className="table-cell-equipment">
                  <button 
                    className="sort-button" 
                    onClick={() => handleDecrementSortItem(item.equip_id, item.number_of_sort_items)}>
                    <IoMdRemoveCircle size={24} color="black" />
                  </button>
                  {item.number_of_sort_items}
                  <button 
                    className="sort-button" 
                    onClick={() => handleIncrementSortItem(item.equip_id, item.number_of_sort_items)}>
                    <IoMdAddCircle size={24} color="black" />
                  </button>
                </div>
                <div className="table-cell-equipment" style={{ color: item.status === "Broken" ? 'red' : 'black' }}>
                  {item.status}
                </div>
              </div>
            )
          ))}
          <button className="add-button-equipment" onClick={() => setModalVisible(true)}>
            <IoMdAddCircle size={24} color="white" />
            <span>Add Item</span>
          </button>
          <button className="remove-button-equipment" onClick={handleRemoveModeToggle}>
            <IoMdRemoveCircle size={24} color="white" />
            <span>{removeMode ? 'Cancel Remove' : 'Remove Item'}</span>
          </button>
        </div>

        <div className="summary-equipment">
          <div className="summary-text-equipment">Total Items: {totalItems}</div>
          <div className="summary-text-equipment">Total Items Broken: {totalBroken}</div>
          <div className="summary-text-equipment">Total Items Missing: {totalMissing}</div>
        </div>
      </div>

      {modalVisible && (
        <div className="modal-overlay-equipment">
          <div className="modal-content-equipment">
            <button className="close-button-equipment" onClick={() => setModalVisible(false)}>×</button>
            <h2 className='modal-title-equipment'>Add New Item</h2>
            <div className="modal-input-group-equipment">
              <label>Name of Item</label>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Enter item name"
              />
            </div>
            <div className="modal-input-group-equipment">
              <label>No. of Items</label>
              <input
                type="number"
                value={newItemCount}
                onChange={(e) => setNewItemCount(e.target.value)}
                placeholder="Enter number of items"
                min="1"
              />
            </div>
            <button className="modal-button-equipment" onClick={handleAddItem}>Add Item</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipment;
