import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

export default function AddUser() {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/user/post", userData);
      alert("User added successfully");
      setUserData({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "user",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="container">
      <h3>Add New User</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullname"
            value={userData.fullname}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Admin"
            name="role"
            checked={userData.role === "admin"}
            onChange={(e) =>
              setUserData((prevData) => ({
                ...prevData,
                role: e.target.checked ? "admin" : "user",
              }))
            }
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add User
        </Button>
      </Form>
    </div>
  );
}
