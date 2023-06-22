import { useState } from 'react';
import Button from './Button';

interface Bases {
  [key: string]: string;
}

const Input = () => {
  const [bases, setBases] = useState<Bases>({
    binary: '',
    decimal: '',
    octal: '',
    hexadecimal: '',
  });
  const [from, setFrom] = useState('binary');
  const [to, setTo] = useState('decimal');
  const validInputs = ['binary', 'decimal', 'octal', 'hexadecimal'];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    from: string
  ) => {
    const validRegex: { [key: string]: RegExp } = {
      binary: /^[01]+$/,
      decimal: /^[0-9]+$/,
      octal: /^[0-7]+$/,
      hexadecimal: /^[0-9a-fA-F]+$/,
    };

    validInputs.forEach(input => {
      if (
        input === from &&
        (e.target.value === '' || validRegex[from].test(e.target.value))
      ) {
        setBases((prevBases) => ({ ...prevBases, [from]: e.target.value }));
        console.log(validRegex[from].test(e.target.value));
      }
    })
  };


  const convert = (from: string, to: string, value: string) => {
    if (!from) return '';

    interface Conversions {
      [key: string]: { [key: string]: string };
    };

    const conversions: Conversions = {
      binary: {
        decimal: parseInt(value, 2).toString(10),
        octal: parseInt(value, 2).toString(8),
        hexadecimal: parseInt(value, 2).toString(16).toUpperCase(),
      },
      decimal: {
        binary: parseInt(value, 10).toString(2),
        octal: parseInt(value, 10).toString(8),
        hexadecimal: parseInt(value, 10).toString(16).toUpperCase(),
      },
      octal: {
        binary: parseInt(value, 8).toString(2),
        decimal: parseInt(value, 8).toString(10),
        hexadecimal: parseInt(value, 8).toString(16).toUpperCase(),
      },
      hexadecimal: {
        binary: parseInt(value, 16).toString(2),
        octal: parseInt(value, 16).toString(8),
        decimal: parseInt(value, 16).toString(10),
      },
    };

    if (conversions[from] && conversions[from][to]) {
      setBases((prevValues) => ({
        ...prevValues,
        [to]: conversions[from][to],
      }));
    }
  };

  const valueFrom = bases[from];
  const valueTo = bases[to];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueFrom) convert(from, to, valueFrom);
  };

  const resetInputs = () => {
    setBases({
      binary: '',
      decimal: '',
      octal: '',
      hexadecimal: '',
    });
  };

  return (
    <div className="convert">
      <form className="flex" onSubmit={handleSubmit}>
        <div className="systems">
          <div className="from">
            <label htmlFor="from">From</label>
            <select
              name=""
              id="from"
              value={from}
              onChange={(e) => {
                setFrom(e.target.value);
                // resetInputs();
              }}
            >
              {validInputs.map((input) => (
                <option key={input} value={input}>
                  {input[0].toUpperCase() + input.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="to">
            <label htmlFor="to">To</label>
            <select
              name=""
              id="to"
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
                // resetInputs();
              }}
            >
              {validInputs.map((input) => (
                <option key={input} value={input}>
                  {input[0].toUpperCase() + input.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <label htmlFor="binary">From Base</label>
        <input
          type="text"
          id="binary"
          value={valueFrom}
          onChange={(e) => handleChange(e, from)}
        />
        <div className='btn-container'>
          <Button className="btn conv" children="Convert" />
          <Button
            className="btn clear"
            onClick={resetInputs}
            children="Clear"
          />
        </div>
      </form>
      <div className="flex">
        <label htmlFor="decimal">To Base</label>
        <input name="" id="decimal" readOnly value={valueTo}></input>
      </div>
    </div>
  );
};
export default Input;
