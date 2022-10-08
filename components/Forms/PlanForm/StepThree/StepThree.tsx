import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { billingValidation } from "../../../../utils/yupConfig/yupConfig";
import { creditCardInput } from "../../../../utils/conversions/convert";

interface PaymentInput {
  cardName: string;
  cardNumber: string;
  exp: string;
  securityCode: string;
  zipCode: string;
  stateOrTerritory: string;
}

interface StepThreeProps {
  handlePaymentSubmit: (data: PaymentInput) => Promise<void>;
}

const StepThree: React.FC<StepThreeProps> = ({ handlePaymentSubmit }) => {
  const {
    register,

    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<PaymentInput>({
    mode: "onChange",
    resolver: yupResolver(billingValidation),
  });

  return (
    <form
      onSubmit={handleSubmit(handlePaymentSubmit)}
      action="POST"
      className="md:p-0 text-white flex flex-col justify-center items-center h-full w-full max-w-[700px] p-4 gap-5"
    >
      <h1 className="text-3xl font-medium">Add a Payment Method</h1>
      <p className="text-center">
        Start streaming your favorite movies by adding your payment method
      </p>
      <div className="flex flex-col w-full gap-5">
        <input
          {...register("cardName", {
            required: true,
          })}
          name="cardName"
          className="outline-none border-b-white/30 border-b-2 rounded-none"
          type="text"
          placeholder="Name on Card"
        />
        {errors?.cardName && touchedFields?.cardName && (
          <p className="text-sm text-red-800">{errors?.cardName.message}</p>
        )}
        <input
          {...register("cardNumber", {
            required: true,
            onChange: (e) => {
              creditCardInput(e)
            },
          })}
          name="cardNumber"
          className="outline-none border-b-white/30 border-b-2 rounded-none"
          type="text"
          placeholder="Card Number"
          maxLength={19}
        />
        {errors?.cardNumber && touchedFields?.cardNumber && (
          <p className="text-sm text-red-800">{errors?.cardNumber.message}</p>
        )}
      </div>
      <div className="flex w-full gap-5">
        <input
          {...register("exp", {
            required: true,
          })}
          name="exp"
          className="w-full outline-none border-b-white/30 border-b-2 rounded-none"
          type="text"
          placeholder="Expiration Date"
          maxLength={5}
        />
        {errors?.exp && touchedFields?.exp && (
          <p className="text-sm text-red-800">{errors?.exp.message}</p>
        )}
        <input
          {...register("securityCode", {
            required: true,
          })}
          name="securityCode"
          className="w-full outline-none border-b-white/30 border-b-2 rounded-none"
          type="text"
          placeholder="Security Code"
          maxLength={3}
        />
        {errors?.securityCode && touchedFields?.securityCode && (
          <p className="text-sm text-red-800">{errors?.securityCode.message}</p>
        )}
      </div>
      <div className="flex w-full gap-5">
        <input
          {...register("zipCode", {
            required: true,
          })}
          name="zipCode"
          className="w-full outline-none border-b-white/30 border-b-2 rounded-none"
          type="text"
          placeholder="ZIP Code"
          maxLength={5}
        />
        {errors?.zipCode && touchedFields?.zipCode && (
          <p className="text-sm text-red-800">{errors?.zipCode.message}</p>
        )}
        <input
          {...register("stateOrTerritory", {
            required: true,
          })}
          name="stateOrTerritory"
          className="w-full outline-none border-b-white/30 border-b-2 rounded-none"
          type="text"
          placeholder="State or Territory"
          maxLength={2}
        />
        {errors?.stateOrTerritory && touchedFields?.stateOrTerritory && (
          <p className="text-sm text-red-800">
            {errors?.stateOrTerritory.message}
          </p>
        )}
      </div>
      <div className="flex flex-col items-center justify-center p-6  ">
        <h2 className="text-2xl font-semibold py-2 text-center">
          First 7 days free, then $14.99/month{" "}
        </h2>
        <p className="md:max-w-[600px] text-center max-w-[300px] py-3">
          After your free trial ends, you&amp;ll be charged $14.99/month plus
          applicable taxes. Your subscription will auto-renew each month unless
          you cancel before the renewal. To change or cancel your subscription,
          see Billing Information in your profile settings.{" "}
          <strong>Start Your Subscription</strong> below to move forwards if you
          confirm.
        </p>
        <button className="hover:bg-purple-600 text-xl font-semibold bg-purple-800 w-full max-w-[300px] py-3 shadow-zinc-600 shadow-lg rounded-3xl">
          START YOUR SUBSCRIPTION
        </button>
      </div>
    </form>
  );
};

export default StepThree;
