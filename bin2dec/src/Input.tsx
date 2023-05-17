import { useState } from 'react';
import Button from './Button';

const Input = () => {
  const [binary, setBinary] = useState('');
  const [decimal, setDecimal] = useState('');
  const [octal, setOctal] = useState('');
  const [hexadecimal, setHexadecimal] = useState('');
  const [from, setFrom] = useState('binary');
  const [to, setTo] = useState('decimal');
  const systems = ['binary', 'decimal', 'octal', 'hexadecimal'];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const validBinary = /[01]+$/;
    if (
      from === 'binary' &&
      (e.target.value === '' || validBinary.test(e.target.value))
    ) {
      setBinary(e.target.value);
    }
    const validDecimal = /[0-9]+$/;
    if (
      from === 'decimal' &&
      (e.target.value === '' || validDecimal.test(e.target.value))
    ) {
      setDecimal(e.target.value);
    }
    const validOctal = /[0-8]+$/;
    if (
      from === 'octal' &&
      (e.target.value === '' || validOctal.test(e.target.value))
    ) {
      setOctal(e.target.value);
    }
    const validHexadecimal = /[0-9a-fA-F]+$/;
    if (
      from === 'hexadecimal' &&
      (e.target.value === '' || validHexadecimal.test(e.target.value))
    ) {
      setHexadecimal(e.target.value);
    }
  };

  const convert = (from: string, to: string, value: string) => {
    if (!from) return '';
    if (from === 'binary') {
      if (to === 'decimal') {
        setDecimal(parseInt(value, 2).toString(10));
      }
      if (to === 'octal') {
        setOctal(parseInt(value, 2).toString(8));
      }
      if (to === 'hexadecimal') {
        setHexadecimal(parseInt(value, 2).toString(16));
      }
    }
    if (from === 'decimal') {
      if (to === 'binary') {
        setBinary(parseInt(value, 10).toString(2));
      }
      if (to === 'octal') {
        setOctal(parseInt(value, 10).toString(8));
      }
      if (to === 'hexadecimal') {
        setHexadecimal(parseInt(value, 10).toString(16));
      }
    }
    if (from === 'octal') {
      if (to === 'binary') {
        setBinary(parseInt(value, 8).toString(2));
      }
      if (to === 'decimal') {
        setDecimal(parseInt(value, 8).toString(10));
      }
      if (to === 'hexadecimal') {
        setHexadecimal(parseInt(value, 8).toString(16));
      }
    }
    if (from === 'hexadecimal') {
      if (to === 'binary') {
        setBinary(parseInt(value, 16).toString(2));
      }
      if (to === 'octal') {
        setOctal(parseInt(value, 16).toString(8));
      }
      if (to === 'decimal') {
        setDecimal(parseInt(value, 16).toString(10));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueFrom) convert(from, to, valueFrom);
  };

  const value = (from: string): string | undefined => {
    if (from === 'binary') return binary;
    if (from === 'octal') return octal;
    if (from === 'decimal') return decimal;
    if (from === 'hexadecimal') return hexadecimal;
    return undefined;
  };

  const valueTo = (to: string): string | undefined => {
    if (to === 'binary') return binary;
    if (to === 'octal') return octal;
    if (to === 'decimal') return decimal;
    if (to === 'hexadecimal') return hexadecimal;
    return undefined;
  };
  const valueToo = valueTo(to);
  const valueFrom = value(from);

  const resetInputs = () => {
    setBinary('');
    setDecimal('');
    setOctal('');
    setHexadecimal('');
  };

  return (
    <div className="convert">
      <form className="flex" onSubmit={handleSubmit}>
        <div className="systems">
          <label htmlFor="from">From</label>
          <select
            name=""
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {systems.map((system) => (
              <option key={system} value={system}>
                {system[0].toUpperCase() + system.slice(1)}
              </option>
            ))}
          </select>
          <label htmlFor="to">To</label>
          <select
            name=""
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            {systems.map((system) => (
              <option key={system} value={system}>
                {system[0].toUpperCase() + system.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="binary">Enter Binary number</label>
        <input
          type="text"
          id="binary"
          value={valueFrom}
          onChange={handleChange}
        />
        <div>
          <Button className="btn" color="green" children="Convert" />
          <Button
            className="btn"
            color="grey"
            onClick={resetInputs}
            children="Clear"
          />
        </div>
      </form>
      <div className="flex">
        <label htmlFor="decimal">Decimal number</label>
        <input name="" id="decimal" readOnly value={valueToo}></input>
      </div>
    </div>
  );
};
export default Input;
