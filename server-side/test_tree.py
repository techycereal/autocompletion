import pytest
from auto_complete import Trie, complete  # Replace 'your_module' with the name of your module

@pytest.fixture
def trie():
    t = Trie()
    words = ["hello", "helium", "help", "helicopter", "health", "hat", "at", "ate"]
    for word in words:
        t.insert_string(word)
    return t

def test_insert_and_search_string(trie):
    trie.insert_string("test")
    assert trie.search_string("test") is True
    assert trie.search_string("nonexistent") is False

def test_find_completions(trie):
    completions = trie.find_completions("he")
    assert set(completions) == {"hello", "helium", "help", "helicopter", "health"}

    completions = trie.find_completions("ha")
    assert set(completions) == {"hat"}

    completions = trie.find_completions("z")
    assert completions == []

def test_complete(trie):
    completions = complete("he")
    assert set(completions) == {"hello", "helium", "help", "helicopter", "health"}

    completions = complete("a")
    assert set(completions) == {"at", "ate"}

    completions = complete("z")
    assert completions == []

def test_no_partial_word(trie):
    assert trie.search_string("he") is False
    assert trie.search_string("hel") is False

def test_empty_string(trie):
    assert trie.search_string("") is False
    assert trie.find_completions("") == []