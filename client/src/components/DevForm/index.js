import React, { useState } from "react";

import "./styles.css";

export default function DevForm({ handleCreateDev }) {
  const [name, setName] = useState("");
  const [githubProfile, setGithubProfile] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await handleCreateDev({ name, githubProfile, age, city, country });

    setName("");
    setGithubProfile("");
    setAge("");
    setCity("");
    setCountry("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="name">Nome</label>
        <input
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        ></input>
      </div>

      <div className="input-block">
        <label htmlFor="name">Perfil Github</label>
        <input
          name="name"
          value={githubProfile}
          onChange={e => setGithubProfile(e.target.value)}
        ></input>
      </div>

      <div className="input-block">
        <label htmlFor="name">Idade</label>
        <input
          name="name"
          value={age}
          onChange={e => setAge(e.target.value)}
        ></input>
      </div>

      <div className="input-block">
        <label htmlFor="name">Cidade</label>
        <input
          name="name"
          value={city}
          onChange={e => setCity(e.target.value)}
        ></input>
      </div>

      <div className="input-block">
        <label htmlFor="name">País</label>
        <input
          name="name"
          value={country}
          onChange={e => setCountry(e.target.value)}
        ></input>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}
