import React, { useState } from "react";
import StepOne from "./StepOne/StepOne"

interface Plan {
  ads: string ;
  billing: string | undefined;
}

const PlanForm: React.FC  = () => {
  const [plan, setPlan] = useState<Plan>({
      ads: "",
      billing: "",
    });
    console.log(plan)
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

  return (
    <div className="text-white lg:h-screen  w-screen mt-24 flex flex-col justify-center items-center">
      <span>STEP {step} OF 3</span>
      {plan.ads !== "" && plan.billing !== "" && (
        <div className="w-full max-w-[700px] flex justify-between items-center py-4 px-8 my-4 bg-gradient-to-r from-black to-purple-900 rounded-md">
        <span className="text-xl font-semibold">{plan.ads}</span>
        <span className="text-xl font-semibold">{plan.billing}</span>
      </div>
      )}
      {step === "1" && <StepOne handlePlanSelection={handlePlanSelection} />}
    </div>
  );
};

export default PlanForm;
