const { shallowMount } = require('@vue/test-utils');
const App = require('@/App.vue'); // Update the import path
const axios = require('axios');

jest.mock('axios');

describe('App.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App);
    jest.clearAllMocks();
  });

  it('updates the input value when user types', async () => {
    const input = wrapper.find('input');
    input.setValue('hello');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.complete).toBe('hello');
  });

  it('fetches completions when user types', async () => {
    axios.post.mockResolvedValue({ data: ['hello', 'helium', 'help'] });

    const input = wrapper.find('input');
    input.setValue('hel');
    await wrapper.vm.$nextTick();

    expect(axios.post).toHaveBeenCalledWith('http://localhost:5000', { msg: 'hel' });
    expect(wrapper.vm.completing).toEqual(['hello', 'helium', 'help']);
  });

  it('updates the input value when a suggestion is clicked', async () => {
    wrapper.setData({ completing: ['hello', 'helium', 'help'] });
    await wrapper.vm.$nextTick();

    const firstSuggestion = wrapper.findAll('#wordlist p').at(0);
    firstSuggestion.trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.complete).toBe('hello');
  });
});