import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  //create the piece of state for empty object
  const [formData, setFormData] = useState({});
  //piece of state for error message
  const [errorMessage, setErrorMessage] = useState(null);
  // for loading
  const [loading, setLoading] = useState(false);
  //  initialize navigation
  const navigate = useNavigate();

  //function for getting data from form
  const handleChange = (e) => {
    //track the values form the form
    // console.log(e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData);
  };

  //function for submit the data in the database
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage("please fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //  console.log(data);
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      //navigate
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side */}

        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 via-cyan-500 to-pink-500 rounded-lg text-white">
              Bansal's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            this is demo project . you can signIn with your email and password
            or with google
          </p>
        </div>
        {/* right side */}

        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label value="your Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="your  Password" />
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
                // autocomplete="current-password"
              />
            </div>
            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm">
                    <span className="pl-3">Loading...</span>
                  </Spinner>
                </>
              ) : (
                "signIn"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't Have an account ?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
