import React, { useState } from "react";
import { useRouter } from "next/router";
import StepOne from "./StepOne/StepOne";
import StepThree from "./StepThree/StepThree";
import StepTwo from "./StepTwo/StepTwo";

//*MUST FIX CSS TO MIX WELL WITH FORM ERRORS *//

interface Plan {
  ads: string;
  billing: string | undefined;
}
interface User_id {
  user_id: string;
}

interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface PaymentInput {
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
  const [userId, setUserId] = useState<User_id>({ user_id: "" });

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

  const handleFormSubmit = async (subscribeValues: UserInput) => {
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
        setUserId({
          user_id: data._id,
        });
        setStep("3");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePaymentSubmit = async (paymentValues: PaymentInput) => {
    fetch("/api/users/billing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...paymentValues, ...userId }),
    })
      .then((response) => {
        if (!response.ok) console.log("Server Error Occurred");
        return response.json();
      })
      .then(() => {
        router.push("/auth/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" text-white w-screen h-full mt-24 flex flex-col justify-center items-center">
      <span>STEP {step} OF 3</span>

      {step === "1" && <StepOne handlePlanSelection={handlePlanSelection} />}
      {step === "2" && <StepTwo handleFormSubmit={handleFormSubmit} />}
      {step === "3" && <StepThree handlePaymentSubmit={handlePaymentSubmit} />}
    </div>
  );
};

export default PlanForm;
