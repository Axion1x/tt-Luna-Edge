import React from "react";
import { UseFormRegister, FieldValues, Path, RegisterOptions } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: string;
  validation?: RegisterOptions<T, Path<T>>;
  disabled?: boolean;
}

const Input = <T extends FieldValues>({
  name,
  placeholder,
  register,
  error,
  validation,
  disabled = false,
}: InputProps<T>) => {
  return (
    <div className="flex flex-col w-full relative mb-4">
      <span className="mb-1">{placeholder}</span>
      <input
        {...register(name, validation)}
        placeholder={"Input " + placeholder}
        disabled={disabled}
        className={`w-full bg-transparent border-2 p-2 rounded transition-colors hover:border-violet-700 focus:border-blue-700 outline-none
          ${error ? "border-red-500" : "border-gray-300"} 
          disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-500`}
      />
      {error && <span className="text-red-500 text-sm top-11">{error}</span>}
    </div>
  );
};

export default Input;
