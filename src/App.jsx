import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const REVERSE_ON = 'reverse';
const REVERSE_OFF = 'reverse_off';
const SORT_ALPHABETICALLY = 'sortAlphabetically';
const SORT_BY_LENGTH = 'sortByLength';
const RESET = 'reset';

const sortAlphabetically = (a, b) => a.localeCompare(b);
const sortByLength = (a, b) => a.length - b.length;
const reverse = (a, b) => b.localeCompare(a);
const reset = (a, b) => a.localeCompare(b);
const sortFunctions = {
  [SORT_ALPHABETICALLY]: sortAlphabetically,
  [SORT_BY_LENGTH]: sortByLength,
  [REVERSE_ON]: reverse,
  [RESET]: reset,
};

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortType, setSortType] = useState('');
  const [reverseType, setReverseType] = useState('');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SORT_ALPHABETICALLY,
          })}
          onClick={() => {
            let sortGoods = [...goods].sort(sortFunctions[SORT_ALPHABETICALLY]);

            if (reverseType === REVERSE_ON) {
              sortGoods = [...sortGoods].reverse();
            }

            setGoods(sortGoods);

            setSortType(SORT_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            let sortGoods = [...goods].sort(sortFunctions[SORT_BY_LENGTH]);

            if (reverseType === REVERSE_ON) {
              sortGoods = [...sortGoods].reverse();
            }

            setGoods(sortGoods);

            setSortType(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverseType !== REVERSE_ON,
          })}
          onClick={() => {
            const sortedGoods = [...goods];

            if (!sortType) {
              sortedGoods.sort(sortFunctions[SORT_ALPHABETICALLY]);
              setSortType(SORT_ALPHABETICALLY);
            } else if (sortType === SORT_ALPHABETICALLY) {
              sortedGoods.sort(sortFunctions[SORT_ALPHABETICALLY]);
            } else if (sortType === SORT_BY_LENGTH) {
              sortedGoods.sort(sortFunctions[SORT_BY_LENGTH]);
            }

            if (reverseType === REVERSE_ON) {
              setReverseType(REVERSE_OFF);
            } else {
              sortedGoods.reverse();
              setReverseType(REVERSE_ON);
            }

            setGoods(sortedGoods);
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          className={cn('button', 'is-danger', {
            'is-hidden': sortType === '' && reverseType === '',
            'is-light': sortType !== '' || reverseType !== '',
          })}
          onClick={() => {
            setGoods(goodsFromServer);
            setSortType('');
            setReverseType('');
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
