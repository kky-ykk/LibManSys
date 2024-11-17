import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

export default function UpdateBook() {
  const [books, setBooks] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Fetch all books on component mount
  useEffect(() => {
    async function getBooks() {
      try {
        const response = await axios.get("http://localhost:3000/api/book/getall");
        setBooks(response.data.books); 
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    getBooks();
  }, []);

  // Open modal and set the selected book for editing
  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // Update book details
  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:3000/api/book/update`,{ ...selectedBook});
      // Refresh book list after updating
      const updatedBooks = books.map((book) =>
        book._id === selectedBook._id ? selectedBook : book
      );
      setBooks(updatedBooks);
      setShowModal(false); 
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Handle changes in the modal inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };



  return (
    <div className="container">
      <h3>Book List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            {/* <th>Description</th> */}
            <th>Quantity</th>
            <th>Serial Number</th>
            {/* <th>Image</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => (
            <tr key={book._id}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              {/* <td>{book.description}</td> */}
              <td>{book.quantity}</td>
              <td>{book.serialNumber}</td>
              {/* <td>
                <img src={book.imageUrl} alt={book.name} width="50" />
              </td> */}
              <td>
                <Button variant="warning" onClick={() => handleEdit(book)}>
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for updating book */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBook && (
            <Form>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={selectedBook.name}
                  onChange={handleChange}
                />
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={selectedBook.quantity}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={selectedBook.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="url"
                  name="imageUrl"
                  value={selectedBook.imageUrl}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
