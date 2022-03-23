import React, {useState, useEffect} from 'react';
import {useHttp} from '../hooks/http.hook'
import {useNavigate} from 'react-router-dom'
import {Form, Button, Container, Card, Alert} from 'react-bootstrap'
import validator from 'validator'

export const RegisterPage = () =>{
    const navigate = useNavigate()
    const {error, request, clearError} = useHttp()

    const [buttonDisabled, setButtonDisabled] = useState(true)

    const [inputError, setInputError] = useState(null)
    const [notice, setNotice] = useState(null)

    const [register, setRegister] = useState({
      email: '',
      password: '',
      password2: '',
      }
  )

  useEffect(()=>
  {
    checkValidity()
  })

  const checkValidity = ()=>{
    setButtonDisabled(true)
    setInputError(null)
    if(!validator.isEmail(register.email)) {
      setInputError('Недопустимый email')
    }
    
    if(register.password !== register.password2) {
      setInputError('Пароли не совпадают')
    } 

    if (!inputError){
      setButtonDisabled(false)
    }
  }


  const changeHandler = event => {
    setRegister(
        {
            ...register,
            [event.target.name]: event.target.value,
        }
    )
}

    const loginHandler=()=>{
        navigate('/login')
    }
    const registerHandler = async ()=>{
        try {
            if(!inputError){
              const data = await request('/api/auth/register', 'POST', {...register})
              setNotice(data.message)
              clearError()
            }
            
        } catch (e) {}
    
        }

    return (
        <Container >
    
<Card style={{ width: '20rem' }}>
  <Card.Body>
    <Card.Title>Регистрация</Card.Title>

    <Form >
  <Form.Group className="mb-3" >
    <Form.Label>Email</Form.Label>
    <Form.Control type="text" 
    required
                    placeholder="Введите email"
                    id="email" 
                    name="email"
                    className="validate" 
                    onChange={changeHandler}
                    // value={register.email}  
                    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Пароль</Form.Label>
    <Form.Control type="password"  
                    required
                    placeholder="Введите пароль" 
                    // id="password" 
                    name="password"
                    className="validate"
                    onChange={changeHandler}
                    // value={register.password}
                    />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Пароль</Form.Label>
    <Form.Control type="password"  
                    required
                    placeholder="Введите пароль" 
                    // id="password" 
                    name="password2"
                    className="validate"
                    onChange={changeHandler}
                    // value={register.password2}
                    />
  </Form.Group>
  
  <Button variant="primary"  
        className="btn yellow darken-4" 
        style={{marginRight: 10}}
        onClick={registerHandler}
        disabled={buttonDisabled}
       >
    Зарегистрироваться
  </Button>
  <Card.Link style={{cursor: 'pointer'}}  onClick={loginHandler}>Вход</Card.Link>
</Form>
{notice&&<Alert variant="info" style={{marginTop:'20px'}}>{notice}</Alert>}
{error&&<Alert variant="danger" style={{marginTop:'20px'}}>{error}</Alert>}
{inputError&&<Alert variant="danger" style={{marginTop:'20px'}}>{inputError}</Alert>}

  </Card.Body>
</Card>



</Container>
)
  }