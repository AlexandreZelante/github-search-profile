import React, { useState, useEffect } from "react";
import DevForm from "../../components/DevForm";
import DevItem from "../../components/DevItem";
import api from "../../services/api";

import "./styles.css";

export default function Dashboard() {
  const [devs, setDevs] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get("/dev").then(response => {
      console.log("Request", response.data);
      setDevs(response.data);
    });
  }, []);

  async function handleCreateDev(dev) {
    const response = await api.post("/dev", dev);

    if (response.data) {
      const newDevs = [response.data, ...devs];

      setDevs(newDevs);
      setError(false);
    } else {
      setError(true);
    }

    console.log(dev);
  }

  return (
    <div className="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm handleCreateDev={handleCreateDev} />
        {error && <p>Usuário já existe!</p>}
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}
