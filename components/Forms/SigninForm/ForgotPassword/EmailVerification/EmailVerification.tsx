import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { recoveryValidation } from "../../../../../utils/yupConfig/yupConfig";


interface EmailValue {
  email: string;
}

interface EmailVerificationProps {
  handleEmailRecoverySubmit: (data: EmailValue) => Promise<void>;
  handleCancelReset: () => void;
  error: boolean;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({handleEmailRecoverySubmit, handleCancelReset, error}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<EmailValue>({
    mode: "onChange",
    resolver: yupResolver(recoveryValidation),
  });

 

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center bg-black/50">
      <form
        action="POST"
        onSubmit={handleSubmit(handleEmailRecoverySubmit)}
        className="md:h-[350px] md:w-[560px] md:gap-4 wabsolute flex flex-col justify-center items-start gap-3 bg-[rgb(25,25,25)] rounded-md  h-[290px] w-[450px] z-[98] px-10"
      >
        <h1 className="md:text-2xl text-lg font-semibold">
          Reset Your Password
        </h1>
        {error && (
          <p className="text-red-500 bg-red-800/20 rounded-md py-3 px-2 w-full">
            Email not found.
          </p>
        )}
        <p className="md:text-xl text-white">
          Enter your HBO Max email and we will reset your password.
        </p>
        <input
          {...register("email", {
            required: true,
          })}
          name="email"
          type="text"
          placeholder="Email Address"
          className="w-full"
        />
        {errors?.email && touchedFields?.email && (
          <p className="text-sm text-red-800">{errors?.email.message}</p>
        )}
        <div className="flex justify-center items-center gap-6">
          <button
            type="submit"
            className={`${
              !isValid && "pointer-events-none filter brightness-50"
            } hover:bg-black hover:border-2 hover:border-purple-600 border-2 border-transparent font-semibold px-8 py-2 bg-button-gray rounded-sm`}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancelReset}
            className="hover:bg-black hover:border-2 hover:border-purple-600 border-2 border-transparent font-semibold px-8 py-2 bg-button-gray rounded-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailVerification;
