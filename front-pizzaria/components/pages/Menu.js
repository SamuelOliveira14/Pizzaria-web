"use client";
import { useEffect, useState } from "react";
import menuImage from "../../public/red.jpg";
import Image from "next/image";

const pizzaSizeList = [
  {image_link: "SizePizza.PNG", name: "Pizza customizada", description: "Monte sua pizza de acordo com suas necessidades.", price: 10},
]



export default function Home() {
  const urlApi = "https://24ce-177-99-123-24.ngrok-free.app"
  function requestProducts(){
    const axios = require('axios');

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${urlApi}/products`,
      headers: {"ngrok-skip-browser-warning": "69420"}
    };

    axios.request(config)
    .then((response) => {
      console.log(response.data);
      setProducts(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  }
  const [products, setProducts] = useState([]);
  console.log(products.pizzas)
  useEffect(() =>
    requestProducts(),
    []
  )
  const [listItems, setListItems] = useState([
    { id: 1, image_link: "Pizza1.PNG", name: "Pizza 1", description: "Lista de ingredientes da pizza 1, que devem ser listados de forma que sobre caracteres para testar o overflow.", price: 22, quantidade: 0, tamanho:"M", selecionados: {"M": 0, "G": 0, "GG": 0}},
    { id: 2, image_link: "Pizza2.PNG", name: "Pizza 2", description: "Lista de ingredientes da pizza 2, que devem ser listados de forma que sobre caracteres para testar o overflow.", price: 18, quantidade: 0, tamanho:"M", selecionados: {"M": 0, "G": 0, "GG": 0}},
    { id: 3, image_link: "Pizza3.PNG", name: "Pizza 3", description: "Lista de ingredientes da pizza 3, que devem ser listados de forma que sobre caracteres para testar o overflow.", price: 14, quantidade: 0, tamanho:"M", selecionados: {"M": 0, "G": 0, "GG": 0}},
    { id: 4, image_link: "Pizza4.PNG", name: "Pizza 4", description: "Lista de ingredientes da pizza 4, que devem ser listados de forma que sobre caracteres para testar o overflow.", price: 15, quantidade: 0, tamanho:"M", selecionados: {"M": 0, "G": 0, "GG": 0}},
    { id: 5, image_link: "Pizza5.PNG", name: "Pizza 5", description: "Lista de ingredientes da pizza 5, que devem ser listados de forma que sobre caracteres para testar o overflow.", price: 17, quantidade: 0, tamanho:"M", selecionados: {"M": 0, "G": 0, "GG": 0}},
    { id: 6, image_link: "Pizza6.PNG", name: "Pizza 6", description: "Lista de ingredientes da pizza 6, que devem ser listados de forma que sobre caracteres para testar o overflow.", price: 15, quantidade: 0, tamanho:"M", selecionados: {"M": 0, "G": 0, "GG": 0}},
    { id: 7, image_link: "Pizza7.PNG", name: "Pizza 7", description: "Lista de ingredientes da pizza 7, que devem ser listados de forma que sobre caracteres para testar o overflow.", price: 20, quantidade: 0, tamanho:"M", selecionados: {"M": 0, "G": 0, "GG": 0}},
  ])

  const [combosList, setCombosList] = useState([
    {id: 1, image_link: "Combo.PNG", name: "Combo do Dia", description: "Pizza média + 1 refri 2L", price: 40, quantidade: 0},
    {id: 2, image_link: "Combo.PNG", name: "Combo Especial", description: "Pizza grande + 1 refri 2L.", price: 50, quantidade: 0},
    {id: 3, image_link: "Combo.PNG", name: "Combo Festa", description: "Pizza gigante + 2 refri 2L", price: 80, quantidade: 0},
  ])
  
  const [bebidasList, setBebidasList] = useState([
    {id: 1, image_link: "Refri2L.PNG", name: "Regrigerante 2L", description: "", price: 7, quantidade: 0},
    {id: 2, image_link: "RefriLata.PNG", name: "Refrigerante Lata", description: "", price: 4, quantidade: 0},
    {id: 3, image_link: "SucoLata.PNG", name: "Suco Lata", description: "", price: 3.5, quantidade: 0},
    {id: 4, image_link: "CervejaLata.PNG", name: "Cerveja Lata", description: "Produto para maiores de 18 anos.", price: 5, quantidade: 0},
  ])
  const onClickPlusPizza = (itemId) => {
    setListItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId && item.tamanho === 'M') {
          return { ...item, quantidade: item.quantidade + 1, selecionados: {
          ...item.selecionados, M: item.selecionados.M + 1} };
        }
        else if (item.id === itemId && item.tamanho === 'G') {
          return { ...item, quantidade: item.quantidade + 1, selecionados: {
          ...item.selecionados, G: item.selecionados.G + 1} };
        }
        else if (item.id === itemId && item.tamanho === 'GG') {
          return { ...item, quantidade: item.quantidade + 1, selecionados: {
          ...item.selecionados, GG: item.selecionados.GG + 1} };
        }
        return item;
      });
    });
  };

  const onClickMinusPizza = (itemId) => {
    setListItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          if (item.id === itemId && item.tamanho === 'M' && item.selecionados.M) {
            return { ...item, quantidade: item.quantidade - 1, selecionados: {
            ...item.selecionados, M: item.selecionados.M - 1} };
          }
          else if (item.id === itemId && item.tamanho === 'G' && item.selecionados.G) {
            return { ...item, quantidade: item.quantidade - 1, selecionados: {
            ...item.selecionados, G: item.selecionados.G - 1} };
          }
          else if (item.id === itemId && item.tamanho === 'GG' && item.selecionados.GG) {
            return { ...item, quantidade: item.quantidade - 1, selecionados: {
            ...item.selecionados, GG: item.selecionados.GG - 1} };
          }
        }
        return item;
      });
    });
  };
  const selecionaMedio = (itemId) => {
    setListItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          return { ...item, tamanho: 'M' };
        }
        return item;
      });
    });
  };
  const selecionaGrande = (itemId) => {
    setListItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          return { ...item, tamanho: 'G' };
        }
        return item;
      });
    });
  };
  const selecionaGigante = (itemId) => {
    setListItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          return { ...item, tamanho: 'GG' };
        }
        return item;
      });
    });
  };
  const onClickPlusCombos = (itemId) => {
    setCombosList(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          return { ...item, quantidade: item.quantidade + 1 };
        }
        return item;
      });
    });
  };

  const onClickMinusCombos = (itemId) => {
    setCombosList(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          if(item.quantidade > 0){
            return { ...item, quantidade: item.quantidade - 1 };
          }
        }
        return item;
      });
    });
  };
  const onClickPlusDrink = (itemId) => {
    setBebidasList(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          return { ...item, quantidade: item.quantidade + 1 };
        }
        return item;
      });
    });
  };

  const onClickMinusDrink = (itemId) => {
    setBebidasList(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          if(item.quantidade > 0){
            return { ...item, quantidade: item.quantidade - 1 };
          }
        }
        return item;
      });
    });
  };
  const concluido = () => {
    console.log(listItems)
  }

  return (
    <main>
      <div className="w-[65%] m-auto mb-6 mt-6 bg-white rounded-md shadow-md p-4">
        <h1 className="mb-4 text-black font-semibold">Pizzas</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {listItems ? listItems.map((pizza) => (
            <div className="w-full h-40 bg-white rounded-md text-black border-solid border-[1px] border-gray-300">
              <div className="flex flex-row">
                <div className="w-1/3 h-full rounded-md">
                  <Image
                    className="rounded-md"
                    src={require(`../../public/${pizza.image_link}`)}
                    width={160}
                    height={160}
                    alt="RED"
                  />
                </div>
                <div className="h-40 w-2/3 rounded-md flex flex-col p-2">
                  <div className="h-[55%] rounded-md text-justify ">
                    <p className="font-semibold text-sm mb-1">{pizza.name}</p>
                    <p className="text-xs line-clamp-3">{pizza.description}</p>
                  </div>
                  <div className="w-full h-[45%] rounded-md flex flex-row justify-between">
                    <div className="flex flex-row">
                      <p className="align-bottom text-green-500 place-self-end mr-2">
                        R$ {(Math.round(pizza.price * 100) / 100).toFixed(2)}
                      </p>
                      <p className="align-bottom place-self-end line-through">
                        R$ {(Math.round(Math.round(pizza.price * 1.25) * 100) / 100)-0.01.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col justify-between rounded-md">
                      <div className="flex flex-row justify-between rounded-md">
                        <div className="flex flex-col"> 
                          <p className={`w-[80%] mb-[2px] text-white ${pizza.selecionados.M ? "": "opacity-0 pointer-events-none"} m-auto px-[1px] bg-red-600 text-center rounded-full text-xs`}>{pizza.selecionados.M}</p>
                          <button className={`px-1 ${pizza.tamanho === "M" ? "text-red-400 border-solid border-[1px] border-red-400": "text-black border-solid border-[1px] border-gray-300"} hover:text-red-400 hover:border-solid hover:border-[1px] hover:border-red-400 text-center rounded-full text-sm`} onClick={() => selecionaMedio(pizza.id)}>M</button>
                        </div>
                        <div className="flex flex-col"> 
                          <p className={`w-[80%] mb-[2px] text-white ${pizza.selecionados.G ? "": "opacity-0 pointer-events-none"} m-auto px-[1px] bg-red-600 text-center rounded-full text-xs`}>{pizza.selecionados.G}</p>
                          <button className={`px-1 ${pizza.tamanho === "G" ? "text-red-400 border-solid border-[1px] border-red-400": "text-black border-solid border-[1px] border-gray-300"} hover:text-red-400 hover:border-solid hover:border-[1px] hover:border-red-400 text-center rounded-full text-sm`} onClick={() => selecionaGrande(pizza.id)}>G</button>
                        </div>
                        <div className="flex flex-col"> 
                          <p className={`w-[50%] mb-[2px] text-white ${pizza.selecionados.GG ? "": "opacity-0 pointer-events-none"} m-auto px-[1px] bg-red-600 text-center rounded-full text-xs`}>{pizza.selecionados.GG}</p>
                          <button className={`px-1 ${pizza.tamanho === "GG" ? "text-red-400 border-solid border-[1px] border-red-400": "text-black border-solid border-[1px] border-gray-300"} hover:text-red-400 hover:border-solid hover:border-[1px] hover:border-red-400 text-center rounded-full text-sm`} onClick={() => selecionaGigante(pizza.id)}>GG</button>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between rounded-md">
                        <button className="px-1 rounded-full hover:text-red-400" onClick={() => onClickMinusPizza(pizza.id)}>-</button>
                        <p className="px-2 rounded-full">{pizza.quantidade}</p>
                        <button className="px-1 rounded-full hover:text-red-400" onClick={() => onClickPlusPizza(pizza.id)}>+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : null}
        </div>
        <h1 className="mt-8 mb-4 text-black font-semibold">Monte sua pizza</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
        {products.twoFlavorPizza ? products.twoFlavorPizza.map((pizza) => (
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
                  <div className="h-2/3 rounded-md text-justify ">
                    <p className="font-semibold text-sm mb-1">{pizza.name}</p>
                    <p className="text-xs line-clamp-5">{pizza.description}</p>
                  </div>
                  <div className="h-1/3 rounded-md flex flex-row">
                    <p className="align-bottom text-green-500 place-self-end mr-2">
                      R$ {(Math.round(pizza.price * 100) / 100).toFixed(2)}
                    </p>
                    <p className="align-bottom place-self-end line-through">
                      R$ {(Math.round(Math.round(pizza.price * 1.25) * 100) / 100)-0.01.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )) : null}
        </div>
        <h1 className="mt-8 mb-4 text-black font-semibold">Combos</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
        {combosList ? combosList.map((combo) => (
            <div className={`w-full h-40 bg-white rounded-md text-black border-solid border-[1px] border-gray-300 ${combo.quantidade ? "border-solid border-[1px] border-red-600":""}`}>
              <div className="flex flex-row">
                <div className="w-1/3 h-full rounded-md">
                  <Image
                    className="rounded-md"
                    src={require(`../../public/${combo.image_link}`)}
                    width={160}
                    height={160}
                    alt="RED"
                  />
                </div>
                <div className="h-40 w-2/3 rounded-md flex flex-col p-2">
                  <div className="h-2/3 rounded-md text-justify ">
                    <p className="font-semibold text-sm mb-1">{combo.name}</p>
                    <p className="text-xs line-clamp-5">{combo.description}</p>
                  </div>
                  <div className="w-full h-1/3 rounded-md bg-yellow flex flex-row justify-between">
                    <div className="flex flex-row">
                      <p className="align-bottom text-green-500 place-self-end mr-2">
                        R$ {(Math.round(combo.price * 100) / 100).toFixed(2)}
                      </p>
                      <p className="align-bottom place-self-end line-through">
                        R$ {(Math.round(Math.round(combo.price * 1.25) * 100) / 100)-0.01.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-row rounded-md">
                      <button className="place-self-end px-2 rounded-full hover:text-red-400" onClick={() => onClickMinusCombos(combo.id)}>-</button>
                      <p className="place-self-end px-2 rounded-full">{combo.quantidade}</p>
                      <button className="place-self-end px-2 rounded-full hover:text-red-400" onClick={() => onClickPlusCombos(combo.id)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : null}
        </div>
        <h1 className="mt-8 mb-4 text-black font-semibold">Bebidas</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
        {bebidasList ? bebidasList.map((drink) => (
            <div className={`w-full h-40 bg-white rounded-md text-black border-solid border-[1px] border-gray-300 ${drink.quantidade ? "border-solid border-[1px] border-red-600":""}`}>
              <div className="flex flex-row">
                <div className="w-1/3 h-full rounded-md">
                  <Image
                    className="rounded-md"
                    src={require(`../../public/${drink.image_link}`)}
                    width={160}
                    height={160}
                    alt="RED"
                  />
                </div>
                <div className="h-40 w-2/3 rounded-md flex flex-col p-2">
                  <div className="h-2/3 rounded-md text-justify ">
                    <p className="font-semibold text-sm mb-1">{drink.name}</p>
                    <p className="text-xs line-clamp-5">{drink.description}</p>
                  </div>
                  <div className="w-full h-1/3 rounded-md bg-yellow flex flex-row justify-between">
                  <div className="flex flex-row">
                    <p className="align-bottom text-green-500 place-self-end mr-2">
                      R$ {(Math.round(drink.price * 100) / 100).toFixed(2)}
                    </p>
                    <p className="align-bottom place-self-end line-through">
                      R$ {(Math.round(Math.round(drink.price * 1.25) * 100) / 100)-0.01.toFixed(2)}
                    </p>
                    </div>
                    <div className="flex flex-row rounded-md">
                      <button className="place-self-end px-2 rounded-full hover:text-red-400" onClick={() => onClickMinusDrink(drink.id)}>-</button>
                      <p className="place-self-end px-2 rounded-full">{drink.quantidade}</p>
                      <button className="place-self-end px-2 rounded-full hover:text-red-400" onClick={() => onClickPlusDrink(drink.id)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : null}
        </div>
      </div>
    </main>
  );
}
