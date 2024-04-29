class TrieNode:
    """A node in the trie structure."""

    def __init__(self):
        """Initialize the TrieNode with a children dictionary and an end-of-string flag."""
        self.children = {}  # Dictionary to store child nodes
        self.end_of_string = False  # Flag to indicate the end of a word


class Trie:
    """The Trie data structure."""

    def __init__(self):
        """Initialize the Trie with a root node."""
        self.root = TrieNode()

    def insert_string(self, word):
        """Insert a word into the Trie.

        Args:
            word (str): The word to insert into the Trie.
        """
        current = self.root
        for char in word:
            node = current.children.get(char)
            if node is None:
                node = TrieNode()  # Create a new node if not found
                current.children[char] = node
            current = node
        current.end_of_string = True  # Mark the end of the inserted word

    def search_string(self, word):
        """Search for a word in the Trie.

        Args:
            word (str): The word to search in the Trie.

        Returns:
            bool: True if the word exists in the Trie, False otherwise.
        """
        current = self.root
        for char in word:
            node = current.children.get(char)
            if node is None:
                return False  # Word not found in the Trie
            current = node
        return current.end_of_string  # Check if it's the end of a word

    def find_completions(self, prefix):
        """Find all words in the Trie that start with the given prefix.

        Args:
            prefix (str): The prefix to search for in the Trie.

        Returns:
            list: A list of all words that start with the prefix.
        """
        if prefix == "":
            return []
        node = self.root
        for char in prefix:
            if char in node.children:
                node = node.children[char]
            else:
                return []  # Prefix not found in the Trie

        return self._find_words_from_node(node, prefix)

    def _find_words_from_node(self, node, prefix):
        """Helper method to recursively find all words starting with the given prefix from a specific node.

        Args:
            node (TrieNode): The node to start searching from.
            prefix (str): The current prefix representing the path to the node.

        Returns:
            list: A list of all words that start with the prefix from the given node.
        """
        words = []
        if node.end_of_string:
            words.append(prefix)  # If it's the end of a word, add it to the suggestions

        for char, next_node in node.children.items():
            words.extend(self._find_words_from_node(next_node, prefix + char))  # Recursively find more words

        return words


def complete(msg):
    """Complete the given message with possible endings from the Trie.

    Args:
        msg (str): The message to complete.

    Returns:
        list: A list of possible completions for the message.
    """
    return trie.find_completions(msg)

with open('./words.txt', 'r') as file:
	words = file.readlines()

trie = Trie()

for word in words:
	word = word.strip().lower()  # Preprocess the word
	trie.insert_string(word)