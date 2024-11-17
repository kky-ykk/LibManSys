import { useNavigate, useParams } from "react-router-dom";
import Footer from "../shared/footer";
import NavBar from "../shared/navBar/navBar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookIssue() {

  const name = useParams().id;
  const navigate=useNavigate();


  // console.log("iddd:", name);

  const [book, setBook] = useState();
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  async function getBook() {
    const ress = await axios.post("http://localhost:3000/api/book/get", {
      name: name
    });
    setBook(ress.data.books[0]);
  }

  useEffect(() => {
    getBook();
  }, []);

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (returnDate < issueDate) {
      alert("Return date cannot be before the issue date.");
    } else {

      // Handle the form submission logic
      const ress = await axios.post("http://localhost:3000/api/issueBook/post", {
        name: name,
        bookId:book._id,
        issueDate,
        returnDate
      },{
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("session")).token}` // Passing the token in the Authorization header
        }
      });
      // console.log("Form submitted res:",ress);

      if (ress.status === 200) {
        // Navigate to home page
        navigate("/");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        {!book ? <h3>Book Issuing...</h3> :
          (<form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Book Name</label>
              <input type="text" className="form-control" value={book.name} disabled />
            </div>
            <div className="mb-3">
              <label className="form-label">Author Name</label>
              <input type="text" className="form-control" value={book.author} disabled />
            </div>
            <div className="mb-3">
              <label className="form-label">Issue Date</label>
              <input
                type="date"
                className="form-control"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                min={today} // Ensure the issue date is not before today
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Return Date</label>
              <input
                type="date"
                className="form-control"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={issueDate || today} // Ensure the return date is not before the issue date
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>)
        }
      </div>
      <Footer />
    </>
  );
}
