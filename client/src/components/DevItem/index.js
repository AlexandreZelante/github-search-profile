import React from "react";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

import "./styles.css";

export default function DevItem({ dev }) {
  const history = useHistory();

  async function handleProfile() {
    console.log("dev", dev);
    const response = await api.get(`/dev/${dev.githubProfile}`);

    history.push("/profile", response.data);
  }

  return (
    <li className="dev-item" onClick={() => handleProfile()}>
      <div>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="dev-info">
          <strong>{dev.name}</strong>
          <span>{dev.githubProfile}</span>
        </div>
      </div>
    </li>
  );
}
