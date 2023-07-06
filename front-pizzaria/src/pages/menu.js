"use client";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import backgroundImage from "../../public/MenuImage.jpg";
import Select from "react-select";

const selectStyle = {
  control: (base) => ({
    ...base,
    border: "0 !important",
    // This line disable the blue border
    boxShadow: "0 !important",
    "&:hover": {
      border: "0 !important",
    },
  }),
};

export default function Menu() {
  const urlApi = "https://041b-177-99-123-24.ngrok-free.app";
  function requestProducts() {
    const axios = require("axios");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${urlApi}/products`,
      headers: { "ngrok-skip-browser-warning": "69420" },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function requestFlavors() {
    const axios = require("axios");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${urlApi}/flavors`,
      headers: { "ngrok-skip-browser-warning": "69420" },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setFlavorsList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [flavorsList, setFlavorsList] = useState([]);
  const [flavorList1, setFlavorList1] = useState([]);
  const [flavorList2, setFlavorList2] = useState([]);
  const [selectedFlavor1, setSelectedFlavor1] = useState("");
  const [selectedFlavor2, setSelectedFlavor2] = useState("");
  useEffect(() => {
    requestProducts();
    requestFlavors();
  }, []);

  function handleChangeFlavor1(e) {
    setSelectedFlavor1(e.value);
  }

  function handleChangeFlavor2(e) {
    setSelectedFlavor2(e.value);
  }

  const onClickPlusTwoFlavor = () => {
    setTwoFlavorList((prevItems) => {
      let foundTwoFlavors = false;
      const updatedItems = prevItems.map((item) => {
        if (
          item.selected.some(
            (pizza) =>
              pizza.flavor1 === selectedFlavor1 &&
              pizza.flavor2 === selectedFlavor2 &&
              selectedFlavor1 !== "" &&
              selectedFlavor2 !== ""
          )
        ) {
          // Se os dois sabores já estiverem selecionados, incrementa a quantidade
          return {
            ...item,
            quantity: item.quantity + 1,
            selected: item.selected.map((pizza) => {
              if (
                pizza.flavor1 === selectedFlavor1 &&
                pizza.flavor2 === selectedFlavor2
              ) {
                foundTwoFlavors = true;
                return { ...pizza, quantity: pizza.quantity + 1 };
              }
              return pizza;
            }),
          };
        }
        return item;
      });

      if (
        !foundTwoFlavors &&
        selectedFlavor1 !== "" &&
        selectedFlavor2 !== ""
      ) {
        // Se os dois sabores não forem encontrados, adiciona uma nova linha
        updatedItems.map((item) => {
          item.selected.push({
            flavor1: selectedFlavor1,
            flavor2: selectedFlavor2,
            quantity: 0,
          });
          return { ...pizza, quantity: pizza.quantity + 1 };
        });
      }

      return updatedItems;
    });
  };

  const onClickMinusTwoFlavor = (itemId) => {
    setTwoFlavorList((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.quantity > 0) {
          if (
            item.selected.some(
              (pizza) =>
                pizza.flavor1 === selectedFlavor1 &&
                pizza.flavor2 === selectedFlavor2 &&
                pizza.quantity > 0
            )
          ) {
            // Se os dois sabores já estiverem selecionados, decrementa a quantidade
            return {
              ...item,
              quantity: item.quantity - 1,
              selected: item.selected.map((pizza) => {
                if (
                  pizza.flavor1 === selectedFlavor1 &&
                  pizza.flavor2 === selectedFlavor2 &&
                  pizza.quantity > 0
                ) {
                  return { ...pizza, quantity: pizza.quantity - 1 };
                }
                return pizza;
              }),
            };
          }
        }
        return item;
      });
      return updatedItems;
    });
  };

  /*const [listItems, setListItems] = useState([
    { product_id: 1, image_link: "Pizza1.PNG", name: "Pizza 1", description: "Lista de ingredientes da pizza 1, que devem ser listados de forma que sobre caracteres para testar o overflow.", price: 22, quantity: 0, size:"M", selected: {"M": 0, "G": 0, "GG": 0}},
    { product_id: 2, image_link: "Pizza2.PNG", name: "Pizza 2", description: "Lista de ingredientes da pizza 2, que devem ser listados de forma que sobre caracteres para testar o overflow.", price: 18, quantity: 0, size:"M", selected: {"M": 0, "G": 0, "GG": 0}},
    { product_id: 3, image_link: "Pizza3.PNG", name: "Pizza 3", description: "Lista de ingredientes da pizza 3, que devem ser listados de forma que sobre caracteres para testar o overflow.", price: 14, quantity: 0, size:"M", selected: {"M": 0, "G": 0, "GG": 0}},
    { product_id: 4, image_link: "Pizza4.PNG", name: "Pizza 4", description: "Lista de ingredientes da pizza 4, que devem ser listados de forma que sobre caracteres para testar o overflow.", price: 15, quantity: 0, size:"M", selected: {"M": 0, "G": 0, "GG": 0}},
    { product_id: 5, image_link: "Pizza5.PNG", name: "Pizza 5", description: "Lista de ingredientes da pizza 5, que devem ser listados de forma que sobre caracteres para testar o overflow.", price: 17, quantity: 0, size:"M", selected: {"M": 0, "G": 0, "GG": 0}},
    { product_id: 6, image_link: "Pizza6.PNG", name: "Pizza 6", description: "Lista de ingredientes da pizza 6, que devem ser listados de forma que sobre caracteres para testar o overflow.", price: 15, quantity: 0, size:"M", selected: {"M": 0, "G": 0, "GG": 0}},
    { product_id: 7, image_link: "Pizza7.PNG", name: "Pizza 7", description: "Lista de ingredientes da pizza 7, que devem ser listados de forma que sobre caracteres para testar o overflow.", price: 20, quantity: 0, size:"M", selected: {"M": 0, "G": 0, "GG": 0}},
  ])*/
  const [listItems, setListItems] = useState([]);

  const [twoFlavorList, setTwoFlavorList] = useState([]);

  const [combosList, setCombosList] = useState([]);

  const [bebidasList, setBebidasList] = useState([]);

  useEffect(() => console.log(twoFlavorList), [twoFlavorList]);

  useEffect(() => {
    try {
      setListItems(
        products.pizzas.map((pizza) => ({
          ...pizza,
          quantity: 0,
          size: "M",
          selected: { M: 0, G: 0, GG: 0 },
          product_id: pizza.id,
        }))
      );
      setTwoFlavorList(
        products.twoFlavorPizza.map((pizza) => ({
          ...pizza,
          quantity: 0,
          product_id: pizza.id,
          selected: [{ quantity: 0, flavor1: "", flavor2: "" }],
        }))
      );

      setCombosList(
        products.combos.map((combo) => ({
          ...combo,
          quantity: 0,
          product_id: combo.id,
        }))
      );
      setBebidasList(
        products.drinks.map((bebida) => ({
          ...bebida,
          quantity: 0,
          product_id: bebida.id,
        }))
      );
    } catch (error) {
      console.log(error);
    }
  }, [products]);

  useEffect(() => {
    setFlavorList1(
      flavorsList.map((flavor) => ({
        label: flavor,
        value: flavor,
      }))
    );
    setFlavorList2(
      flavorsList.map((flavor) => ({
        label: flavor,
        value: flavor,
      }))
    );
  }, [flavorsList]);

  const onClickPlusPizza = (itemId) => {
    setListItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.product_id === itemId && item.size === "M") {
          return {
            ...item,
            quantity: item.quantity + 1,
            selected: {
              ...item.selected,
              M: item.selected.M + 1,
            },
          };
        } else if (item.product_id === itemId && item.size === "G") {
          return {
            ...item,
            quantity: item.quantity + 1,
            selected: {
              ...item.selected,
              G: item.selected.G + 1,
            },
          };
        } else if (item.product_id === itemId && item.size === "GG") {
          return {
            ...item,
            quantity: item.quantity + 1,
            selected: {
              ...item.selected,
              GG: item.selected.GG + 1,
            },
          };
        }
        return item;
      });
    });
  };

  const onClickMinusPizza = (itemId) => {
    setListItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.product_id === itemId) {
          if (
            item.product_id === itemId &&
            item.size === "M" &&
            item.selected.M
          ) {
            return {
              ...item,
              quantity: item.quantity - 1,
              selected: {
                ...item.selected,
                M: item.selected.M - 1,
              },
            };
          } else if (
            item.product_id === itemId &&
            item.size === "G" &&
            item.selected.G
          ) {
            return {
              ...item,
              quantity: item.quantity - 1,
              selected: {
                ...item.selected,
                G: item.selected.G - 1,
              },
            };
          } else if (
            item.product_id === itemId &&
            item.size === "GG" &&
            item.selected.GG
          ) {
            return {
              ...item,
              quantity: item.quantity - 1,
              selected: {
                ...item.selected,
                GG: item.selected.GG - 1,
              },
            };
          }
        }
        return item;
      });
    });
  };
  const selecionaMedio = (itemId) => {
    setListItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.product_id === itemId) {
          return { ...item, size: "M" };
        }
        return item;
      });
    });
  };
  const selecionaGrande = (itemId) => {
    setListItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.product_id === itemId) {
          return { ...item, size: "G" };
        }
        return item;
      });
    });
  };
  const selecionaGigante = (itemId) => {
    setListItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.product_id === itemId) {
          return { ...item, size: "GG" };
        }
        return item;
      });
    });
  };
  const onClickPlusCombos = (itemId) => {
    setCombosList((prevItems) => {
      return prevItems.map((item) => {
        if (item.product_id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const onClickMinusCombos = (itemId) => {
    setCombosList((prevItems) => {
      return prevItems.map((item) => {
        if (item.product_id === itemId) {
          if (item.quantity > 0) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      });
    });
  };
  const onClickPlusDrink = (itemId) => {
    setBebidasList((prevItems) => {
      return prevItems.map((item) => {
        if (item.product_id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const onClickMinusDrink = (itemId) => {
    setBebidasList((prevItems) => {
      return prevItems.map((item) => {
        if (item.product_id === itemId) {
          if (item.quantity > 0) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      });
    });
  };
  const concluido = () => {
    router.push(
      {
        pathname: "/cart",
        query: {
          myData: JSON.stringify({
            listaPizzas: listItems,
            listaDuo: twoFlavorList,
            listaBebidas: bebidasList,
            listaCombos: combosList,
          }),
        },
      },
      "/cart"
    );
  };
  const handleVoltar = () => {
    router.back(); // Volta para a página anterior
  };

  return (
    <main>
      <Image
        className="absolute top-0"
        src={backgroundImage}
        width={1890}
        height={1080}
        alt="RED"
      />
      <div className="w-[65%] m-auto mb-6 mt-6 bg-white rounded-md shadow-md p-4 relative text-center">
        <button
          className="text-black text-bold absolute bg-white top-0 left-0 p-4"
          onClick={handleVoltar}
        >
          {"<"}
        </button>
        <h1 className="text-3xl text-black font-bold mb-7">Menu</h1>
        <h1 className="mb-4 text-black font-semibold text-left">Pizzas</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {listItems
            ? listItems.map((pizza) => (
                <div className="w-full h-40 bg-white rounded-md text-black border-solid border-[1px] border-gray-300">
                  <div className="flex flex-row">
                    <div className="w-1/3 h-full rounded-md">
                      <Image
                        className="rounded-md"
                        src={`${pizza.image_link}`}
                        width={160}
                        height={160}
                        alt="RED"
                      />
                    </div>
                    <div className="h-40 w-2/3 rounded-md flex flex-col p-2">
                      <div className="h-[55%] rounded-md text-justify ">
                        <p className="font-semibold text-sm mb-1">
                          {pizza.name}
                        </p>
                        <p className="text-xs line-clamp-3">
                          {pizza.description}
                        </p>
                      </div>
                      <div className="w-full h-[45%] rounded-md flex flex-row justify-between">
                        <div className="flex flex-row">
                          <p className="align-bottom text-green-500 place-self-end mr-2">
                            R${" "}
                            {pizza.size == "M"
                              ? (
                                  Math.round(pizza.price * 1.1 * 100) / 100
                                ).toFixed(2)
                              : pizza.size == "G"
                              ? (
                                  Math.round(pizza.price * 1.2 * 100) / 100
                                ).toFixed(2)
                              : pizza.size == "GG"
                              ? (
                                  Math.round(pizza.price * 1.3 * 100) / 100
                                ).toFixed(2)
                              : null}
                          </p>
                          <p className="align-bottom place-self-end line-through">
                            R${" "}
                            {pizza.size == "M"
                              ? Math.round(
                                  Math.round(pizza.price * 1.1 * 1.25) * 100
                                ) /
                                  100 -
                                (0.01).toFixed(2)
                              : pizza.size == "G"
                              ? Math.round(
                                  Math.round(pizza.price * 1.2 * 1.25) * 100
                                ) /
                                  100 -
                                (0.01).toFixed(2)
                              : pizza.size == "GG"
                              ? Math.round(
                                  Math.round(pizza.price * 1.3 * 1.25) * 100
                                ) /
                                  100 -
                                (0.01).toFixed(2)
                              : null}
                          </p>
                        </div>
                        <div className="flex flex-col justify-between rounded-md">
                          <div className="flex flex-row justify-between rounded-md">
                            <div className="flex flex-col">
                              <p
                                className={`w-[80%] mb-[2px] text-white ${
                                  pizza.selected.M
                                    ? ""
                                    : "opacity-0 pointer-events-none"
                                } m-auto px-[1px] bg-red-600 text-center rounded-full text-xs`}
                              >
                                {pizza.selected.M}
                              </p>
                              <button
                                className={`px-1 ${
                                  pizza.size === "M"
                                    ? "text-red-400 border-solid border-[1px] border-red-400"
                                    : "text-black border-solid border-[1px] border-gray-300"
                                } hover:text-red-400 hover:border-solid hover:border-[1px] hover:border-red-400 text-center rounded-full text-sm`}
                                onClick={() => selecionaMedio(pizza.product_id)}
                              >
                                M
                              </button>
                            </div>
                            <div className="flex flex-col">
                              <p
                                className={`w-[80%] mb-[2px] text-white ${
                                  pizza.selected.G
                                    ? ""
                                    : "opacity-0 pointer-events-none"
                                } m-auto px-[1px] bg-red-600 text-center rounded-full text-xs`}
                              >
                                {pizza.selected.G}
                              </p>
                              <button
                                className={`px-1 ${
                                  pizza.size === "G"
                                    ? "text-red-400 border-solid border-[1px] border-red-400"
                                    : "text-black border-solid border-[1px] border-gray-300"
                                } hover:text-red-400 hover:border-solid hover:border-[1px] hover:border-red-400 text-center rounded-full text-sm`}
                                onClick={() =>
                                  selecionaGrande(pizza.product_id)
                                }
                              >
                                G
                              </button>
                            </div>
                            <div className="flex flex-col">
                              <p
                                className={`w-[50%] mb-[2px] text-white ${
                                  pizza.selected.GG
                                    ? ""
                                    : "opacity-0 pointer-events-none"
                                } m-auto px-[1px] bg-red-600 text-center rounded-full text-xs`}
                              >
                                {pizza.selected.GG}
                              </p>
                              <button
                                className={`px-1 ${
                                  pizza.size === "GG"
                                    ? "text-red-400 border-solid border-[1px] border-red-400"
                                    : "text-black border-solid border-[1px] border-gray-300"
                                } hover:text-red-400 hover:border-solid hover:border-[1px] hover:border-red-400 text-center rounded-full text-sm`}
                                onClick={() =>
                                  selecionaGigante(pizza.product_id)
                                }
                              >
                                GG
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-row justify-between rounded-md">
                            <button
                              className="px-1 rounded-full hover:text-red-400"
                              onClick={() =>
                                onClickMinusPizza(pizza.product_id)
                              }
                            >
                              -
                            </button>
                            <p className="px-2 rounded-full">
                              {pizza.quantity}
                            </p>
                            <button
                              className="px-1 rounded-full hover:text-red-400"
                              onClick={() => onClickPlusPizza(pizza.product_id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <h1 className="mt-8 mb-4 text-black font-semibold text-left">
          Monte sua pizza
        </h1>
        <div className="grid grid-cols-1 gap-4 mb-4">
          {twoFlavorList
            ? twoFlavorList.map((pizza) => (
                <div className="w-full h-40 bg-white rounded-md text-black border-solid border-[1px] border-gray-300">
                  <div className="flex flex-row">
                    <div className="w-1/6 h-full rounded-md">
                      <Image
                        className="rounded-md"
                        src={`${pizza.image_link}`}
                        width={160}
                        height={160}
                        alt="RED"
                      />
                    </div>
                    <div className="h-40 w-2/6 rounded-md flex flex-col p-2">
                      <div className="h-2/3 rounded-md text-justify ">
                        <p className="font-semibold text-sm mb-1">
                          {pizza.name}
                        </p>
                        <p className="text-xs line-clamp-5">
                          {pizza.description}
                        </p>
                      </div>
                      <div className="h-1/3 rounded-md flex flex-row">
                        <p className="align-bottom text-green-500 place-self-end mr-2">
                          R$ {(Math.round(pizza.price * 100) / 100).toFixed(2)}
                        </p>

                        <p className="align-bottom place-self-end line-through">
                          R${" "}
                          {Math.round(Math.round(pizza.price * 1.25) * 100) /
                            100 -
                            (0.01).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="h-40 w-1/2 rounded-md flex flex-row p-2">
                      <div className="w-1/2 flex flex-col">
                        <div className="[&>label]:focus-within:-translate-y-2 [&>label]:focus-within:text-xs [&>label]:focus-within:text-black mb-4 bg-white border-solid border-gray-400 border-[1px] rounded-[4px] relative flex flex-col w-full">
                          <Select
                            className="text-start"
                            styles={selectStyle}
                            onChange={handleChangeFlavor1}
                            placeholder={""}
                            options={flavorList1}
                          />
                          <label
                            className={`pointer-events-none absolute transition-transform translate-x-[6px] translate-y-[7px] ${
                              selectedFlavor1
                                ? "-translate-y-3 text-xs text-black"
                                : "text-gray-400"
                            } bg-white px-1`}
                          >
                            Primeiro sabor
                          </label>
                        </div>
                        <div className="[&>label]:focus-within:-translate-y-2 [&>label]:focus-within:text-xs [&>label]:focus-within:text-black mb-2 bg-white border-solid border-gray-400 border-[1px] rounded-[4px] relative flex flex-col w-full">
                          <Select
                            className="text-start"
                            styles={selectStyle}
                            onChange={handleChangeFlavor2}
                            placeholder={""}
                            options={flavorList2}
                          />
                          <label
                            className={`pointer-events-none absolute transition-transform translate-x-[6px] translate-y-[7px] ${
                              selectedFlavor2
                                ? "-translate-y-3 text-xs text-black"
                                : "text-gray-400"
                            } bg-white px-1`}
                          >
                            Segundo sabor
                          </label>
                        </div>
                        <div className="flex flex-row rounded-md">
                          <button
                            className="place-self-end px-2 rounded-full hover:text-red-400"
                            onClick={() =>
                              onClickMinusTwoFlavor(pizza.product_id)
                            }
                          >
                            -
                          </button>
                          <p className="place-self-end px-2 rounded-full">
                            {pizza.quantity}
                          </p>
                          <button
                            className="place-self-end px-2 rounded-full hover:text-red-400"
                            onClick={() =>
                              onClickPlusTwoFlavor(pizza.product_id)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="w-1/2 flex flex-col text-left ml-2">
                        {twoFlavorList
                          ? pizza.selected.map((flavors) => (
                              <p className={`text-gray-600 text-xs truncate`}>
                                {flavors.quantity
                                  ? `${flavors.quantity}x ${flavors.flavor1} e ${flavors.flavor2}`
                                  : ""}
                              </p>
                            ))
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <h1 className="mt-8 mb-4 text-black font-semibold text-left">Combos</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {combosList
            ? combosList.map((combo) => (
                <div
                  className={`w-full h-40 bg-white rounded-md text-black border-solid border-[1px] border-gray-300 ${
                    combo.quantity
                      ? "border-solid border-[1px] border-red-600"
                      : ""
                  }`}
                >
                  <div className="flex flex-row">
                    <div className="w-1/3 h-full rounded-md">
                      <Image
                        className="rounded-md"
                        src={`${combo.image_link}`}
                        width={160}
                        height={160}
                        alt="RED"
                      />
                    </div>
                    <div className="h-40 w-2/3 rounded-md flex flex-col p-2">
                      <div className="h-2/3 rounded-md text-justify ">
                        <p className="font-semibold text-sm mb-1">
                          {combo.name}
                        </p>
                        <p className="text-xs line-clamp-5">
                          {combo.description}
                        </p>
                      </div>
                      <div className="w-full h-1/3 rounded-md bg-yellow flex flex-row justify-between">
                        <div className="flex flex-row">
                          <p className="align-bottom text-green-500 place-self-end mr-2">
                            R${" "}
                            {(Math.round(combo.price * 100) / 100).toFixed(2)}
                          </p>
                          <p className="align-bottom place-self-end line-through">
                            R${" "}
                            {Math.round(Math.round(combo.price * 1.25) * 100) /
                              100 -
                              (0.01).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex flex-row rounded-md">
                          <button
                            className="place-self-end px-2 rounded-full hover:text-red-400"
                            onClick={() => onClickMinusCombos(combo.product_id)}
                          >
                            -
                          </button>
                          <p className="place-self-end px-2 rounded-full">
                            {combo.quantity}
                          </p>
                          <button
                            className="place-self-end px-2 rounded-full hover:text-red-400"
                            onClick={() => onClickPlusCombos(combo.product_id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <h1 className="mt-8 mb-4 text-black font-semibold text-left">
          Bebidas
        </h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {bebidasList
            ? bebidasList.map((drink) => (
                <div
                  className={`w-full h-40 bg-white rounded-md text-black border-solid border-[1px] border-gray-300 ${
                    drink.quantity
                      ? "border-solid border-[1px] border-red-600"
                      : ""
                  }`}
                >
                  <div className="flex flex-row">
                    <div className="w-1/3 h-full rounded-md">
                      <Image
                        className="rounded-md"
                        src={`${drink.image_link}`}
                        width={160}
                        height={160}
                        alt="RED"
                      />
                    </div>
                    <div className="h-40 w-2/3 rounded-md flex flex-col p-2">
                      <div className="h-2/3 rounded-md text-justify ">
                        <p className="font-semibold text-sm mb-1">
                          {drink.name}
                        </p>
                        <p className="text-xs line-clamp-5">
                          {drink.description}
                        </p>
                      </div>
                      <div className="w-full h-1/3 rounded-md bg-yellow flex flex-row justify-between">
                        <div className="flex flex-row">
                          <p className="align-bottom text-green-500 place-self-end mr-2">
                            R${" "}
                            {(Math.round(drink.price * 100) / 100).toFixed(2)}
                          </p>
                          <p className="align-bottom place-self-end line-through">
                            R${" "}
                            {Math.round(Math.round(drink.price * 1.25) * 100) /
                              100 -
                              (0.01).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex flex-row rounded-md">
                          <button
                            className="place-self-end px-2 rounded-full hover:text-red-400"
                            onClick={() => onClickMinusDrink(drink.product_id)}
                          >
                            -
                          </button>
                          <p className="place-self-end px-2 rounded-full">
                            {drink.quantity}
                          </p>
                          <button
                            className="place-self-end px-2 rounded-full hover:text-red-400"
                            onClick={() => onClickPlusDrink(drink.product_id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <button
          className="m-auto text-white bg-red-600 border-solid border-white border-[1px] p-3 rounded-md"
          onClick={concluido}
        >
          Ir para o carrinho
        </button>
      </div>
    </main>
  );
}
