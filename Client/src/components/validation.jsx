export default function Validation(values) {
    const errors = {};
  
    // Regular expressions
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,15}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,20}$/;
    const phonePattern = /^[789]\d{9}$/;
  
    // Name validation
    if (values.fullName === "") {
      errors.fullName = "Name is required";
    }
  
    // Email validation
    if (values.email === "") {
      errors.email = "Email is required";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "Enter a valid email address";
    }
  
    // Phone number validation
    if (values.phoneNumber === "") {
      errors.phoneNumber = "Phone number is required";
    } else if (!phonePattern.test(values.phoneNumber)) {
      errors.phoneNumber = "Enter a valid phone number starting with 7, 8, or 9 and of length 10";
    }
  
    // Password validation
    if (values.password === "") {
      errors.password = "Password is required";
    } else if (!passwordPattern.test(values.password)) {
      errors.password = "Password must have at least one uppercase, one lowercase, one special symbol, and be 8-20 characters long";
    }
  
    // Role validation
    if (!values.role) {
      errors.role = "Please select a role";
    }
  
    return errors;
  }
  