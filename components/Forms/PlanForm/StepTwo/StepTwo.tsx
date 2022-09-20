import React from "react";

interface StepTwoProps {
  subscribeValues: {
    firstName: string,
    lastName: string,
    email: string,
    password: string
  } ,
    handleFormChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
    handleFormSubmit: (e:React.FormEvent<HTMLFormElement>) => void
}


const StepTwo: React.FC<StepTwoProps> = ({subscribeValues, handleFormChange, handleFormSubmit}) => {
  return (
    <form
      onSubmit={handleFormSubmit}
      action=""
      className="md:p-0 text-white flex flex-col justify-start items-center w-full h-full max-w-[700px] p-4 gap-5"
    >
      <h1 className="text-3xl font-medium">Create Your Account</h1>
      <p className="text-center w-full max-w-[450px]">
        You are one step closer to enjoying the best entertainment that HBO Max
        has to offer
      </p>
      <div className=" flex w-full gap-5 max-w-[700px]">
        <input
          className="w-full outline-none border-b-white/30 border-b-2 rounded-none"
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={(e) => handleFormChange(e)}
          value={subscribeValues.firstName}
          required
        />
        <input
          className="w-full outline-none border-b-white/30 border-b-2 rounded-none"
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={(e) => handleFormChange(e)}
          value={subscribeValues.lastName}
          required
        />
      </div>
      <div className=" flex flex-col w-full max-w-[700px]  gap-5 ">
        <input
          className="w-full outline-none border-b-white/30 border-b-2 rounded-none"
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={(e) => handleFormChange(e)}
          value={subscribeValues.email}
          required
        />
        <input
          className="w-full outline-none border-b-white/30 border-b-2 rounded-none"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleFormChange(e)}
          value={subscribeValues.password}
          required
        />
      </div>
      <div className=" flex flex-col  items-center justify-center bg-gradient-to-br from-purple-900/90 via-black to-purple-900/50 p-6 mb-5 rounded-md gap-4">
        <p className="text-sm ">
          By clicking Create Account, you confirm that you are 18 or over, you
          agree to the Terms of Use, and you acknowledge that you have read our
          Privacy Policy. You further acknowledge that we will send you
          marketing, promotions and other offers from HBO Max and its Affiliates
          via email, social media and other channels. If you create a Kids&apos;
          Profile, you agree to the processing of personal information collected
          via that profile as described in the Privacy Policy, if such consent
          is required where you live.
        </p>
        <button className="hover:bg-purple-600 text-xl font-semibold bg-purple-800 w-full max-w-[300px] py-3 shadow-zinc-600 shadow-lg rounded-3xl">
          CREATE ACCOUNT
        </button>
      </div>
    </form>
  );
};

export default StepTwo;
