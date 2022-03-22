
import {Toast} from 'react-bootstrap';
import React, {useState, useEffect, useContext} from 'react';

export const Notify = ({state, message}) =>{
  const [show, setShow] = useState(state);
  
  const toggleShowA = () => setShow(!state);

return(
  <Toast show={show} onClose={toggleShowA}>
  <Toast.Header>
    <img
      src="holder.js/20x20?text=%20"
      className="rounded me-2"
      alt=""
    />
    <strong className="me-auto">Bootstrap</strong>
    <small>11 mins ago</small>
  </Toast.Header>
  <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
</Toast>
)
   
}