import React, { useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";

import { AuthContext } from "../context/AuthContext";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const auth = useContext(AuthContext);

  const { loading, error, request, clearError } = useHttp();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = () => {
    navigate("/register");
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
      clearError();
    } catch (e) {}
  };

  return (
    <Container>
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title>Вход</Card.Title>
          lkasdkljdsalkjadskjlasdkjl
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите email"
                id="email"
                name="email"
                className="validate"
                onChange={changeHandler}
                value={form.email}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                id="password"
                name="password"
                className="validate"
                onChange={changeHandler}
                value={form.password}
              />
            </Form.Group>
            <Button
              variant="primary"
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
            </Button>
            <Card.Link style={{ cursor: "pointer" }} onClick={registerHandler}>
              Регистрация
            </Card.Link>
          </Form>
          {error && (
            <Alert variant="danger" style={{ marginTop: "20px" }}>
              {error}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
