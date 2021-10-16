import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface Food{
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

interface PropsPage{
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Food)=> Promise<void>;
}

const ModalAddFood = (props: PropsPage ):JSX.Element => {
  /* constructor(props) {
    super(props);

    this.formRef = createRef();
  }

  handleSubmit = async data => {
    const { setIsOpen, handleAddFood } = this.props;

    handleAddFood(data);
    setIsOpen();
  };
 */

  const formRef = useRef(null);

  const handleSubmit = async (data: Food) => {
    props.handleAddFood(data);
    props.setIsOpen();
  }
  
  return (
    <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
