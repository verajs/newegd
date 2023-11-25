// App.jsx
import React from "react";
import Lists from "./Lists.jsx";
import Sidebar from "./Sidebar.jsx";
import './App.css'; // Import CSS for styling
import Loading from './Loading';
function App() {
  const links = [
    { label: 'SHIPMENTS', url: '/' },
    { label: 'ORDERS', url: '/profile' },
    { label: 'SETTINGS', url: '/settings' },
    // Add more links as needed
  ];
  return (
    <div>
      <div className="app-container">

        <Sidebar links={links} />
        <div className="app-main">
          <main className="app-content">
            <Lists />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
