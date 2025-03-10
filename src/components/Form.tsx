import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues, UseFormRegister, UseFormHandleSubmit } from "react-hook-form";
import Select from "./Select";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";

interface Pokemon {
  name: string;
  url: string;
}

interface FormData {
  firstName: string;
  lastName: string;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ mode: "onBlur" });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);
  const [showPokemonError, setShowPokemonError] = useState<boolean>(false);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results))
      .catch((err) => console.error("Error:", err));
  }, []);

  const updatedPokemonList = selectedPokemons.map((pokemon) => {
    const id = pokemon.url.split("/").filter(Boolean).pop(); // Extract ID from URL
    return {
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    if (selectedPokemons.length !== 4) {
      setShowPokemonError(true);
      return;
    }
    setIsModalOpen(true);
    setShowPokemonError(false);
    console.log(selectedPokemons);
  };
  
  const handleSave = () => {
    reset();
    setSelectedPokemons([]);
    setIsModalOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center border-2
        border-amber-50 rounded-lg bg-dark w-100 p-5 bg-amber-50 relative"
      >
        <h1 className="text-3xl mb-4 font-bold">Registration Form</h1>
        {/* Ім'я */}
        <Input
          name="firstName"
          placeholder="First Name"
          register={register}
          error={errors.firstName?.message}
          validation={{
            required: "First name is required",
            minLength: { value: 2, message: "Must be at least 2 characters" },
            maxLength: {
              value: 12,
              message: "Must be less than 12 characters",
            },
            pattern: { value: /^[A-Za-z]+$/, message: "Only letters allowed" },
          }}
        />

        {/* Прізвище */}
        <Input
          name="lastName"
          placeholder="Last Name"
          register={register}
          error={errors.lastName?.message}
          validation={{
            required: "Last name is required",
            minLength: { value: 2, message: "Must be at least 2 characters" },
            maxLength: {
              value: 12,
              message: "Must be less than 12 characters",
            },
            pattern: { value: /^[A-Za-z]+$/, message: "Only letters allowed" },
          }}
        />

        {/* Вибір команди */}
        <Select
          list={pokemonList}
          selectedList={selectedPokemons}
          setSelected={setSelectedPokemons}
        />

        <span className="text-red-500 text-sm mt-2 mb-2 min-h-5">
          {showPokemonError &&
            selectedPokemons.length !== 4 &&
            "You must select exactly 4 Pokemons "}
        </span>
        <Button size="lg">Submit</Button>
      </form>
      {isModalOpen && (
        <Modal
          list={updatedPokemonList}
          closeModal={() => setIsModalOpen(false)}
          handleSave={handleSave}
        />
      )}
    </>
  );
};

export default Form;
