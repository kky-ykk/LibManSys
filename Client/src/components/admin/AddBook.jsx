import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function AddBook() {
    const [bookData, setBookData] = useState({
        name: "",
        author: "",
        description: "",
        quantity: "",
        serialNumber: "",
        // imageUrl: "",
        procurementDate: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted Book Data:", bookData);

        const ress = await axios.post("http://localhost:3000/api/book/post", {
            name: bookData.name,
            author: bookData.author,
            description: bookData.description,
            quantity: bookData.quantity,
            serialNumber: bookData.serialNumber,
            imageUrl: bookData.imageUrl,
            procurementDate: bookData.procurementDate
        });

        // console.log("res:"+ress);

        if (ress.data.success) {
            alert("Book added successfully!");
        }

        setBookData({
            name: "",
            author: "",
            description: "",
            quantity: "",
            serialNumber: "",
            imageUrl: "",
            procurementDate: ""
        });

    };

    return (
        <div className="container">
            <h3>Add New Book</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={bookData.name}
                        onChange={handleChange}
                        placeholder="Enter book name"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        value={bookData.author}
                        onChange={handleChange}
                        placeholder="Enter author name"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={bookData.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        name="quantity"
                        value={bookData.quantity}
                        onChange={handleChange}
                        placeholder="Enter quantity"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Serial Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="serialNumber"
                        value={bookData.serialNumber}
                        onChange={handleChange}
                        placeholder="Enter serial number"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Date of Procurement</Form.Label>
                    <Form.Control
                        type="date"
                        name="procurementDate"
                        value={bookData.procurementDate}
                        onChange={handleChange}
                        placeholder="Enter Procurement Date"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="url"
                        name="imageUrl"
                        value={bookData.imageUrl}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}
