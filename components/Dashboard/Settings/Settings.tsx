//* WORK ON SAVING FIRST NAME AND LAST NAME AS FULL NAME*//

import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  settingsEmailValidation,
  settingsPasswordValidation,
  settingsFullNameValidation
} from "../../../utils/yupConfig/yupConfig";

interface SettingValues {
  email: string;
  password: string;
  fullName: string;
}

interface SettingsProps {
  user: any;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const router = useRouter();

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: {
      errors: errorsEmail,
      touchedFields: touchedFieldsEmail,
      isValid: isValidEmail,
    },
  } = useForm<SettingValues>({
    mode: "onChange",
    resolver: yupResolver(settingsEmailValidation),
  });
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: {
      errors: errorsPassword,
      touchedFields: touchedFieldsPassword,
      isValid: isValidPassword,
    },
  } = useForm<SettingValues>({
    mode: "onChange",
    resolver: yupResolver(settingsPasswordValidation),
  });
  const {
    register: registerFullName,
    handleSubmit: handleFullNameSubmit,
    formState: {
      errors: errorsFullName,
      touchedFields: touchedFieldsFullName,
      isValid: isValidFullName,
    },
  } = useForm<SettingValues>({
    mode: "onChange",
    resolver: yupResolver(settingsFullNameValidation),
  });

  

  const [openEmailInput, setOpenEmailInput] = useState<boolean>(false);
  const [openPasswordInput, setOpenPasswordInput] = useState<boolean>(false);
  const [openNameInput, setOpenNameInput] = useState<boolean>(false);

  const handleEmailInputOpen = () => {
    setOpenEmailInput(!openEmailInput);
  };
  const handlePasswordInputOpen = () => {
    setOpenPasswordInput(!openPasswordInput);
  };
  const handleNameInputOpen = () => {
    setOpenNameInput(!openNameInput);
  };

  const handleChangeEmail = async (emailValue: SettingValues) => {
    await fetch(`/api/users/${user._id}/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...emailValue }),
    })
      .then((response) => {
        if (!response.ok) console.log("error");
        return response.json();
      })
      .then(() => {
        router.push(`/user/${user._id}`);
      })
      .catch((error) => console.log(error));
  };

  const handleChangePassword = async (passwordValue: SettingValues) => {
    await fetch(`/api/users/${user._id}/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...passwordValue }),
    })
      .then((response) => {
        if (!response.ok) console.log("error");
        return response.json();
      })
      .then(() => {
        router.push(`/user/${user._id}`);
      })
      .catch((error) => console.log(error));
  };

  const handleChangeName = async (fullNameValue: SettingValues) => {
    await fetch(`/api/users/${user._id}/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...fullNameValue }),
    })
      .then((response) => {
        if (!response.ok) console.log("error");
        return response.json();
      })
      .then(() => {
        router.push(`/user/${user._id}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-full text-white gap-4 px-3 mt-16 mb-4">
      <h1 className="text-3xl font-semibold pt-10 pb-6">Settings</h1>
      <div className="flex flex-col w-full max-w-[800px] rounded-md bg-gradient-to-b from-gray-900 via-purple-900/30  to-indigo-900/20 ">
        <h2 className="text-2xl font-semibold p-8">Account</h2>
        <div className="flex items-center justify-between border-b border-b-white/10 px-8">
          <div className="pb-3">
            <h3>Email Address</h3>
            <p className="text-sm">{user.email}</p>
            {openEmailInput && (
              <form
                action="PUT"
                onSubmit={handleEmailSubmit(handleChangeEmail)}
                className="flex items-center mt-1 gap-4"
              >
                <input
                  {...registerEmail("email", { required: true })}
                  name="email"
                  type="text"
                  className="h-[35px] w-full rounded-sm "
                ></input>
                {errorsEmail?.email && touchedFieldsEmail?.email && (
                  <p className="text-red-800 text-sm">
                    {errorsEmail?.email.message}
                  </p>
                )}
                <button
                  className={`
             ${!isValidEmail && "pointer-events-none filter brightness-50"}
             hover:bg-black hover:border-2 hover:border-purple-600 border-2 border-transparent px-10 py-1 bg-button-gray rounded-md`}
                >
                  Save
                </button>
              </form>
            )}
          </div>
          <FiEdit
            onClick={handleEmailInputOpen}
            size={25}
            className="cursor-pointer text-white/70"
          />
        </div>
        <div className="flex items-center justify-between border-b border-b-white/10 px-8">
          <div className="py-3">
            <h3>Password</h3>
            <p className="text-sm">*********</p>
            {openPasswordInput && (
              <form
                action="PUT"
                onSubmit={handlePasswordSubmit(handleChangePassword)}
                className="flex items-center mt-1 gap-4"
              >
                <input
                  {...registerPassword("password", {
                    minLength: 6,
                  })}
                  name="password"
                  type="password"
                  className="h-[35px] w-full mt-2 rounded-sm"
                ></input>
                {errorsPassword?.password &&
                  touchedFieldsPassword?.password && (
                    <p className="text-red-800 text-sm">
                      {errorsPassword?.password.message}
                    </p>
                  )}
                <button
                  className={`
             ${!isValidPassword && "pointer-events-none filter brightness-50"}
             hover:bg-black hover:border-2 hover:border-purple-600 border-2 border-transparent px-10 py-1 bg-button-gray rounded-md`}
                >
                  Save
                </button>
              </form>
            )}
          </div>
          <FiEdit
            onClick={handlePasswordInputOpen}
            size={25}
            className="cursor-pointer text-white/70"
          />
        </div>
        <div className="flex items-center justify-between px-8">
          <div className="pt-3 pb-8">
            <h3>Name</h3>
            <p>
              {user.firstName} {user.lastName}
            </p>
            {openNameInput && (
              <form
                action="PUT"
                onSubmit={handleFullNameSubmit(handleChangeName)}
                className="flex items-center mt-1 gap-4"
              >
                <div className="flex flex-col">
                  <input
                    {...registerFullName("fullName")}
                    name="fullName"
                    type="text"
                    className="h-[35px] w-full mt-2 rounded-sm"
                  ></input>
                </div>
                {errorsFullName?.fullName &&
                  touchedFieldsFullName?.fullName && (
                    <p className="text-red-800 text-sm">
                      {errorsFullName?.fullName.message}
                    </p>
                  )}
                <button
                  className={`
             ${!isValidFullName && "pointer-events-none filter brightness-50"}
             hover:bg-black hover:border-2 hover:border-purple-600 border-2 border-transparent px-10 py-1 bg-button-gray rounded-md`}
                >
                  Save
                </button>
              </form>
            )}
          </div>
          <FiEdit
            onClick={handleNameInputOpen}
            size={25}
            className="cursor-pointer text-white/70"
          />
        </div>
      </div>
      <div className="flex flex-col w-full max-w-[800px] rounded-md bg-gradient-to-b from-gray-900 via-purple-900/30  to-indigo-900/20 ">
        <h2 className="text-2xl font-semibold p-8">Subscription</h2>
        <div className="flex flex-col pb-8">
          <p className="text-sm px-8 w-[480px]">
            Your subscription will expire when you delete your account. See
            subsciption details.
          </p>
          <div className="flex flex-col gap-2 p-8 flex-1 ">
            <div className="text-xl text-center font-semibold bg-black border-2 border-purple-800 py-3">
              {user.billing}
            </div>
            <div className="text-xl text-center font-semibold bg-black border-2 border-purple-800 py-3">
              {user.ads}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
