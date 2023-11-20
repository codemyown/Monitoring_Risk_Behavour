  import React, { useState, useEffect } from 'react';
  import './App.css';

  const data = {
    pending: [
      { id: 1, name: 'Ajay Pawar', behavior: 'High Risk' },
      { id: 2, name: 'Vijay Pawar', behavior: 'Medium Risk' },
      // Add more pending users as needed
    ],
    completed: [
      { id: 3, name: 'User 3', behavior: 'Low Risk' },
      { id: 4, name: 'User 4', behavior: 'High Risk' },
      { id: 5, name: 'User 5', behavior: 'High Risk' },
      // Add more completed users as needed
    ],
  };

  const App = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data.pending);
    const [newUserName, setNewUserName] = useState('');
    const [newUserBehavior, setNewUserBehavior] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);

    

    useEffect(() => {
      const filtered = data[activeTab].filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }, [activeTab, searchQuery]);

    const handleTabChange = (tab) => {
      setActiveTab(tab);
      setSearchQuery(''); 
      setSelectedUserId(null);
    };

    const handleAddUser = () => {
      const newUser = {
        id: data[activeTab].length + 1,
        name: newUserName,
        behavior: newUserBehavior,
      };

      data[activeTab] = [...data[activeTab], newUser];
      setFilteredData(data[activeTab]);
      setNewUserName('');
      setNewUserBehavior('');
    };

    const handleUpdateUser = () => {
      const updatedData = data[activeTab].map((user) =>
        user.id === selectedUserId
          ? { ...user, name: newUserName, behavior: newUserBehavior }
          : user
      );

      data[activeTab] = updatedData;
      setFilteredData(updatedData);
      setNewUserName('');
      setNewUserBehavior('');
      setSelectedUserId(null);
    };

    const handleEditClick = (userId) => {
      const selectedUser = data[activeTab].find((user) => user.id === userId);
      setNewUserName(selectedUser.name);
      setNewUserBehavior(selectedUser.behavior);
      setSelectedUserId(userId);
    };

    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="sidebar">
              <h3>Add New User</h3>
              <div className="mb-3">
                <label htmlFor="newUserName" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  id="newUserName"
                  className="form-control"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newUserBehavior" className="form-label">
                  Behavior:
                </label>
                <input
                  type="text"
                  id="newUserBehavior"
                  className="form-control"
                  value={newUserBehavior}
                  onChange={(e) => setNewUserBehavior(e.target.value)}
                />
              </div>
              {selectedUserId ? (
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateUser}
                >
                  Update User
                </button>
              ) : (
                <button className="btn btn-success" onClick={handleAddUser}>
                  Add User
                </button>
              )}
            </div>
          </div>
          <div className="col-md-9">
            <div className="heading">
              <h1 className="text">Monitoring</h1>
            </div>
            <div className="tabs">
              <button
                className={`btn ${activeTab === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleTabChange('pending')}
              >
                Pending
              </button>
              <button
                className={`btn ${activeTab === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleTabChange('completed')}
              >
                Completed
              </button>
            </div>
            <input
              type="text"
              placeholder="Search users..."
              className="form-control mt-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="dashboard mt-3">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Behavior</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.behavior}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          onClick={() => handleEditClick(user.id)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default App;
