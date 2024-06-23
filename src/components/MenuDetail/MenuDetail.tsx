import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/Store';
import { closeMenuDetail, selectModifierOption } from '../../redux/slice/MenuDetail';
import { addItem } from '../../redux/slice/Basket';
import { MenuItem, Modifier, ModifierOption } from '../../interfaces/Menu';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';

const MenuDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, selectedItem, selectedModifiers } = useSelector((state: RootState) => state.menuDetail);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !selectedItem) return null;

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
        modifiers: selectedItem.modifiers?.map((modifier: Modifier) => ({
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

  const calculateTotalPrice = (): number => {
    let totalPrice = selectedItem.price || 0;
    if (selectedItem.modifiers) {
      selectedItem.modifiers.forEach((modifier: Modifier) => {
        const selectedOptionId = selectedModifiers[modifier.id];
        const selectedOption = modifier.items.find((item: MenuItem) => item.id === selectedOptionId);
        if (selectedOption) {
          totalPrice += selectedOption.price * quantity || 0;
        }
      });
    }
    return totalPrice;
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex justify-center items-center w-full h-screen bg-none lg:w-[480px] lg:h-[720px]">
        <div className='relative w-full h-full bg-white overflow-y-auto'>
          <div className='h-64 overflow-hidden'>
            {selectedItem.images && selectedItem.images.length > 0 && (
              <img src={selectedItem.images[0]?.image} alt={selectedItem.name} className='w-full object-cover h-64' />
            )}
            <img src="public/assets/closeicon.svg" alt="Botão de Fechar" onClick={handleCloseModal} className='absolute top-3 right-3 text-4xl text-white cursor-pointer'/>
          </div>
          <div className='flex flex-col h-auto'>
            <h2 className="p-5 text-xl font-bold">{selectedItem.name}</h2>
            <p className='px-5 text-gray-600'>{selectedItem.description}</p>
            {selectedItem.modifiers && selectedItem.modifiers.length > 0 && (
              <div className='mt-5 flex-1'>
                <div className='w-full bg-gray-100 px-5 py-3'>
                  <h3 className="font-bold">Choose your size</h3>
                  <h4 className='font-light -mt-1'>Select 1 option</h4>
                </div>
                <div className='px-5 mt-4 overflow-y-auto'>
                  {selectedItem.modifiers.map((modifier: Modifier) => (
                    <div key={modifier.id}>
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
          <div className='flex flex-col items-center justify-center bg-gray-100 py-4 px-5 gap-4 border-t border-gray-200 absolute -bottom-14 left-0 right-0'>
            <div className='flex items-center justify-center gap-4'>
              <button onClick={() => handleQuantityChange(-1)} className='text-4xl text-gray-400'><HiMinusCircle /></button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className='text-4xl text-[#4F372F]'><HiPlusCircle /></button>
            </div>
            <button onClick={handleAddToBasket} className='w-full h-10 bg-[#4F372F] text-white rounded-[40px]'>
              Add to Order • {formatPrice(totalPrice)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
