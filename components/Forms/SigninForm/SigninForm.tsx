import React, { useState } from "react";

const SigninForm: React.FC = () => {
  interface SignupValues {
    email: string;
    password: string;
  }

  const [signupValues, setSignupValues] = useState<SignupValues>({
    email: "",
    password: "",
  });

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="text-white flex flex-col justify-center items-center w-screen h-screen">
      <h1 className="text-3xl pt-10 pb-6">Sign In</h1>
      <form
        action="POST"
        className="md:w-[75%]  flex flex-col justify-center md:bg-gradient-to-b from-gray-900 via-purple-900/30  to-indigo-900/20 h-[70%] w-full max-w-[900px] px-20 rounded-md"
      >
        <div className="flex flex-col gap-4 ">
          <p>Do you have an HBO Max Account?</p>
          <input
            name="email"
            type="text"
            placeholder="Email Address"
            value={signupValues.email}
            onChange={(e) => handleSignupChange(e)}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={signupValues.password}
            onChange={(e) => handleSignupChange(e)}
          />
        </div>
        <div className="flex gap-6 py-10">
          <button className="px-10 py-3 bg-white/5 rounded-md">SIGN IN</button>
          <button className="text-sm text-violet-400/80">
            Forgot Password?
          </button>
        </div>
        <div className="flex items-center gap-5 pb-10">
          <div className="w-full border-b-[1px] border-white/20"></div>
          OR
          <div className="w-full border-b-[1px] border-white/20"></div>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <p>Do you have a Google account?</p>
          <button className="px-6 py-3 my-3 bg-gray-600/40 rounded-md">
            SIGN IN WITH GOOGLE
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
