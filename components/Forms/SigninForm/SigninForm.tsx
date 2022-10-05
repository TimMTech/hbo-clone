import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface SigninValues {
  email: string;
  password: string;
}

const SigninForm: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [error, setError] = useState<boolean>(false);

  const [signinValues, setSigninValues] = useState<SigninValues>({
    email: "",
    password: "",
  });

  const handleSigninChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSigninValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSigninSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let options = { redirect: false, ...signinValues };
    const res = await signIn("credentials", options);
    if (res?.error) {
      setError(true);
    } else {
      console.log("logged in");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push({
        pathname: `/user/${session?.user._id}`,
      });
    }
  }, [router, session?.user._id, status]);

  return (
    <div className="text-white flex flex-col justify-center items-center w-screen h-full mt-16 mb-4">
      <h1 className="text-3xl pt-10 pb-6">Sign In</h1>
      <form
        onSubmit={handleSigninSubmit}
        action="POST"
        className="md:w-[75%]  flex flex-col justify-center md:bg-gradient-to-b from-gray-900 via-purple-900/30  to-indigo-900/20  w-full max-w-[900px] py-10 px-20 rounded-md"
      >
        <div className="flex flex-col gap-4 ">
          <p>Do you have an HBO Max Account?</p>
          <input
            name="email"
            type="text"
            placeholder="Email Address"
            value={signinValues.email}
            onChange={(e) => handleSigninChange(e)}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={signinValues.password}
            onChange={(e) => handleSigninChange(e)}
          />
        </div>
        <div className="flex gap-6 py-10">
          <button className="hover:bg-black hover:border-2 hover:border-purple-600 border-2 border-transparent px-10 py-3 bg-button-gray rounded-md">
            SIGN IN
          </button>
          <button className="text-sm text-violet-400/80">
            Forgot Password?
          </button>
        </div>
        <p className={`${error ? "opacity-100  text-red-500" : "opacity-0"}`}>
          Incorrect Email or Password
        </p>
        <div className="flex items-center gap-5 pb-10">
          <div className="w-full border-b-[1px] border-white/20"></div>
          OR
          <div className="w-full border-b-[1px] border-white/20"></div>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <p>Do you have a Google account?</p>
          <button
            type="button"
            className="hover:bg-black hover:border-2 hover:border-purple-600 border-2 border-transparent px-6 py-3 my-3 bg-button-gray rounded-md"
          >
            SIGN IN WITH GOOGLE
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
