import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link, useLocation } from "react-router-dom";

import "./styles.css";

export default function Profile() {
  const location = useLocation();
  const [devData, setDevData] = useState({
    _id: "",
    name: "",
    githubProfile: "",
    age: "",
    city: "",
    country: "",
    avatar_url: "",
    bio: "",
    public_repos: "",
    followers: "",
  });

  useEffect(() => {
    console.log("location", location);
    setDevData(location?.state);
  }, [location]);

  return (
    <div id="profile-container">
      <Link to="/">
        <ArrowBackIcon id="back-icon" />
      </Link>
      <div id="profile-content">
        <img src={devData.avatar_url} alt="" />
        <h1>{devData.name}</h1>
        <p>{devData.bio}</p>

        <div id="profile-infos">
          <div className="infos">
            <p>
              <strong>Idade: </strong>
              {devData.age}
            </p>
            <p>
              <strong>Cidade: </strong>
              {devData.city}
            </p>
            <p>
              <strong>País: </strong>
              {devData.country}
            </p>
          </div>
          <div className="infos left">
            <p>
              <strong>Empresa: </strong>
              {devData.company}
            </p>
            <p>
              <strong>Repositórios: </strong>
              {devData.public_repos}
            </p>
            <p>
              <strong>Seguidores: </strong>
              {devData.followers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
