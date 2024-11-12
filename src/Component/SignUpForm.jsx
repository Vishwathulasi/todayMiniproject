
// import React, { useState, useEffect } from 'react';
// import { FaEnvelope, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const SignupForm = () => {
//   const [fields, setFields] = useState({
//     email: '',
//     firstName: '',
//     lastName: '',
//     password: '',
//   });
//   const [passwordType, setPasswordType] = useState('password');

//     const togglePasswordVisibility = () => {
//       setPasswordType(passwordType === 'password' ? 'text' : 'password');
//     };
//   const [fieldErrors, setFieldErrors] = useState({});

// const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFields({ ...fields, [name]: value });

//     // Validate field based on your criteria
//     const isValid = value.trim() !== '';
//     setFieldErrors({ ...fieldErrors, [name]: !isValid });

//     // Validate email format
//     if (name === 'email') {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       setFieldErrors({ ...fieldErrors, email: !emailRegex.test(value) });
//     }
//   };

//   const handleSubmitButton = (e) => {
//     e.preventDefault();

  
//     const hasEmptyFields = Object.values(fields).some((value) => value.trim() === '');
//     if (hasEmptyFields) {
//       setFieldErrors({ ...fieldErrors, email: true, firstName: true, lastName: true, password: true });
//       return; 
//     }


//   };

//   useEffect(() => {
//     const name={}
//     // Check for empty fields and update errors
//     const hasEmptyFields = Object.values(fields).some((value) => value.trim() === '');
//     if (hasEmptyFields) {
//       setFieldErrors({ ...fieldErrors, [name]: true });
//     }
//   }, [fields]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-screen-md">
//         <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Get access now</h2>

//         <div className="flex flex-col space-y-8">
//           <div className="relative">
//             <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
//             <input type="email" name="email" placeholder="Email *" className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-lightblue-400" value={fields.email} onChange={handleChange} />
//             {fieldErrors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
//           </div>

//           <div className="flex space-x-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <FaUser className="absolute left-3 top-4 text-gray-400" />
//                 <input type="text" name="firstName" placeholder="First Name *" className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-lightblue-400" value={fields.firstName} onChange={handleChange} />
//                 {fieldErrors.firstName && <p className="text-red-500 text-sm mt-1">First Name is required</p>}
//               </div>
//             </div>
//             <div className="flex-1">
//               <input type="text" name="lastName" placeholder="Last Name *" className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-lightblue-400" value={fields.lastName} onChange={handleChange} />
//               {fieldErrors.lastName && <p className="text-red-500 text-sm mt-1">Last Name is required</p>}
//             </div>
//           </div>

//           <div className="relative">
//             <FaLock className="absolute left-3 top-4 text-gray-400" />
//             <input type={passwordType} name="password" placeholder="Password *" className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-lightblue-400" value={fields.password} onChange={handleChange} />
//             {fieldErrors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
//             {passwordType === 'password' ? (
//               <FaEye className="absolute right-3 top-4 text-gray-400" onClick={togglePasswordVisibility} />
//             ) : (
//               <FaEyeSlash className="absolute right-3 top-4 text-gray-400" onClick={togglePasswordVisibility} />
//             )}
//           </div>
//           <div class="flex justify-center">
//           <button className="w-1/3 py-3  bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 " onClick={handleSubmitButton}>Continue</button>
//           </div>
//           <p className="text-gray-600 text-center mt-4">Already have an account? <Link to={"/loginform"} className='text-red-600'>Login</Link></p>
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default SignupForm;
import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [fields, setFields] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const [passwordType, setPasswordType] = useState('password');
  const [fieldErrors, setFieldErrors] = useState({});

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });

    // Validate field based on your criteria
    let errors = { ...fieldErrors };
    errors[name] = value.trim() === '';

    // Validate email format
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errors.email = !emailRegex.test(value);
    }

    setFieldErrors(errors);
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();

    let errors = {};
    Object.keys(fields).forEach((name) => {
      const value = fields[name];
      errors[name] = value.trim() === '';

      // Additional validation for email
      if (name === 'email' && !errors.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errors.email = !emailRegex.test(value);
      }
    });

    setFieldErrors(errors);

    const hasErrors = Object.values(errors).some((error) => error === true);
    if (!hasErrors) {
      // Proceed with form submission logic
      console.log('Form submitted successfully:', fields);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-screen-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Get access now</h2>

        <div className="flex flex-col space-y-8">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              className={`w-full py-3 pl-10 pr-4 border rounded-lg focus:outline-none ${
                fieldErrors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              value={fields.email}
              onChange={handleChange}
            />
            {fieldErrors.email && <p className="text-red-500 text-sm mt-1">Invalid email</p>}
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <FaUser className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                  className={`w-full py-3 pl-10 pr-4 border rounded-lg focus:outline-none ${
                    fieldErrors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={fields.firstName}
                  onChange={handleChange}
                />
                {fieldErrors.firstName && <p className="text-red-500 text-sm mt-1">First Name is required</p>}
              </div>
            </div>
            <div className="flex-1">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                className={`w-full py-3 pl-10 pr-4 border rounded-lg focus:outline-none ${
                  fieldErrors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                value={fields.lastName}
                onChange={handleChange}
              />
              {fieldErrors.lastName && <p className="text-red-500 text-sm mt-1">Last Name is required</p>}
            </div>
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input
              type={passwordType}
              name="password"
              placeholder="Password *"
              className={`w-full py-3 pl-10 pr-4 border rounded-lg focus:outline-none ${
                fieldErrors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              value={fields.password}
              onChange={handleChange}
            />
            {fieldErrors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
            {passwordType === 'password' ? (
              <FaEye className="absolute right-3 top-4 text-gray-400" onClick={togglePasswordVisibility} />
            ) : (
              <FaEyeSlash className="absolute right-3 top-4 text-gray-400" onClick={togglePasswordVisibility} />
            )}
          </div>

          <div className="flex justify-center">
            <button
              className="w-1/3 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
              onClick={handleSubmitButton}
            >
              Continue
            </button>
          </div>
          <p className="text-gray-600 text-center mt-4">
            Already have an account? <Link to="/loginform" className="text-red-600">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
