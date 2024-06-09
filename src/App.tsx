import { useState } from 'react';
import { MAX_NUMBER_CONVERTED, NumbersInFrench } from './NumbersInFrench';

function App() {
  const [input, setInput] = useState<string>("")
  const [result, setResult] = useState<(string | undefined)[] | undefined>(undefined)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

  function handleInputChange(event: React.FormEvent<HTMLTextAreaElement>) {
    const value = event.currentTarget.value
    setInput(value)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Clear error message
    setErrorMessage(undefined)
    try {
      const parsedInput = JSON.parse(input)
      if (!Array.isArray(parsedInput)) {
        throw new Error("Input should be an array")
      }
      const res = parsedInput.map((n) => NumbersInFrench.convert(n))
      setResult(res)
    } catch (e) {
      setResult(undefined)
      setErrorMessage(`${e}`)
    }
  }



  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: "30px", marginTop: "50px" }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label>Enter an array of numbers you want to convert in French (numbers from 0 to {MAX_NUMBER_CONVERTED}):</label>
        <textarea
          value={input}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Convert</button>
      </form>
      {errorMessage ? (<div style={{ color: 'red' }}>{errorMessage} </div>) : (<div>{JSON.stringify(result)}</div>)}
    </div>
  );
}

export default App;
