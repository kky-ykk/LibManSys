import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false); // To track if form is successfully submitted
  const navigate = useNavigate(); // To redirect after successful login

  // Function to handle input change
  function getData(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!userData.email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(userData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Password validation
    if (!userData.password) {
      newErrors.password = "Password is required";
    }

    // Role validation
    if (!userData.role) {
      newErrors.role = "Role is required";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    
    if (Object.keys(formErrors).length === 0) {
        setErrors({}); // Clear previous errors
        console.log("userData :",userData);
      try {
        const response = await axios.post('http://localhost:3000/api/user/get', {
          email: userData.email,
          password: userData.password,
          role:userData.role
        });

        // console.log("response :",response);

        if (response.status === 200) {
          const data = response.data;
          // Store token and name in localStorage
          localStorage.setItem('session', JSON.stringify({ token: data.token, name: data.user.fullname,role:data.user.role }));
          // Navigate to home page
          navigate("/");
        } else {
          alert("Datas wrong");
        }
      } catch (error) {
        console.error('Axios error:', error);
        if (error.response && error.response.status === 401) {
          alert("Wrong email or password");
        } else {
          alert("An error occurred");
        }
      }
    } else {
      // Set the errors
      setErrors(formErrors);
      setSubmitted(false); // In case of form errors
    }
  };

  return (
    <>
      <div style={{padding:'30px',fontSize:"20px",fontWeight:'bold',background:"#212529"}}>
        <Link to="/">Home</Link>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100" style={{background:"#212529"}}>
        <div className="card p-4 shadow" style={{ width: "30rem" }}>
          <div className="card-body">
            <h4 className="card-title text-center mb-4">Log In</h4>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="inputEmail3">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail3"
                  placeholder="Email"
                  name="email"
                  value={userData.email}
                  onChange={getData}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email}</small>
                )}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="inputPassword3">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword3"
                  placeholder="Password"
                  name="password"
                  value={userData.password}
                  onChange={getData}
                />
                {errors.password && (
                  <small className="text-danger">{errors.password}</small>
                )}
              </div>

              <fieldset className="form-group mb-3">
                <legend>Role</legend>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="gridRadios1"
                    value="admin"
                    checked={userData.role === "Admin"}
                    onChange={getData}
                  />
                  <label className="form-check-label" htmlFor="gridRadios1">
                    Admin
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="role"
                    id="gridRadios2"
                    value="user"
                    checked={userData.role === "User"}
                    onChange={getData}
                  />
                  <label className="form-check-label" htmlFor="gridRadios2">
                    User
                  </label>
                </div>
                {errors.role && (
                  <small className="text-danger">{errors.role}</small>
                )}
              </fieldset>

              <div className="form-group text-center">
                <button type="submit" className="btn btn-primary w-100">
                  Sign In
                </button>
              </div>

              <div className="text-center m-2">
                <Link className="mt-3 text-primary m-3" to="/signup">
                  I'm new user
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
