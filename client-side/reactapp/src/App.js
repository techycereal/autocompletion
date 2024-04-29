import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [userInput, setUserInput] = useState('');
  const [completion, setCompletion] = useState([]);

  async function changeInput(event){
    // Update the userInput state with the current value of the input field
    setUserInput(event.target.value);

    // Get the last word from the input or the whole input if it's a single word
    const words = event.target.value.trim().split(/\s+/);
    const lastWord = words[words.length - 1];

    if (lastWord === ''){
      setCompletion([]);
      return;
    }

    const body = { 'msg': lastWord };

    // Send a POST request to the server to retrieve autocomplete suggestions
    try {
      const request = await axios.post('http://localhost:5000', body);
      setCompletion(request.data);
    } catch (error) {
      console.error('Failed to fetch completions:', error);
    }
  }

  function setValue(item){
    const words = userInput.trim().split(/\s+/);
    words.pop();  // Remove the last word
    words.push(item);  // Add the selected completion item
    setUserInput(words.join(' ') + ' ');  // Join words back into a string and append a space
    setCompletion([]);  // Clear the completion state
  }

  return (
    <div className="App">
      <input 
        onChange={changeInput} 
        value={userInput}
        placeholder="Type here..."
      />
      <div style={{marginLeft: "20%"}}>
        {completion.map((item, index) => (
          <div key={index} onClick={() => setValue(item)} style={{ cursor: 'pointer', backgroundColor: "white", boxShadow: "1.5px 1.5px 1.5px lightblue", width: "30%" }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
