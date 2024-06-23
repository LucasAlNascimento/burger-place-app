import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/Store';
import { closeMenuDetail, selectModifierOption } from '../../redux/slice/MenuDetail';
import { addItem } from '../../redux/slice/Basket';
import { Modifier, ModifierOption } from '../../interfaces/Menu';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { IoIosCloseCircle } from "react-icons/io";



const MenuDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, selectedItem, selectedModifiers } = useSelector((state: RootState) => state.menuDetail);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !selectedItem) return null;

  if (!selectedItem) {
    return null;
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const handleSelectModifierOption = (modifierId: number, optionId: number) => {
    dispatch(selectModifierOption({ modifierId, optionId }));
  };

  const handleCloseModal = () => {
    dispatch(closeMenuDetail());
  };

  const handleAddToBasket = () => {
    if (selectedItem) {
      const itemToAdd = {
        ...selectedItem,
        quantity: quantity,
        modifiers: selectedItem.modifiers?.map((modifier) => ({
          ...modifier,
          selectedOptionId: selectedModifiers[modifier.id],
        })),
      };
      dispatch(addItem(itemToAdd));
      dispatch(closeMenuDetail());
    }
  };


  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex justify-center items-center w-full h-auto fixed top-0 left-0 right-0 bottom-0 bg-none">
        <div className='w-full h-screen bg-white'>
          <div className='h-64 overflow-hidden'>
            {selectedItem.images && selectedItem.images.length > 0 && (
              <img src={selectedItem.images[0]?.image} alt={selectedItem.name} className='flex w-full items-center justify-center -mt-14' />
            )}
            <img src="public/assets/closeicon.svg"onClick={handleCloseModal} className='text-4xl absolute text-white top-7 right-3 cursor-pointer'/>
          </div>
          <div className='flex flex-col w-full'>
            <h2 className="p-5 text-xl font-bold">{selectedItem.name}</h2>
            <p className='px-5 text-gray-600 -mt-3'>{selectedItem.description}</p>
            {selectedItem.modifiers && selectedItem.modifiers.length > 0 && (
              <div className='mt-5'>
                <div className='w-full bg-gray-100 px-5 py-3'>
                  <h3 className="font-bold">Choose your size</h3>
                  <h4 className='font-light -mt-1'>Select 1 option</h4>
                </div>
                <div className='px-5 mt-4'>
                  {selectedItem.modifiers.map((modifier: Modifier) => (
                    <div key={modifier.id} className=''>
                      <ul>
                        {modifier.items.map((option: ModifierOption) => (
                          <li key={option.id} className='flex justify-between items-center mb-2'>
                            <label htmlFor={`modifier_${modifier.id}_option_${option.id}`} className='flex flex-col'>
                              <p className='font-medium'>{option.name}</p>
                              <p className='text-gray-700 font-normal'>{formatPrice(option.price)}</p>
                            </label>
                            <input
                              type="radio"
                              id={`modifier_${modifier.id}_option_${option.id}`}
                              name={`modifier_${modifier.id}`}
                              checked={selectedModifiers[modifier.id] === option.id}
                              onChange={() => handleSelectModifierOption(modifier.id, option.id)}
                              className='appearance-none h-5 w-5 border-gray-500 border-[3px] rounded-full checked:text-gray-600 checked:bg-black'
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className='flex flex-col absolute bottom-0 justify-center w-full h-40 bg-gray-100 px-12 gap-2 border-t border-gray-200'>

          <div className='flex items-center justify-center gap-4'>
            <button onClick={() => handleQuantityChange(-1)} className='text-4xl text-gray-400'><HiMinusCircle /></button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)} className='text-4xl text-[#4F372F]'><HiPlusCircle /></button>
          </div>
          <button onClick={handleAddToBasket} className='w-full h-10 bg-[#4F372F] text-white p-2 mt-2 rounded-[40px]'>
            Add to Order
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
