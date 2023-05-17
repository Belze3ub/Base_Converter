import { useState } from 'react';
import Button from './Button';

interface Bases {
  [key: string]: string;
}

const Input = () => {
  // const [binary, setBinary] = useState('');
  // const [decimal, setDecimal] = useState('');
  // const [octal, setOctal] = useState('');
  // const [hexadecimal, setHexadecimal] = useState('');
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
      hexadecimal: /^0-9a-fA-F]+$/,
    };

    validInputs.forEach(input => {
      if(input === from && (e.target.value === '' || validRegex[input].test(e.target.value))) {
        // eval(`set${from[0].toUpperCase() + from.slice(1)}(e.target.value)`);
        setBases((prevBases) => ({ ...prevBases, [from]: e.target.value }));
      }
    })

    // const readInput = (from: string, regex: RegExp) => {
    //   if (
    //     (from === 'binary' || from === 'decimal' || from === 'octal' || from === 'hexadecimal') &&
    //     (e.target.value === '' || regex.test(e.target.value))
    //   ) {
    //     eval(`set${from[0].toUpperCase() + from.slice(1)}(e.target.value)`);
    //   }
    // };
    // const validBinary = /[01]+$/;
    // const validDecimal = /[0-9]+$/;
    // const validOctal = /[0-8]+$/;
    // const validHexadecimal = /[0-9a-fA-F]+$/;

    // readInput(from, validBinary);
    // readInput(from, validDecimal);
    // readInput(from, validOctal);
    // readInput(from, validHexadecimal);
    // if (
    //   from === 'binary' &&
    //   (e.target.value === '' || validBinary.test(e.target.value))
    // ) {
    //   setBinary(e.target.value);
    // }
    // if (
    //   from === 'decimal' &&
    //   (e.target.value === '' || validDecimal.test(e.target.value))
    // ) {
    //   setDecimal(e.target.value);
    // }
    // if (
    //   from === 'octal' &&
    //   (e.target.value === '' || validOctal.test(e.target.value))
    // ) {
    //   setOctal(e.target.value);
    // }
    // if (
    //   from === 'hexadecimal' &&
    //   (e.target.value === '' || validHexadecimal.test(e.target.value))
    // ) {
    //   setHexadecimal(e.target.value);
    // }
  };

  // const convert = (from: string, to: string, value: string) => {
  //   if (!from) return '';
  //   if (from === 'binary') {
  //     if (to === 'decimal') {
  //       setDecimal(parseInt(value, 2).toString(10));
  //     }
  //     if (to === 'octal') {
  //       setOctal(parseInt(value, 2).toString(8));
  //     }
  //     if (to === 'hexadecimal') {
  //       setHexadecimal(parseInt(value, 2).toString(16).toUpperCase());
  //     }
  //   }
  //   if (from === 'decimal') {
  //     if (to === 'binary') {
  //       setBinary(parseInt(value, 10).toString(2));
  //     }
  //     if (to === 'octal') {
  //       setOctal(parseInt(value, 10).toString(8));
  //     }
  //     if (to === 'hexadecimal') {
  //       setHexadecimal(parseInt(value, 10).toString(16).toUpperCase());
  //     }
  //   }
  //   if (from === 'octal') {
  //     if (to === 'binary') {
  //       setBinary(parseInt(value, 8).toString(2));
  //     }
  //     if (to === 'decimal') {
  //       setDecimal(parseInt(value, 8).toString(10));
  //     }
  //     if (to === 'hexadecimal') {
  //       setHexadecimal(parseInt(value, 8).toString(16).toUpperCase());
  //     }
  //   }
  //   if (from === 'hexadecimal') {
  //     if (to === 'binary') {
  //       setBinary(parseInt(value, 16).toString(2));
  //     }
  //     if (to === 'octal') {
  //       setOctal(parseInt(value, 16).toString(8));
  //     }
  //     if (to === 'decimal') {
  //       setDecimal(parseInt(value, 16).toString(10).toUpperCase());
  //     }
  //   }
  // };

  const convert = (from: string, to: string, value: string) => {
    if (!from) return '';

    type Conversions = {
      [key: string]: { [key: string]: string };
    };

    const conversions: Conversions = {
      binary: {
        decimal: parseInt(value, 2).toString(10),
        octal: parseInt(value, 2).toString(8),
        hexadecimal: parseInt(value, 2).toString(16),
      },
      decimal: {
        binary: parseInt(value, 10).toString(2),
        octal: parseInt(value, 10).toString(8),
        hexadecimal: parseInt(value, 10).toString(16),
      },
      octal: {
        binary: parseInt(value, 8).toString(2),
        decimal: parseInt(value, 8).toString(10),
        hexadecimal: parseInt(value, 8).toString(16),
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueFrom) convert(from, to, valueFrom);
  };

  // const value = (from: string): string | undefined => {
  //   if (from === 'binary') return binary;
  //   if (from === 'octal') return octal;
  //   if (from === 'decimal') return decimal;
  //   if (from === 'hexadecimal') return hexadecimal;
  //   return undefined;
  // };

  const value = (from: string) => bases[from];

  // const valueTo = (to: string): string | undefined => {
  //   if (to === 'binary') return binary;
  //   if (to === 'octal') return octal;
  //   if (to === 'decimal') return decimal;
  //   if (to === 'hexadecimal') return hexadecimal;
  //   return undefined;
  // };

  const valueTo = value(to);
  const valueFrom = value(from);

  // const valueToo = valueTo(to);
  // const valueFrom = value(from);

  // const resetInputs = () => {
  //   setBinary('');
  //   setDecimal('');
  //   setOctal('');
  //   setHexadecimal('');
  // };

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
          <label htmlFor="from">From</label>
          <select
            name=""
            id="from"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              resetInputs();
            }}
          >
            {validInputs.map((input) => (
              <option key={input} value={input}>
                {input[0].toUpperCase() + input.slice(1)}
              </option>
            ))}
          </select>
          <label htmlFor="to">To</label>
          <select
            name=""
            id="to"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              resetInputs();
            }}
          >
            {validInputs.map((input) => (
              <option key={input} value={input}>
                {input[0].toUpperCase() + input.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="binary">Enter Binary number</label>
        <input
          type="text"
          id="binary"
          value={valueFrom}
          onChange={(e) => handleChange(e, from)}
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
        <input name="" id="decimal" readOnly value={valueTo}></input>
      </div>
    </div>
  );
};
export default Input;
