export default function Footer() {
    return (
      <>
        <div style={{ margin: 0, background: "#212529" }}>
          <div className="container">
            <footer className="py-3 ">
              <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item">
                  <a href="#" className="nav-link px-2" style={{ color: "white" }}>
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link px-2" style={{ color: "white" }}>
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link px-2" style={{ color: "white" }}>
                    Pricing
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link px-2" style={{ color: "white" }}>
                    FAQs
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link px-2" style={{ color: "white" }}>
                    About
                  </a>
                </li>
              </ul>
              <p className="text-center" style={{ color: "white" }}>
                © 2022 Company, Inc
              </p>
            </footer>
          </div>
        </div>
      </>
    );
  }
  