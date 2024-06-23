import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../redux/Store';
import { addItem, removeItem } from '../../redux/slice/Basket';
import { closeModal } from '../../redux/slice/Modal';

import { BasketItem } from '../../interfaces/Basket';
import { Modifier } from '../../interfaces/Menu';

import { HiMinusCircle } from 'react-icons/hi';
import { HiPlusCircle } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

export default function Basket() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.basket);
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const calculateItemPrice = (item: BasketItem): number => {
    let itemPrice = item.price;

    if (item.modifiers) {
      item.modifiers.forEach((modifier) => {
        const selectedOption = modifier.items.find((option) => option.id === modifier.selectedOptionId);
        if (selectedOption) {
          itemPrice += selectedOption.price;
        }
      });
    }

    return itemPrice * item.quantity;
  };

  const totalAmount = items.reduce((total, item) => total + calculateItemPrice(item), 0);

  const handleAddItem = (item: BasketItem) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item: BasketItem) => {
    dispatch(removeItem({ id: item.id, modifiers: item.modifiers }));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsLargeScreen(true);
      } else {
        setIsLargeScreen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isOpen && !isLargeScreen) return null;

  return (
    <div className={`lg:w-96 lg:bg-white lg:shadow-xl ${isLargeScreen ? 'lg:absolute lg:top-5 lg:right-4 lg:h-auto lg:overflow-y-auto lg:z-0' : 'lg:relative'}`}>
      <div className='flex justify-center items-center w-full h-screen z-0 fixed top-0 left-0 right-0 bottom-0 bg-none lg:relative lg:h-full lg:w-96'>
        <div className='w-full h-screen bg-white lg:h-full lg:shadow-xl'>
          <div className='w-full h-16 flex items-center border-b'>
            <h2 className='relative flex w-full items-center justify-center font-medium text-lg'>Basket</h2>
            {!isLargeScreen && (
              <button onClick={handleClose} className='absolute right-7 bg-none border-none text-md cursor-pointer'>
                <IoClose />
              </button>
            )}
          </div>
          {items.length === 0 ? (
            <div className='flex p-5'>
              Seu carrinho está vazio
            </div>
          ) : (
            <>
              <ul>
                {items.map((item: BasketItem) => (
                  <li key={`${item.id}-${JSON.stringify(item.modifiers)}`} className='flex flex-col p-5 gap-3 w-full h-auto border-y'>
                    <div className='flex w-full items-center justify-between'>
                      <h3 className='font-normal'>{item.name}</h3>
                      <p className='font-medium'>{formatPrice(calculateItemPrice(item))}</p>
                    </div>
                    {item.modifiers && item.modifiers.length > 0 && (
                      <div>
                        {item.modifiers.map((modifier: Modifier) => (
                          <div key={modifier.id} className='flex gap-1 -mt-3 font-normal text-gray-500'>
                            <span>
                              {modifier.items.find((opt) => opt.id === modifier.selectedOptionId)?.name}
                            </span>
                            <span>
                              {'(+' + formatPrice(modifier.items.find((opt) => opt.id === modifier.selectedOptionId)?.price || 0) + ')'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className='relative flex items-center gap-4'>
                      <button onClick={() => handleRemoveItem(item)} className='text-2xl text-[#4F372F]'><HiMinusCircle /></button>
                      <p className='font-bold'>{item.quantity}</p>
                      <button onClick={() => handleAddItem(item)} className='text-2xl text-[#4F372F]'><HiPlusCircle /></button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='w-full h-full px-5 bg-gray-100 lg:h-auto'>
                <div className='flex py-5 justify-between'>
                  <h3>Sub total</h3>
                  <p className='font-medium'>{formatPrice(totalAmount)}</p>
                </div>
                <div className='w-full border-b'></div>
                <div className='flex py-5 justify-between'>
                  <h3 className='font-light text-2xl'>Total:</h3>
                  <p className='font-bold text-2xl'>{formatPrice(totalAmount)}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
