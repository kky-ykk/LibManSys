import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [books, setBooks] = useState(null);

  async function getBooks() {
    try {
      const response = await axios.get("http://localhost:3000/api/book/getall");
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      {/* Carousel Section */}
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="2000"
        style={{ margin: "-2px" }}
      >
        <div className="carousel-inner">
          <div className="carousel-caption hero-text" style={{ zIndex: "9" }}>
            <h2 className="hero-text">
              Discover a world of knowledge in our extensive library of books.
            </h2>
          </div>
          {/* Carousel Images */}
          <div className="carousel-item active">
            <img
              src="https://png.pngtree.com/thumb_back/fw800/background/20220415/pngtree-open-old-book-in-school-library-with-blurry-bookshelves-photo-image_36027458.jpg"
              className="d-block w-100"
              style={{
                filter: "brightness(55%)",
                objectFit: "cover",
                height: "550px",
              }}
              alt="Books"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://png.pngtree.com/background/20230527/original/pngtree-an-old-bookcase-in-a-library-picture-image_2760144.jpg"
              className="d-block w-100"
              style={{
                filter: "brightness(55%)",
                objectFit: "cover",
                height: "550px",
              }}
              alt="Bookshelf"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.freepik.com/free-photo/realistic-books-shelf-library_23-2151359528.jpg"
              className="d-block w-100"
              style={{
                filter: "brightness(55%)",
                objectFit: "cover",
                height: "550px",
              }}
              alt="Library"
            />
          </div>
        </div>
      </div>

      {/* Book Cards Section */}
      <div className="container my-5">
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Books</h1>

        <div className="row d-flex justify-content-center">
          {books ? (
            books.map((book, idx) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex" key={idx}>
                <div className="card m-3 h-100 w-100">
                  <Link
                    to={localStorage.getItem("session") ? "/bookavailable" : "/signup"}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={book.imageUrl}
                      className="card-img-top"
                      alt={book.name}
                      style={{
                        // height: "270px",
                        objectFit: "cover",
                      }}
                    />
                  </Link>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{book.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">By {book.author}</h6>
                    <p className="card-text text-truncate" style={{ maxHeight: "3em" }}>
                      {book.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </div>
    </>
  );
}
