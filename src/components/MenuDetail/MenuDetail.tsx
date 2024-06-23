import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/Store';
import { closeMenuDetail, selectModifierOption } from '../../redux/slice/MenuDetail';
import { addItem } from '../../redux/slice/Basket';
import { Modifier, ModifierOption } from '../../interfaces/Menu';

const MenuDetail: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, selectedItem, selectedModifiers } = useSelector((state: RootState) => state.menuDetail);

  if (!isOpen || !selectedItem) return null;

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
        modifiers: selectedItem.modifiers?.map((modifier) => ({
          ...modifier,
          selectedOptionId: selectedModifiers[modifier.id],
        })),
      };
      dispatch(addItem(itemToAdd));
      dispatch(closeMenuDetail());
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl font-bold">{selectedItem.name}</h2>
        <p>{selectedItem.description}</p>
        <p>{selectedItem.price}</p>

        {selectedItem.modifiers && selectedItem.modifiers.length > 0 && (
          <div>
            <h3 className="font-bold">Choose your options:</h3>
            {selectedItem.modifiers.map((modifier: Modifier) => (
              <div key={modifier.id}>
                <h4>{modifier.name}</h4>
                <ul>
                  {modifier.items.map((option: ModifierOption) => (
                    <li key={option.id}>
                      <input
                        type="radio"
                        id={`modifier_${modifier.id}_option_${option.id}`}
                        name={`modifier_${modifier.id}`}
                        checked={selectedModifiers[modifier.id] === option.id}
                        onChange={() => handleSelectModifierOption(modifier.id, option.id)}
                      />
                      <label htmlFor={`modifier_${modifier.id}_option_${option.id}`}>
                        {option.name} (+ ${option.price})
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <button onClick={handleAddToBasket}>Add to Basket</button>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  );
};

export default MenuDetail;
