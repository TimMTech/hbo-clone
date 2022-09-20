import React, { useState } from "react";
import StepOne from "./StepOne/StepOne";
import StepThree from "./StepThree/StepThree";
import StepTwo from "./StepTwo/StepTwo";

interface Plan {
  ads: string;
  billing: string | undefined;
}

interface Input {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const PlanForm: React.FC = () => {
  const [plan, setPlan] = useState<Plan>({
    ads: "",
    billing: "",
  });

  const [subscribeValues, setSubscribeValues] = useState<Input>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep("3");
  };

  return (
    <div className="text-white lg:h-screen w-screen  mt-24 flex flex-col justify-center items-center">
      {plan.ads !== "" && plan.billing !== "" && (
        <div className="w-full max-w-[700px] flex justify-between items-center py-4 px-8 my-4 bg-gradient-to-r from-black to-purple-900 rounded-md">
          <span className="text-xl font-semibold">{plan.ads}</span>
          <span className="text-xl font-semibold">{plan.billing}</span>
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
      {step === "3" && <StepThree />}
    </div>
  );
};

export default PlanForm;
