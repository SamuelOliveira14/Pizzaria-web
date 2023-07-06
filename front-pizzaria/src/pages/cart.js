"use client";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import backgroundImage from "../../public/Cart.PNG";
import Image from "next/image";

function Cart() {
  const router = useRouter();
  const { myData } = router.query;
  const [valorTotalPizzas, setValorTotalPizzas] = useState(0);
  const [valorTotalDuos, setValorTotalDuos] = useState(0);
  const [valorTotalCombos, setValorTotalCombos] = useState(0);
  const [valorTotalBebidas, setValorTotalBebidas] = useState(0);
  const [listPizzas, setListPizzas] = useState([]);
  const [listTwoFlavors, setListTwoFlavors] = useState([]);
  const [listCombos, setListCombos] = useState([]);
  const [listDrinks, setListDrinks] = useState([]);
  useEffect(() => {
    if (myData) {
      setListPizzas(JSON.parse(myData).listaPizzas);
      setListTwoFlavors(JSON.parse(myData).listaDuo);
      setListCombos(JSON.parse(myData).listaCombos);
      setListDrinks(JSON.parse(myData).listaBebidas);
    }
  }, [router.query]);
  const handleVoltar = () => {
    router.back(); // Volta para a página anterior
  };
  useEffect(() => {
    var aux = 0;
    listPizzas.map(
      (item) =>
        (aux +=
          item.price * item.selected.M * 1.1 +
          item.price * item.selected.G * 1.2 +
          item.price * item.selected.GG * 1.3)
    );
    setValorTotalPizzas(aux);
  }, [listPizzas]);
  useEffect(() => {
    var aux = 0;
    listTwoFlavors.map((item) => (aux += item.price * item.quantity));
    setValorTotalDuos(aux);
  }, [listTwoFlavors]);
  useEffect(() => {
    var aux = 0;
    listCombos.map((item) => (aux += item.price * item.quantity));
    setValorTotalCombos(aux);
  }, [listCombos]);
  useEffect(() => {
    var aux = 0;
    listDrinks.map((item) => (aux += item.price * item.quantity));
    setValorTotalBebidas(aux);
  }, [listDrinks]);

  const concluido = () => {
    router.push({
      pathname: '/nfe',
      query: {
        myData: JSON.stringify({listPizzas:listPizzas, listCombos:listCombos, listDrinks:listDrinks, listTwoFlavors:listTwoFlavors})
       }
    }, '/nfe');
  }

  return (
    <main className="h-[759px] overflow-hidden">
        <Image
        className="absolute"
        src={backgroundImage}
        width={1890}
        height={1080}
        alt="RED"
      />
      <div className="bg-gray-200 p-10 text-black">
      <div className="m-auto mb-2 w-1/2 p-4 rounded-md border-solid border-[1px] bg-white border-gray-500 shadow-md flex flex-col text-center relative">
        <button
          className="text-black font-bold absolute top-0 left-0 p-4"
          onClick={handleVoltar}
        >
          {"<"}
        </button>
        <h1 className="text-3xl text-black font-bold mb-7">Menu</h1>
        <table class="table-auto">
          <thead className="text-left text-white bg-red-600">
            <tr>
              <th className="p-1">Qtd</th>
              <th className="p-1">Items</th>
              <th className="p-1 text-right">Preço</th>
            </tr>
          </thead>
          <tbody>
            {listPizzas.length
              ? listPizzas.map((item) =>
                  item.quantity ? (
                    <tr className="even:bg-gray-200 odd:bg-white">
                      <td className="p-1 border-t-[1px] border-gray-300 max-h-4 truncate text-left">
                        {item.quantity}x
                      </td>
                      <td className="p-1 border-t-[1px] border-gray-300 max-h-4 truncate text-left">
                        {item.name}, sendo{" "}
                        {item.selected.M ? `${item.selected.M}x M` : ""}{" "}
                        {item.selected.M
                          ? item.selected.G
                            ? item.selected.GG
                              ? ", "
                              : "e "
                            : item.selected.GG
                            ? "e "
                            : ""
                          : ""}{" "}
                        {item.selected.G ? `${item.selected.G}x G` : ""}
                        {item.selected.G ? (item.selected.GG ? " e " : "") : ""}
                        {item.selected.GG ? `${item.selected.GG}x GG` : ""}.
                      </td>
                      <td className="p-1 border-t-[1px] border-gray-300 max-h-4 truncate text-right">
                        R${" "}
                        {Math.round(
                          item.price * item.selected.M * 1.1 +
                            item.price * item.selected.G * 1.2 +
                            item.price * item.selected.GG * 1.3
                        )
                          .toFixed(2)
                          .toString()
                          .replace(".", ",")}
                      </td>
                    </tr>
                  ) : null
                )
              : null}
              {listTwoFlavors.length
              ? listTwoFlavors.map((item) =>
                  item.quantity ? (
                    <tr className="even:bg-gray-200 odd:bg-white">
                      <td className="p-1 border-t-[1px] border-gray-300 max-h-4 truncate text-left">
                        {item.quantity}x
                      </td>
                      <td className="p-1 border-t-[1px] border-gray-300 max-h-4 truncate text-left">
                        {item.name}.
                      </td>
                      <td className="p-1 border-t-[1px] border-gray-300 max-h-4 truncate text-right">
                        R${" "}
                        {Math.round(item.price * item.quantity)
                          .toFixed(2)
                          .toString()
                          .replace(".", ",")}
                      </td>
                    </tr>
                  ) : null
                )
              : null}
            {listCombos.length
              ? listCombos.map((item) =>
                  item.quantity ? (
                    <tr className="even:bg-gray-200 odd:bg-white">
                      <td className="p-1 border-t-[1px] border-gray-300 max-h-4 truncate text-left">
                        {item.quantity}x
                      </td>
                      <td className="p-1 border-t-[1px] border-gray-300 max-h-4 truncate text-left">
                        {item.name}.
                      </td>
                      <td className="p-1 border-t-[1px] border-gray-300 max-h-4 truncate text-right">
                        R${" "}
                        {Math.round(item.price * item.quantity)
                          .toFixed(2)
                          .toString()
                          .replace(".", ",")}
                      </td>
                    </tr>
                  ) : null
                )
              : null}
            {listDrinks.length
              ? listDrinks.map((item) =>
                  item.quantity ? (
                    <tr className="even:bg-gray-200 odd:bg-white">
                      <td className="p-1 border-t-[1px] border-gray-300 max-h-4 truncate text-left">
                        {item.quantity}x
                      </td>
                      <td className="p-1 border-t-[1px] border-gray-300 max-h-4 truncate text-left">
                        {item.name}.
                      </td>
                      <td className="p-1 border-t-[1px] border-gray-300 max-h-4 truncate text-right">
                        R${" "}
                        {Math.round(item.price * item.quantity)
                          .toFixed(2)
                          .toString()
                          .replace(".", ",")}
                      </td>
                    </tr>
                  ) : null
                )
              : null}
            <tr>
              <td className="p-1 border-t-[1px] border-gray-300 max-h-4 truncate"></td>
              <td className="p-1 border-t-[1px] border-gray-300 max-h-4 truncate text-right font-bold">
                Total:
              </td>
              <td className="p-1 border-t-[1px] border-gray-300 max-h-4 truncate text-right">
                R${Math.round(valorTotalPizzas + valorTotalDuos + valorTotalCombos + valorTotalBebidas).toFixed(2).toString().replace(".", ",")}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="m-auto mt-4 flex flex-row gap-4">
          <button
            className="text-white bg-red-600 border-solid border-white border-[1px] p-3 rounded-[4px]"
            onClick={concluido}
          >
            Finalizar Pedido
          </button>
          <button
            className="text-red-600 bg-white border-solid border-red-600 border-[1px] p-3 rounded-md"
            onClick={handleVoltar}
          >
            Voltar
          </button>
        </div>
      </div>
      </div>
    </main>
  );
}

export default Cart;
