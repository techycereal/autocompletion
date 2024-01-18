import './App.css';
import { useState } from 'react';
import axios from 'axios';

/**
 * The main App component that includes an input field and displays autocomplete suggestions.
 */
function App() {
  // State hook for the user's input
  const [userInput, setUserInput] = useState('');

  // State hook for the list of autocomplete suggestions
  const [completion, setCompletion] = useState([]);

  /**
   * Handles input changes, fetches autocomplete suggestions, and updates the state.
   * 
   * @param {Event} event - The event triggered by input changes.
   */
  async function changeInput(event){
    // Update the userInput state with the current value of the input field
    setUserInput(event.target.value);
    console.log(event.target.value); // Log the current input for debugging

    // Short-circuit the function if the input is empty
    if (event.target.value === ''){
      setCompletion([]);
      return;
    }

    // Prepare the request body with the current input value
    const body = {
      'msg': event.target.value
    };

    // Send a POST request to the server to retrieve autocomplete suggestions
    const request = await axios.post('http://localhost:5000', body);

    // Update the completion state with the suggestions from the server
    setCompletion(request.data);
  }

  /**
   * Sets the input field value to the selected autocomplete suggestion and clears suggestions.
   * 
   * @param {string} item - The selected autocomplete suggestion.
   */
  function setValue(item){
    // Update the userInput state with the selected item
    setUserInput(item);

    // Clear the completion state to hide the suggestion list
    setCompletion([]);
  }

  return (
    <div className="App">
      {/* Input field for capturing user input */}
      <input onChange={changeInput} value={userInput}/>
      
      {/* Display the current userInput */}
      <p>{userInput}</p>
      
      {/* Suggestion container */}
      <div style={{marginLeft: "41%"}}>
        {/* Map through the completion array and display each suggestion */}
        {completion.map((item, index) => (
          <div key={index} style={{backgroundColor: "white", boxShadow: "1.5px 1.5px 1.5px lightblue", width: "30%"}}>
            <p onClick={() => setValue(item)}>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
