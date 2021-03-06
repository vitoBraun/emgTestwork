import React, { useState, useEffect } from "react";
import axios from "axios";

import { Container } from "react-bootstrap";

export const LastFile = () => {
  const [lastFile, setLastFile] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const getLastFile = async () => {
    await axios("/api/lastfile").then((res) => {
      if (!isLoaded) {
        setLastFile(res.data);
        setIsLoaded(true);
        console.log(res.data);
      }
    });
  };

  useEffect(() => {
    getLastFile();
  });

  return (
    <>
      <Container style={{ marginTop: "20px" }}>
        Cсылка на JSON: <a href="/api/lastfile">/api/lastfile</a> <br />
        <img
          style={{ maxWidth: "50%" }}
          src={lastFile.link}
          alt={lastFile.text}
        />
        <br />
        Текст:{lastFile.text} <br />
        Создан: {lastFile.created_at}
      </Container>
    </>
  );
};
