import React,{useState} from "react";
import { Card, Image, Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import EditProduct from './EditProduct'

const ProductsCard = (props) => {
  const [openEdit, setOpenEdit] = useState(false)

  function handleEditClose(){
    openEdit ? setOpenEdit(false): setOpenEdit(true);
  }

  console.log(`gej i karit ${!openEdit}`)
  return (
    <Card>
      <Link to={`/products/${props.id}`}>
        <Image src={props.image} alt={props.fullName} wrapped ui={false} />
        
        <Card.Content>
          <Card.Header>{props.name}</Card.Header>
          <Card.Description>{props.type}</Card.Description>
          <Card.Description>{props.price}</Card.Description>
          <Card.Meta>{props.amount.stock}</Card.Meta>
          <Card.Meta>{props.amount.ordered}</Card.Meta>
          <Card.Meta>{props.amount.preOrdered}</Card.Meta>
          <Card.Meta>{props.creator}</Card.Meta>
        </Card.Content>
        </Link>
        <Modal
          onClose={()=> setOpenEdit(false)}
          onOpen={()=> setOpenEdit(true)}
          open={openEdit}
          trigger={

          <Button
            basic
            color="green"
            content="Edit"
            onClick={handleEditClose}
          />
        
          }
        >
          <Modal.Header>
            Edit Product
          </Modal.Header>
          <EditProduct closeForm={handleEditClose} {...props}>

          </EditProduct>


        </Modal>
        <Button basic color="red" content="Delete" />
      
    </Card>
  );
};

export default ProductsCard;
