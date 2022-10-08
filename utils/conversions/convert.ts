import React from "react";

interface Options {
  year: string | any;
  month: string | any;
  day: string | any;
}

export const convertRuntime = (runtime: number) => {
  let hours = Math.floor(runtime / 60);
  let minutes = runtime % 60;
  if (hours === 0) {
    return minutes + " MIN";
  }
  return hours + " HR " + minutes + " MIN ";
};

export const convertAge = (date: string) => {
  let birthDate = new Date(date);
  let today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() == birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    return age--;
  }
  return age;
};

export const convertDOB = (date: string) => {
  let birthDay = new Date(date);
  let options: Options = { year: "numeric", month: "short", day: "numeric" };
  return birthDay.toLocaleDateString("en-US", options);
};

export const creditCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target instanceof HTMLElement) {
    if (e.target.name === "cardNumber") {
      let regex = e.target.value.split("-").join("");
      if (regex.length > 0) {
        return (e.target.value = regex.match(/.{1,4}/g)!.join("-"));
      }
    }
    if (e.target.name === "exp") {
      let regex = e.target.value.split("/").join("");
      if (regex.length > 0) {
        return (e.target.value = regex.match(/.{1,2}/g)!.join("/"));
      }
    }
  }
};
