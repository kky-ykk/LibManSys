import { Link } from "react-router-dom";
import Footer from "../shared/footer";
import NavBar from "../shared/navBar/navBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap"; 

export default function MyBooks() {
  const [issuedBooks, setIssuedBook] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showReturn, setShowReturn] = useState(false);

  // Function to fetch books
  const getMyBooks = async () => {
    const ress = await axios.get("http://localhost:3000/api/issueBook/get", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("session")).token}`
      }
    });
    setIssuedBook(ress.data.issuedBooks);
  };

  // Modal handlers
  const handleClose = () => setShowModal(false);
  const handleShow = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleReturnClose = () => setShowReturn(false);
  const handleReturnShow = (book) => {
    setSelectedBook(book);
    setShowReturn(true);
  };

  //----fine calculations
  const calculateDifference = (date1,date2) => {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    // Get the difference in time (milliseconds)
    const timeDifference = Math.abs(secondDate - firstDate);

    // Convert time difference from milliseconds to days
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return (dayDifference>15)?dayDifference*100:0;
  };

  //pay & return book 
  async function returnBook(id) {

    const ress = await axios.delete("http://localhost:3000/api/issueBook/delete", {
        data: { id: id }  
    });
    setShowReturn(false);
    alert("Tranasction Successfull!");
    getMyBooks();
  }


  useEffect(() => {
    getMyBooks();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container" style={{ height: "71vh" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Book Name</th>
              <th scope="col">Author Name</th>
              <th scope="col">Issue Date</th>
              <th scope="col">Return Date</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((ibook, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to="#" onClick={() => handleShow(ibook)}>
                    {ibook.bookId?.[0]?.name || "No Name"}
                  </Link>
                </td>
                <td>{ibook.bookId?.[0]?.author || "No Author"}</td>
                <td>{ibook.issueDate?.split("T")[0] || "No Issue Date"}</td>
                <td>{ibook.returnDate?.split("T")[0] || "No Return Date"}</td>
                <td>
                  <Link to="#" onClick={() => handleReturnShow(ibook)}>
                    Return
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Book Details */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBook ? (
            <div className="card">
              <div className="card-body">
                <div style={{height:"300px",width:"200px",textAlign:"center"}}>
                  <img src={selectedBook.bookId?.[0]?.imageUrl} alt="" style={{height:'100%',width:'100%'}}/>
                </div>
                <h5 className="card-title">{selectedBook.bookId?.[0]?.name || "No Name"}</h5>
                <p className="card-text"><strong>Author:</strong> {selectedBook.bookId?.[0]?.author || "No Author"}</p>
                <p className="card-text"><strong>Description:</strong> {selectedBook.bookId?.[0]?.description || "No description available"}</p>
              </div>
            </div>
          ) : (
            <p>Loading book details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Returning Books */}
      <Modal show={showReturn} onHide={handleReturnClose}>
        <Modal.Header closeButton>
          <Modal.Title>Return Book And Pay Fine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBook ? (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{selectedBook.bookId?.[0]?.name || "No Name"}</h5>
                <p className="card-text"><strong>Author:</strong> {selectedBook.bookId?.[0]?.author || "No Author"}</p>
                <p className="card-text"><strong>Serial Number:</strong> {selectedBook.bookId?.[0]?.serialNumber || "No Serial Number"}</p>
                <p className="card-text"><strong>Issue Date:</strong> {selectedBook.issueDate?.split("T")[0] || "No Issue Date"}</p>
                <p className="card-text"><strong>Return Date:</strong> {selectedBook.returnDate?.split("T")[0] || "No Return Date"}</p>
                <p className="card-text"><strong>Fine amount:</strong> {
                    
                    calculateDifference(selectedBook.returnDate?.split("T")[0],selectedBook.issueDate?.split("T")[0])
                    
                    }</p>

              </div>
              <div style={{textAlign:"center"}}>
                <button type="button" className="btn btn-primary" onClick={()=>returnBook(selectedBook._id)}>Pay & Return</button>
              </div>
            </div>

          ) : (
            <p>Loading book details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReturnClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
}
