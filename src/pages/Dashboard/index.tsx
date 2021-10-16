import { useEffect, useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface Foods{
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}
 
const Dashboard = (): JSX.Element=> {
  /* constructor(props) {
    super(props);
    this.state = {
      foods: [],
      editingFood: {},
      modalOpen: false,
      editModalOpen: false,
    }
  }

  async componentDidMount() {
    const response = await api.get('/foods');

    this.setState({ foods: response.data });
  }

  handleAddFood = async food => {
    const { foods } = this.state;

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      this.setState({ foods: [...foods, response.data] });
    } catch (err) {
      console.log(err);
    }
  }

  handleUpdateFood = async food => {
    const { foods, editingFood } = this.state;

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      this.setState({ foods: foodsUpdated });
    } catch (err) {
      console.log(err);
    }
  }

  handleDeleteFood = async id => {
    const { foods } = this.state;

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    this.setState({ foods: foodsFiltered });
  }

  

  toggleEditModal = () => {
    const { editModalOpen } = this.state;

    this.setState({ editModalOpen: !editModalOpen });
  }

  handleEditFood = food => {
    this.setState({ editingFood: food, editModalOpen: true });
  }
 */
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Foods | null>(null);
  const [foods, setFoods] = useState<Foods[]>([]);

  useEffect(()=>{
    loadFoods();
  },[]);

  const loadFoods = async ()=>{
    const response = await api.get('/foods');
    setFoods(response.data);
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const editModal = () =>{
    setEditModalOpen(!editModalOpen);
  }

  const handleAddFood = async (food:Foods) => {

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      if(response.data){
        setFoods([...foods, response.data]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: Foods) => {

    if(editingFood){

      try {
        const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
        );
        
        /* const foodsUpdated = foods.map(f =>
          f.id !== foodUpdated.data.id ? f : foodUpdated.data,
          ); */

          setFoods(foods.map(f => {
          if(f.id === foodUpdated.data.id){
            console.log('encontrou id: ', foodUpdated.data);
            return foodUpdated.data;
          }

          return f;
        }));

      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleDeleteFood = async (id: number) => {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered );
  }

  const handleEditFood = (food: Foods) => {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  console.log('foods: ', foods);
  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={editModal}
        editingFood={editingFood || undefined}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={()=> handleDeleteFood(food.id)}
              handleEditFood={()=> handleEditFood(food)}
            />
          ))}
      </FoodsContainer>
    </>
  );
  
};

export default Dashboard;
