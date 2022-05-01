import { SetStateAction, useState } from "react";
import Api from "../../Api";

type PropsValues = {
  current: any;
  location: any;
  values: {
    location: {
      name: string;
      region: string;
      country: string;
    },
    current: {
      temp_c : number;
      condition: {
        icon : string;
        text: string;
      }
    }
  }
}

export default function Form() {
  const [city, setCity] = useState('');
  const [values, setValues] = useState<PropsValues>({} as PropsValues)

  function handleChange(e: { target: { value: SetStateAction<string>; }; }) {
    setCity(e.target.value);
    console.log(city);
  }

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    Api(city).then((response) => {
      setValues(response)
      console.log(response)
    })
  }

  return (
    <div>
      <div className='bg-gray-400 text-white p-6 mb-10 rounded-lg shadow-xl'>
        <div className='flex justify-center flex-col items-center'>
          <span className="block text-xl font-bold ">{values.location?.name || "Cidade"}</span>
          <span className="text-sm font-medium">{values.location?.region || "Estado"}, {values.location?.country || "País"}</span>
        </div>

        <div className='flex justify-center text-slate-800'>
          <span className="text-8xl font-bold">{parseInt(values.current?.temp_c) || 0}</span>
          <span className="text-2xl font-semibold mt-2 ml-1">ºC</span>
        </div>

        <div className='flex justify-center items-center flex-col'>
          <img src={values.current?.condition?.icon || "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"} alt="condition_icon" />
          <span>{values.current?.condition?.text || "Condição Climática"}</span>
        </div>
      </div>

      <form className="flex items-center justify-center flex-col" onSubmit={handleSubmit}>
        <input className="placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          value={city}
          onChange={handleChange}
          placeholder="Digite a cidade ..." type="text" name="search" />
        <button className="bg-slate-900 px-8 py-1 text-white mt-4 rounded-lg">Buscar</button>
      </form>
    </div>
  )
}