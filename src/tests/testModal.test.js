import { it } from "@jest/globals"
import ModalWindow from '../components/ModalWindow.vue'
import { shallowMount } from '@vue/test-utils';

describe('ModalWindow', () => {
  it('Test input modal date', () => {
    const wrapper = shallowMount(ModalWindow);
    const date = wrapper.find('input[name="date1"]');
    date.setValue('21.21.2121');
    expect(wrapper.vm.date).toBe('21.21.2121');
  })
});

describe('ModalWindow', () => {
  it('Test input modal category', () => {
    const wrapper = shallowMount(ModalWindow);
    const category = wrapper.find('input[name="category1"]');
    category.setValue('food');
    expect(wrapper.vm.category).toBe('food');
  })
});

describe('ModalWindow', () => {
  it('Test input modal value', () => {
    const wrapper = shallowMount(ModalWindow);
    const value = wrapper.find('input[name="value1"]');
    value.setValue(321);
    expect(wrapper.vm.value).toBe(321);
  })
});
