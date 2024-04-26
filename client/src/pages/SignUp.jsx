import { Label, TextInput, Button } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
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
            this is demo project . you can signup with your email and password
            or with google
          </p>
        </div>
        {/* right side */}

        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="your user name" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="your user email" />
              <TextInput type="text" placeholder="name@company.com" id="email" />
            </div>
            <div>
              <Label value="your user Password" />
              <TextInput type="text" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink">signUp</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account ?</span>
            <Link to="/sign-in" className="text-blue-500">
              SignIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
