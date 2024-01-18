<template>
  <div>
    <!-- The input field that captures user input for the autocomplete feature. 
         The getCompletions method is invoked on input to fetch suggestions. -->
    <input @input="getCompletions" :value="complete" />

    <!-- The list that displays autocomplete suggestions. Each word is clickable,
         and clicking on a word will populate the input field with that word. -->
    <div v-for="word in completing.splice(0,5)" id="wordlist">
      <p @click="changeValue(word)">{{ word }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      complete: '',      // Stores the current input value entered by the user.
      completing: []   // Holds the list of autocomplete suggestions received from the server.
    };
  },
  methods: {
    /**
     * Fetches autocomplete suggestions based on user input.
     * 
     * @param {Event} event - The input event from the user.
     */
    async getCompletions(event) {
      this.complete = event.target.value;  // Update the input value with the user's input.
      
      // Prepare the request body with the current input value.
      const body = {
        msg: this.complete
      };
      
      // Send a POST request to the server to retrieve autocomplete suggestions.
      const response = await axios.post('http://localhost:5000', body);
      
      // Update the completing data property with the suggestions from the server.
      this.completing = response.data;
      if (this.complete === ''){
        this.completing = []
      }
    },
    
    /**
     * Updates the input field value with the clicked suggestion.
     * 
     * @param {String} word - The word clicked by the user from the suggestion list.
     */
    changeValue(word) {
      this.complete = word;  // Update the input value with the selected word.
      this.completing = []
    }
  }
};
</script>

<style>
/* Styling for autocomplete suggestion words */
p {
  color: black;
  font-weight: bold;
}

/* Styling for the container of the autocomplete suggestion list */
#wordlist {
  background-color: white;
  box-shadow: 1.5px 1.5px 1.5px lightblue;
}
</style>
