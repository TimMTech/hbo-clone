interface StepThreeProps {
  paymentValues: {
    user_id: string | undefined;
    cardName: string;
    cardNumber: string;
    exp: string;
    securityCode: string;
    zipCode: string;
    stateOrTerritory: string;
  };
  handlePaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const StepThree: React.FC<StepThreeProps> = ({
  paymentValues,
  handlePaymentChange,
  handlePaymentSubmit,
}) => {
  return (
    <form
      onSubmit={handlePaymentSubmit}
      method="POST"
      className="md:p-0 text-white flex flex-col justify-center items-center h-full w-full max-w-[700px] p-4 gap-5"
    >
      <h1 className="text-3xl font-medium">Add a Payment Method</h1>
      <p className="text-center">
        Start streaming your favorite movies by adding your payment method
      </p>
      <div className="flex flex-col w-full gap-5">
        <input
          name="cardName"
          className="outline-none border-b-white/30 border-b-2 rounded-none"
          type="text"
          placeholder="Name on Card"
          onChange={(e) => handlePaymentChange(e)}
          value={paymentValues.cardName}
          required
        />
        <input
          name="cardNumber"
          className="outline-none border-b-white/30 border-b-2 rounded-none"
          type="text"
          placeholder="Card Number"
          onChange={(e) => handlePaymentChange(e)}
          value={paymentValues.cardNumber}
          maxLength={16}
          required
        />
      </div>
      <div className="flex w-full gap-5">
        <input
          name="exp"
          className="w-full outline-none border-b-white/30 border-b-2 rounded-none"
          type="text"
          placeholder="Expiration Date"
          onChange={(e) => handlePaymentChange(e)}
          value={paymentValues.exp}
          maxLength={5}
          required
        />
        <input
          name="securityCode"
          className="w-full outline-none border-b-white/30 border-b-2 rounded-none"
          type="text"
          placeholder="Security Code"
          onChange={(e) => handlePaymentChange(e)}
          value={paymentValues.securityCode}
          maxLength={3}
          required
        />
      </div>
      <div className="flex w-full gap-5">
        <input
          name="zipCode"
          className="w-full outline-none border-b-white/30 border-b-2 rounded-none"
          type="text"
          placeholder="ZIP Code"
          onChange={(e) => handlePaymentChange(e)}
          value={paymentValues.zipCode}
          maxLength={5}
          required
        />
        <input
          name="stateOrTerritory"
          className="w-full outline-none border-b-white/30 border-b-2 rounded-none"
          type="text"
          placeholder="State or Territory"
          onChange={(e) => handlePaymentChange(e)}
          value={paymentValues.stateOrTerritory}
          maxLength={2}
          required
        />
      </div>
      <div className="flex flex-col items-center justify-center p-6 mb-5  ">
        <h2 className="text-2xl font-semibold py-2">
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
