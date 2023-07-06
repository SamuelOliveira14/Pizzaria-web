'use client'
import Image from "next/image";
import registerImage from "../../components/images/register-image.jpg";
import Select from "react-select";
import { useEffect, useState } from "react";




const selectStyle = {
  control: base => ({
    ...base,
    border: '0 !important',
    // This line disable the blue border
    boxShadow: '0 !important',
    '&:hover': {
        border: '0 !important'
     },
 })
};



export default function Register({urlAPi}) {
  function requestNeighborhood() { 
    const axios = require('axios');

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${url}/neighborhoods`,
      headers: {"ngrok-skip-browser-warning": "69420"}
    };

    axios.request(config)
    .then((response) => {
      console.log(response.data);
      setNeighborhoods(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  }

  function postUser() { 
    const axios = require('axios');
    let data = JSON.stringify({
      "name": `${name}`,
      "email": `${email}`,
      "cpf": `${cpf}`,
      "password": `${password}`,
      "street": `${street}`,
      "number": `${number}`,
      "CEP": `${cep}`,
      "additional_info": `${additionalInfo}`,
      "neighborhood": `${neighborhood}`
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${url}/register`,
      headers: { 
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420"
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}
  const url = urlAPi
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [cpf, setCpf] = useState("")
  const [password, setPassword] = useState("")
  const [street, setStreet] = useState("")
  const [number, setNumber] = useState("")
  const [cep, setCep] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [neighborhoods, setNeighborhoods] = useState([])
  const [bairros, setBairros] = useState([])
  useEffect(() => {
    var aux = []
    for(var i = 0; i < neighborhoods.length; i++) {
      aux.push({label: neighborhoods[i].neighborhood, value: neighborhoods[i].neighborhood});
      setBairros(aux)
      // more statements
   }
  }, [neighborhoods]);
  console.log(neighborhood)
  function handleChangeName(e) {    
    setName(e.target.value);
  }
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangeCpf(e) {
    setCpf(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  function handleChangeStreet(e) {
    setStreet(e.target.value);
  }
  function handleChangeNumber(e) {
    setNumber(e.target.value);
  }
  function handleChangeCep(e) {
    setCep(e.target.value);
  }
  function handleChangeAdditionalInfo(e) {
    setAdditionalInfo(e.target.value);
  }
  function handleChangeNeighborhood(e) {
    setNeighborhood(e.value);
  }
  function registerUser() {
    if(name == ""){
      return
    }
    if(email == ""){
      return
    }
    if(cpf == ""){
      return
    }
    if(password == ""){
      return
    }
    if(street == ""){
      return
    }
    if(number == ""){
      return
    }
    if(cep == ""){
      return
    }
    if(additionalInfo == ""){
      return
    }
    if(neighborhood == ""){
      return
    }
    try {
      postUser();
      console.log("Usuário cadastrado com sucesso!")
    } catch (error) {
      console.log(error)
    };
    
  }
  

  return (
    <main className="">
      <div className="h-[741px] overflow-hidden">
        <Image
          className="blur-sm"
          src={registerImage}
          width={1890}
          height={1080}
          alt="RED"
        />
        <div className="w-[600px] h-fill px-9 py-12 text-black bg-white absolute top-[5%] right-[25%] rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-7">
            Apenas mais um passo para uma refeição deliciosa!
          </h1>
          <p className="text-gray-400 mb-4">Preencha com seus dados</p>
          <div className="[&>label]:focus-within:-translate-y-4 [&>label]:focus-within:text-xs [&>label]:focus-within:text-black  mx-2 mb-3 bg-white border-solid border-gray-400 border-[1px] p-2 rounded-[4px] relative flex flex-col">
            <input className="w-full focus:outline-none" onChange={handleChangeName} type="text" />
            <label className={`pointer-events-none absolute transition-transform ${name ? "-translate-y-4 text-xs text-black":"text-gray-400"} bg-white px-1`}>Nome Completo</label>
          </div>
          <div className="[&>label]:focus-within:-translate-y-4 [&>label]:focus-within:text-xs [&>label]:focus-within:text-black  mx-2 mb-3 bg-white border-solid border-gray-400 border-[1px] p-2 rounded-[4px] relative flex flex-col">
            <input className="w-full focus:outline-none" onChange={handleChangeEmail} type="text" />
            <label className={`pointer-events-none absolute transition-transform ${email ? "-translate-y-4 text-xs text-black":"text-gray-400"} bg-white px-1`}>E-mail</label>
          </div>
          <div className="[&>label]:focus-within:-translate-y-4 [&>label]:focus-within:text-xs [&>label]:focus-within:text-black  mx-2 mb-2 bg-white border-solid border-gray-400 border-[1px] p-2 rounded-[4px] relative flex flex-col">
            <input className="w-full focus:outline-none" onChange={handleChangeCpf} type="text" />
            <label className={`pointer-events-none absolute transition-transform ${cpf ? "-translate-y-4 text-xs text-black":"text-gray-400"} bg-white px-1`}>CPF</label>
          </div>
          <div className="[&>label]:focus-within:-translate-y-4 [&>label]:focus-within:text-xs [&>label]:focus-within:text-black  mx-2 mb-2 bg-white border-solid border-gray-400 border-[1px] p-2 rounded-[4px] relative flex flex-col">
            <input className="w-full focus:outline-none" onChange={handleChangePassword} type="text" />
            <label className={`pointer-events-none absolute transition-transform ${password ? "-translate-y-4 text-xs text-black":"text-gray-400"} bg-white px-1`}>Senha</label>
          </div>
          <div className="[&>label]:focus-within:-translate-y-4 [&>label]:focus-within:text-xs [&>label]:focus-within:text-black  mx-2 mb-2 bg-white border-solid border-gray-400 border-[1px] p-2 rounded-[4px] relative flex flex-col">
            <input className="w-full focus:outline-none" onChange={handleChangeStreet} type="text" />
            <label className={`pointer-events-none absolute transition-transform ${street ? "-translate-y-4 text-xs text-black":"text-gray-400"} bg-white px-1`}>Rua</label>
          </div>
          <div className="flex flex-row justify-between">
          <div className="[&>label]:focus-within:-translate-y-4 [&>label]:focus-within:text-xs [&>label]:focus-within:text-black  mx-2 mb-2 bg-white border-solid border-gray-400 border-[1px] p-2 rounded-[4px] relative flex flex-col">
            <input className="w-full focus:outline-none" onChange={handleChangeNumber} type="text" />
            <label className={`pointer-events-none absolute transition-transform ${number ? "-translate-y-4 text-xs text-black":"text-gray-400"} bg-white px-1`}>Número</label>
          </div>
          <div className="[&>label]:focus-within:-translate-y-2 [&>label]:focus-within:text-xs [&>label]:focus-within:text-black  mx-2 mb-2 bg-white border-solid border-gray-400 border-[1px] rounded-[4px] relative flex flex-col w-full">
            <Select className="text-start" styles={selectStyle} onChange={handleChangeNeighborhood} placeholder={''} options={bairros} onFocus={requestNeighborhood}/>
            <label className={`pointer-events-none absolute transition-transform translate-x-[6px] translate-y-[7px] ${neighborhood ? "-translate-y-2 text-xs text-black":"text-gray-400"} bg-white px-1`}>Bairro</label>
          </div>
          </div>
          <div className="flex flex-row">
          <div className="w-full [&>label]:focus-within:-translate-y-4 [&>label]:focus-within:text-xs [&>label]:focus-within:text-black  mx-2 mb-2 bg-white border-solid border-gray-400 border-[1px] p-2 rounded-[4px] relative flex flex-col">
            <input className="w-full focus:outline-none" onChange={handleChangeAdditionalInfo} type="text" />
            <label className={`pointer-events-none absolute transition-transform ${additionalInfo ? "-translate-y-4 text-xs text-black":"text-gray-400"} bg-white px-1`}>Complemento</label>
          </div>
          <div className="[&>label]:focus-within:-translate-y-4 [&>label]:focus-within:text-xs [&>label]:focus-within:text-black  mx-2 mb-2 bg-white border-solid border-gray-400 border-[1px] p-2 rounded-[4px] relative flex flex-col">
            <input className="w-full focus:outline-none" onChange={handleChangeCep} type="text" />
            <label className={`pointer-events-none absolute transition-transform ${cep ? "-translate-y-4 text-xs text-black":"text-gray-400"} bg-white px-1`}>CEP</label>
          </div>
          </div>
            <div>
            <button className="w-1/3 m-auto text-white bg-red-600 border-solid border-white border-[1px] p-3 rounded-[4px]" onClick={registerUser}> Registrar </button>
          </div>
        </div>
      </div>
    </main>
  );
}
