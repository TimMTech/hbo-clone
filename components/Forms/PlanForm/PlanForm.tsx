import React, { useState } from "react";
import { useRouter } from "next/router";
import StepOne from "./StepOne/StepOne";
import StepThree from "./StepThree/StepThree";
import StepTwo from "./StepTwo/StepTwo";

interface Plan {
  ads: string;
  billing: string | undefined;
}

interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface PaymentInput {
  user_id: string | undefined;
  cardName: string;
  cardNumber: string;
  exp: string;
  securityCode: string;
  zipCode: string;
  stateOrTerritory: string;
}

const PlanForm: React.FC = () => {
  const router = useRouter();

  const [plan, setPlan] = useState<Plan>({
    ads: "",
    billing: "",
  });

  const [subscribeValues, setSubscribeValues] = useState<UserInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [paymentValues, setPaymentValues] = useState<PaymentInput>({
    user_id: "",
    cardName: "",
    cardNumber: "",
    exp: "",
    securityCode: "",
    zipCode: "",
    stateOrTerritory: "",
  });

  const [step, setStep] = useState<string>("1");

  const handlePlanSelection = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target instanceof HTMLElement) {
      const {
        dataset: { price },
        id,
      } = e.currentTarget;

      if (step === "1") {
        setPlan({
          ads: id,
          billing: price,
        });
        setStep("2");
      }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLElement) {
      const { name, value } = e.target;
      setSubscribeValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLElement) {
      const { name, value } = e.target;
      setPaymentValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...subscribeValues, ...plan }),
    })
      .then((response) => {
        if (!response.ok) console.log("Server Error Occurred");
        return response.json();
      })
      .then((data) => {
        setStep("3");
        setPaymentValues((prevState) => ({
          ...prevState,
          user_id: data._id,
          cardName: "",
          cardNumber: "",
          exp: "",
          securityCode: "",
          zipCode: "",
          stateOrTerritory: "",
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePaymentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("/api/users/billing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentValues),
    })
      .then((response) => {
        if (!response.ok) console.log("Server Error Occurred");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        router.push("/auth/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="  text-white w-screen h-full mt-24 flex flex-col justify-center items-center">
      {Object.values(plan).every((value) => value !== "") && (
        <div className="w-full  max-w-[700px] flex flex-col gap-4 py-4 px-8 my-4 bg-gradient-to-r from-black to-purple-900 rounded-md">
          <div className="w-full flex justify-between items-center">
            <span className="text-xl font-semibold">{plan.ads}</span>
            <span className="text-xl font-semibold">{plan.billing}</span>
          </div>
          {Object.values(subscribeValues).every((value) => value !== "") &&
            step === "3" && (
              <div className="w-full flex justify-between items-center">
                <span className="text-xl font-semibold">
                  {subscribeValues.firstName} {subscribeValues.lastName}
                </span>
                <span className="text-xl font-semibold">
                  {subscribeValues.email}
                </span>
              </div>
            )}
        </div>
      )}
      <span>STEP {step} OF 3</span>

      {step === "1" && <StepOne handlePlanSelection={handlePlanSelection} />}
      {step === "2" && (
        <StepTwo
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          subscribeValues={subscribeValues}
        />
      )}
      {step === "3" && (
        <StepThree
          handlePaymentChange={handlePaymentChange}
          handlePaymentSubmit={handlePaymentSubmit}
          paymentValues={paymentValues}
        />
      )}
    </div>
  );
};

export default PlanForm;
