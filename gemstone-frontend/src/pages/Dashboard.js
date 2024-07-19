// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/styles.css';

const Dashboard = () => {
  const [recentActivities, setRecentActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);

  useEffect(() => {

    setTotalValue(45345);
    setPendingOrders(12);
    setLowStockItems(3);

    setRecentActivities([
      { id: 1, text: 'Purchased 50 gold rings from Gold Supplier for $5000' },
      { id: 2, text: 'Updated inventory - added 30 silver bracelets' },
      { id: 3, text: 'Price update - Gold increased by 1.5%' },
      { id: 4, text: 'Purchased 20 diamond necklaces from Diamond Supplier for $20000' },
      { id: 5, text: 'Updated inventory - added 20 diamond necklaces' },
      { id: 6, text: 'New order #5679 - $2,150' },
      { id: 7, text: 'Updated inventory - added 10 platinum rings' },
    ]);

    setNotifications([
      { id: 1, text: 'Low stock alert: Platinum rings' },
      { id: 2, text: 'New price updates available' },
      { id: 3, text: '5 invoices pending approval' },
      { id: 4, text: 'Low stock alert: Ruby earrings' },
    ]);
  }, []);

  return (
    <div className="page dashboard-page">
      <Sidebar />
      <div className="page-content dashboard-content">
        <div className="highlight-boxes">
          <div className="highlight-box total-value">Total Inventory Value: ${totalValue.toLocaleString()}</div>
          <div className="highlight-box pending-orders">Pending Orders: {pendingOrders}</div>
          <div className="highlight-box low-stock">Low Stock Items: {lowStockItems}</div>
        </div>
        <div className="activity-sections">
          <div className="recent-activity">
            <h2>Recent Activity</h2>
            {recentActivities.map(activity => (
              <p key={activity.id}>{activity.text}</p>
            ))}
          </div>
          <div className="notifications">
            <h2>Notifications</h2>
            {notifications.map(notification => (
              <p key={notification.id}>{notification.text}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;







