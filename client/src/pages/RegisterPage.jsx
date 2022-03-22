import React, {useState} from 'react';
import {useHttp} from '../hooks/http.hook'
import {useNavigate} from 'react-router-dom'
import {Form, Button, Container, Card, Alert} from 'react-bootstrap'

export const RegisterPage = () =>{
    const navigate = useNavigate()
    const {error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email:'', password:''
    })

    const [notice, setNotice] = useState(null)

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const loginHandler=()=>{
        navigate('/login')
    }
    const registerHandler = async ()=>{
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            setNotice(data.message)
            clearError()
        } catch (e) {}
    
        }

    return (
        <Container >
    
<Card style={{ width: '20rem' }}>
  <Card.Body>
    <Card.Title>Регистрация</Card.Title>

    <Form>
  <Form.Group className="mb-3" >
    <Form.Label>Email</Form.Label>
    <Form.Control type="text" 
    required
                    placeholder="Введите email"
                    id="email" 
                    name="email"
                    className="validate" 
                    onChange={changeHandler}
                    value={form.email}  />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Пароль</Form.Label>
    <Form.Control type="password"  
                    required
                    placeholder="Введите пароль" 
                    id="password" 
                    name="password"
                    className="validate"
                    onChange={changeHandler}
                    value={form.password}
                    />
  </Form.Group>

  
  <Button variant="primary"  
        className="btn yellow darken-4" 
        style={{marginRight: 10}}
        onClick={registerHandler}
       >
    Зарегистрироваться
  </Button>
  <Card.Link onClick={loginHandler}>Вход</Card.Link>
</Form>
{notice&&<Alert variant="info" style={{marginTop:'20px'}}>{notice}</Alert>}
{error&&<Alert variant="danger" style={{marginTop:'20px'}}>{error}</Alert>}

  </Card.Body>
</Card>



</Container>
)
}