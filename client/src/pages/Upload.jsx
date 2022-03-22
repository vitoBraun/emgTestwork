
import React, {useState, useEffect, useRef,useContext} from 'react';
import {AuthContext} from '../context/AuthContext'
import {Form, Container, Button, Col, Alert} from 'react-bootstrap'
import  axios from 'axios'

export const Upload = () =>{
    const auth = useContext(AuthContext)
    const {token} = useContext(AuthContext)
    const [textValue, setTextValue] = useState('');
  
    const [error , setError] = useState(false);
    const [fileAdded, setFileAdded] = useState(false);
    const [buttonDisabled, setButtonDisabled]= useState(true)

    const [img, setImg] = useState(null)

    const inputRef = useRef();

    const CheckAllErrors = ()=>{
      if (textValue!== '' & img!==null) {
        setButtonDisabled(false)
      }
      else{
        setButtonDisabled(true)
      }
    }
  
    useEffect(()=>{
      CheckAllErrors()
    })

    const submitPic = async () =>{
        try {
            const formData = new FormData();
            formData.append('image', img)
            formData.append('text', textValue)
            formData.append('userId', auth.userId)
            await axios.post('/api/upload', formData, {headers:{'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`}}).then((res)=>{
              setError(res.data.message)
              if (res.data.success === true){
                setTextValue('')
                inputRef.current.value = null
                setImg(null)
                setFileAdded(true)
              }
            })

        } catch (error) {
          setError('Ошибка подключения к серверу')
        }
      }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        submitPic()
      };

    const onTextChange=(event)=>{
        setError(false)
        const slicedValue = event.target.value.slice(0,50).replace(/[0-9]/, '')
     
        const textLength = event.target.value.length
        setTextValue(slicedValue)
        if((textLength===50)){
          setTextValue(slicedValue.slice(0,-1))
          setError('Слишком длинный текст')
        }
    }

    return (<>
    <Container style={{marginTop:'20px'}}>
    <Form onClick={()=>{
      setFileAdded(false)
      setError(false)
      }}>
    <Form.Group as={Col} controlId="validationCustom01">
          <Form.Label>Введите текст(макс. 50 символов)</Form.Label>
          <Form.Control
          name="text"
          as='textarea'
          placeholder="Введите текст"
          rows={2}
          onChange={onTextChange}
          value={textValue}
          />

        </Form.Group>
    
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Выберите фаил(только JPG, PNG или GIF)</Form.Label>
          <Form.Control
            type="file"
            placeholder="Файл"
            onChange={e=>{
                setImg(e.target.files[0]); 
                }}
            ref={inputRef}
          />

        </Form.Group>
  <Button  onClick={handleSubmit} disabled={buttonDisabled} style={{marginTop:'20px'}}>Добавить</Button>
    </Form>
    {fileAdded && <Alert variant="success" style={{marginTop:'20px'}}>Файл с текстом добавлены</Alert>}
    {error && <Alert variant="danger" style={{marginTop:'20px'}}>{error}</Alert>}
    </Container>
    </>)
}