import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OwnerComponent.css';

const OwnerComponent = () => {
  const [owners, setOwners] = useState([]);
  const [newOwner, setNewOwner] = useState({
    username: '',
    owner: '',
    ownerNumber: '',
    buzSocials: '',
    location: '',
    website: '',
    city: '',
    niche: ''
  });
  const [editOwner, setEditOwner] = useState(null);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      const response = await axios.get('http://localhost:3000/owner');
      setOwners(response.data);
    } catch (error) {
      console.error('Error fetching owners:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOwner((prevOwner) => ({
      ...prevOwner,
      [name]: value
    }));
  };

  const addOwner = async () => {
    try {
      const response = await axios.post('http://localhost:3000/owner', newOwner);
      setOwners((prevOwners) => [...prevOwners, response.data]);
      setNewOwner({
        username: '',
        owner: '',
        ownerNumber: '',
        buzSocials: '',
        location: '',
        website: '',
        city: '',
        niche: ''
      });
    } catch (error) {
      console.error('Error adding owner:', error);
    }
  };

  const deleteOwner = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/owner/${id}`);
      setOwners((prevOwners) => prevOwners.filter((owner) => owner._id !== id));
    } catch (error) {
      console.error('Error deleting owner:', error);
    }
  };

  const setEditMode = (owner) => {
    setEditOwner(owner);
  };

  const cancelEditMode = () => {
    setEditOwner(null);
  };

  const updateOwner = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/owner/${editOwner._id}`, editOwner);
      setOwners((prevOwners) =>
        prevOwners.map((owner) => (owner._id === response.data._id ? response.data : owner))
      );
      setEditOwner(null);
    } catch (error) {
      console.error('Error updating owner:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Owners</h1>

      <ul className="list-group">
        {owners.map((owner) => (
          <li className="list-group-item" key={owner._id}>
            <div className="owner-info">
              <h4>{owner.username}</h4>
              <p>
                <strong>Owner: </strong>
                {owner.owner}
              </p>
              <p>
                <strong>Owner Number: </strong>
                {owner.ownerNumber}
              </p>
              <p>
                <strong>Buz Socials: </strong>
                {owner.buzSocials}
              </p>
              <p>
                <strong>Location: </strong>
                {owner.location}
              </p>
              <p>
                <strong>Website: </strong>
                {owner.website}
              </p>
              <p>
                <strong>City: </strong>
                {owner.city}
              </p>
              <p>
                <strong>Niche: </strong>
                {owner.niche}
              </p>
              <div className="actions">
                <button className="btn btn-primary btn-sm" onClick={() => setEditMode(owner)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => deleteOwner(owner._id)}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="add-owner-form">
        <h2>Add Owner</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={newOwner.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Owner</label>
              <input
                type="text"
                className="form-control"
                name="owner"
                value={newOwner.owner}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Owner Number</label>
              <input
                type="text"
                className="form-control"
                name="ownerNumber"
                value={newOwner.ownerNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Buz Socials</label>
              <input
                type="text"
                className="form-control"
                name="buzSocials"
                value={newOwner.buzSocials}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={newOwner.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input
                type="text"
                className="form-control"
                name="website"
                value={newOwner.website}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={newOwner.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Niche</label>
              <input
                type="text"
                className="form-control"
                name="niche"
                value={newOwner.niche}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <button className="btn btn-success" onClick={addOwner}>
          Add Owner
        </button>
      </div>

      {editOwner && (
        <div className="edit-owner-form">
          <h2>Edit Owner</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={editOwner.username}
                  onChange={(e) => setEditOwner({ ...editOwner, username: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Owner</label>
                <input
                  type="text"
                  className="form-control"
                  name="owner"
                  value={editOwner.owner}
                  onChange={(e) => setEditOwner({ ...editOwner, owner: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Owner Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="ownerNumber"
                  value={editOwner.ownerNumber}
                  onChange={(e) => setEditOwner({ ...editOwner, ownerNumber: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Buz Socials</label>
                <input
                  type="text"
                  className="form-control"
                  name="buzSocials"
                  value={editOwner.buzSocials}
                  onChange={(e) => setEditOwner({ ...editOwner, buzSocials: e.target.value })}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={editOwner.location}
                  onChange={(e) => setEditOwner({ ...editOwner, location: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input
                  type="text"
                  className="form-control"
                  name="website"
                  value={editOwner.website}
                  onChange={(e) => setEditOwner({ ...editOwner, website: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={editOwner.city}
                  onChange={(e) => setEditOwner({ ...editOwner, city: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Niche</label>
                <input
                  type="text"
                  className="form-control"
                  name="niche"
                  value={editOwner.niche}
                  onChange={(e) => setEditOwner({ ...editOwner, niche: e.target.value })}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={updateOwner}>
            Update Owner
          </button>
          <button className="btn btn-secondary mx-1" onClick={cancelEditMode}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default OwnerComponent;
