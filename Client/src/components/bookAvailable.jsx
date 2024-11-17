import { useEffect, useState } from "react";
import Footer from "../shared/footer";
import NavBar from "../shared/navBar/navBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BookAvailable() {
    const navigate = useNavigate();
    const [author, setAuthor] = useState("");
    const [books, setBooks] = useState("");

    const [sbook, setsbook] = useState("");
    const [allAuthors, setAllAuthors] = useState([]); // Books details are stored here

    async function getBookByAuthor() {
        let ress = await axios.post("http://localhost:3000/api/book/get", {
            author: author
        });

        setBooks(ress.data.books);
    }

    async function getAllAuthors() {
        let ress = await axios.get("http://localhost:3000/api/book/getall");
        setAllAuthors(ress.data.books);
    }

    useEffect(() => {
        getAllAuthors();
        getBookByAuthor();
    }, [author]);

    // Extract unique authors
    const uniqueAuthors = [...new Set(allAuthors.map(book => book.author))];

    return (
        <>
            <NavBar />

            <div className="containerr">
                <h3 className="my-3 text-center">Check Book availability</h3>

                <div className="childContainer my-3 p-3 text-center" style={{ height: "30vh" }}>
                    <label htmlFor="author">Select Author Name</label>
                    <select
                        name="author"
                        id="author"
                        onChange={(e) => setAuthor(e.target.value)}
                    >
                        <option value="">Select Author</option>
                        {uniqueAuthors.map((authorName, idx) => (
                            <option key={idx} value={authorName}>
                                {authorName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="booksContainer">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Book Name</th>
                                <th scope="col">Author Name</th>
                                <th scope="col">Serial Number</th>
                                <th scope="col">Available</th>
                                <th scope="col">Select to issue book</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!books ? (
                                <h3>Loading ...</h3>
                            ) : (
                                books.map((book, idx) => (
                                    <tr key={idx}>
                                        <th scope="row">{idx + 1}</th>
                                        <td>{book.name}</td>
                                        <td>{book.author}</td>
                                        <td>{book.serialNumber}</td>
                                        <td>{book.quantity > 0 ? "Yes" : "No"}</td>
                                        {
                                            book.quantity==0?"":
                                            <td>
                                                <input
                                                    type="radio"
                                                    name="selectedBook"
                                                    onClick={() => setsbook(book.name)}
                                                    />
                                            </td>
                                        }
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => navigate("/bookissue/" + sbook)}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
