import React from 'react';
import {Card, Table, CloseButton} from 'react-bootstrap'

const ItemsList = ({items, itemName, type, delFunc}) => {
const delHandler = (e) => {
    if (window.confirm('Вы уверены, что хотите удалить позицию?')){
    delFunc(e.target.value)
    }
}
    return (
        <>
       <Card>
  <Card.Header>Добавленные</Card.Header>
  <Card.Body>
    <blockquote className="blockquote mb-0">
  
      <Table striped bordered hover size="md">
            <tbody>
            {items.map(item=>  
            <tr key={item._id}>
                <td key={item._id}>
                <CloseButton key={item._id} value={item._id} onClick={delHandler}/>
                {item[itemName]}  {type==="product" && <>({item.category_name})</>} 
                </td>
            </tr>)}
            </tbody>
        </Table>
   
    </blockquote>
  </Card.Body>
</Card>
        </>
    );
};

export default ItemsList;