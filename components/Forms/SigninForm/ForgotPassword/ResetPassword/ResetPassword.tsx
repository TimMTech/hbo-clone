import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import {newPasswordValidation} from "../../../../../utils/yupConfig/yupConfig"

interface PasswordValue {
    password: string;
}

interface ResetPasswordProps {
    handleNewPasswordSubmit: (data: PasswordValue) => Promise<void>;
    handleCancelReset: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({handleNewPasswordSubmit, handleCancelReset}) => {
    const {
      register,
      handleSubmit,
      formState: { errors, touchedFields, isValid },
    } = useForm<PasswordValue>({
      mode: "onChange",
      resolver: yupResolver(newPasswordValidation),
    });

   
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col  w-full h-full bg-black p-6 z-[99]">
      <h1 className="text-4xl font-semibold">Enter New Password</h1>
      <form onSubmit={handleSubmit(handleNewPasswordSubmit)} action="POST" className="flex flex-col gap-8">
        <input
          {...register("password", {
            required: true,
            minLength: 6,
          })}
          name="password"
          placeholder="New Password"
          className="outline-0 border-b-2 rounded-none text-2xl"
          type="password"
        />
        {errors?.password && touchedFields?.password && (
          <p className="text-sm text-red-800">{errors?.password.message}</p>
        )}
        <div className="flex items-center gap-4">
          <button
          type="submit"
            className={`${
              !isValid && "pointer-events-none filter brightness-50"
            } hover:bg-black hover:border-2 hover:border-purple-600 border-2 border-transparent font-semibold px-8 py-2 bg-button-gray rounded-sm`}
          >
            OK
          </button>
          <button type="button" onClick={handleCancelReset} className="hover:bg-black hover:border-2 hover:border-purple-600 border-2 border-transparent font-semibold px-8 py-2 bg-button-gray rounded-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
