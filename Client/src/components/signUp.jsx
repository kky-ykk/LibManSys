import { useState } from "react";
import Validation from "./validation";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({}); // Error state
  const [showPassword, setShowPassword] = useState(false); // Password visibility state

  // Function to handle input changes
  function getData(e) {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value, // Update the specific field in the userData state
    });
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = Validation(userData); // Validate form data
    setErrors(validationErrors); // Set errors if any

    if (Object.keys(validationErrors).length === 0) {
      // console.log("Form submitted successfully", userData); 

      try {
        const response = await axios.post('http://localhost:3000/api/user/post', {
          fullname: userData.fullName,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
          password: userData.password,
          role: userData.role
        });

        // console.log("response", response.status);

        if (response.status === 201) {
          alert("Register successfully!");
          navigate("/login");
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.error("There was an error!", error);
        alert("Error in data!");
      }


    } else {
      console.log("Validation failed", validationErrors); // Show validation errors
    }
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div style={{ padding: '30px', fontSize: "20px", fontWeight: 'bold', background: "#212529" }}>
        <Link to="/">Home</Link>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: "#212529" }}>
        <div className="card p-4 shadow" style={{ width: "30rem" }}>
          <div className="card-body">
            <h4 className="card-title text-center mb-4">Sign In</h4>
            <form onSubmit={handleSubmit}>
              {/* Full Name Input */}
              <div className="form-group mb-3">
                <label htmlFor="inputFullName">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputFullName"
                  name="fullName"
                  placeholder="Full name"
                  value={userData.fullName}
                  onChange={getData}
                />
                {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
              </div>

              {/* Email Input */}
              <div className="form-group mb-3">
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={getData}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>

              {/* Phone Number Input */}
              <div className="form-group mb-3">
                <label htmlFor="inputPhone">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputPhone"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={userData.phoneNumber}
                  onChange={getData}
                />
                {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
              </div>

              {/* Password Input with Toggle Button */}
              <div className="form-group mb-3 position-relative">
                <label htmlFor="inputPassword">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="inputPassword"
                  name="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={getData}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="btn btn-outline-secondary btn-sm position-absolute"
                  style={{ right: "10px", top: "28px" }}
                >
                  {showPassword ? "Hide" : "Show"} {/* Toggle button text */}
                </button>
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>

              {/* Role (Radio Buttons) */}
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
                {errors.role && <small className="text-danger">{errors.role}</small>}
              </fieldset>

              {/* Submit Button */}
              <div className="form-group text-center">
                <button type="submit" className="btn btn-primary w-100">
                  Sign In
                </button>
              </div>
              <div className="text-center m-2">
                <Link className="mt-3 text-primary m-3" to="/login">
                  Already have account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
