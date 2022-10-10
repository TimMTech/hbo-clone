import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signinValidation } from "../../../utils/yupConfig/yupConfig";

import EmailVerification from "./ForgotPassword/EmailVerification/EmailVerification";
import ResetPassword from "./ForgotPassword/ResetPassword/ResetPassword";

interface SigninValues {
  email: string;
  password: string;
}

interface EmailVerify {
  email: string;
}

interface NewPasswordValue {
  password: string;
}

const SigninForm: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<SigninValues>({
    mode: "onChange",
    resolver: yupResolver(signinValidation),
  });

  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);
  const [forgotCredentials, setForgotCredentials] = useState<boolean>(false);

  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [userId, setUserId] = useState<object>({
    user_id: "",
  });

  const [error, setError] = useState<boolean>(false);

  const handleForgotPassword = () => {
    setForgotCredentials(true);
  };

  const handleCancelReset = () => {
    setValidEmail(false);
    setForgotCredentials(false);
    setError(false)
  };

  const handleSigninSubmit = async (signinValues: SigninValues) => {
    let options = { redirect: false, ...signinValues };
    const res = await signIn("credentials", options);
    if (res?.error) {
      setInvalidCredentials(true);
    } else {
      setInvalidCredentials(false);
    }
  };

  const handleEmailRecoverySubmit = async (emailValues: EmailVerify) => {
    await fetch("/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...emailValues }),
    })
      .then((response) => {
        if (!response.ok) setError(true);
        return response.json();
      })
      .then((data) => {
        if (data) {
          setUserId({
            userId: data._id,
          });
          setValidEmail(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleNewPasswordSubmit = async (
    newPasswordValue: NewPasswordValue
  ) => {
    await fetch("/api/forgot-password/new-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newPasswordValue, ...userId }),
    })
      .then((response) => {
        if (!response.ok) console.log("error");
        return response.json();
      })
      .then(() => {
        setForgotCredentials(false);
      })
      .catch((error) => console.log(error));
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
      {forgotCredentials && (
        <EmailVerification
          handleEmailRecoverySubmit={handleEmailRecoverySubmit}
          handleCancelReset={handleCancelReset}
          error={error}
        />
      )}
      {validEmail && forgotCredentials && (
        <ResetPassword
          handleNewPasswordSubmit={handleNewPasswordSubmit}
          handleCancelReset={handleCancelReset}
        />
      )}
      <h1 className="text-3xl pt-10 pb-6">Sign In</h1>
      <form
        onSubmit={handleSubmit(handleSigninSubmit)}
        action="POST"
        className="md:w-[75%] flex flex-col justify-center md:bg-gradient-to-b from-gray-900 via-purple-900/30  to-indigo-900/20  w-full max-w-[900px] py-10 px-20 rounded-md"
      >
        <div className="flex flex-col gap-4 ">
          <p>Do you have an HBO Max Account?</p>
          {invalidCredentials && (
            <p className="text-red-500 bg-red-800/20 rounded-md py-3 px-2">
              The email address or password is incorrect. Please try again.
            </p>
          )}
          <input
            {...register("email", {
              required: true,
            })}
            name="email"
            type="text"
            placeholder="Email Address"
          />
          {errors?.email && touchedFields?.email && (
            <p className="text-sm text-red-800">{errors?.email.message}</p>
          )}

          <input
            {...register("password", { required: true, minLength: 6 })}
            name="password"
            type="password"
            placeholder="Password"
          />
          {errors?.password && touchedFields?.password && (
            <p className="text-sm text-red-800">{errors?.password.message}</p>
          )}
        </div>

        <div className="flex gap-6 py-10">
          <button
            type="submit"
            className={`
             ${!isValid && "pointer-events-none filter brightness-50"}
             hover:bg-black hover:border-2 hover:border-purple-600 border-2 border-transparent px-10 py-3 bg-button-gray rounded-md`}
          >
            SIGN IN
          </button>
          <button
            onClick={handleForgotPassword}
            type="button"
            className="text-sm text-violet-400/80"
          >
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
