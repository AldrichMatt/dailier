import React, { useEffect, useState } from "react"
import Axios from "axios"

const Api = () => {
  const [data, setData] = useState("");

  const getData = async() => {
    const response = await Axios.get("http://localhost:5000/login");
    setData(response.data);
  }
  useEffect(()=>{
    getData()
  }, []);

  return (
    <div>{data}</div>
  )
}

export default Api