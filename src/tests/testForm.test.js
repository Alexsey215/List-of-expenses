import { it } from "@jest/globals"
import AddPaymentForm from '../components/AddPaymentForm.vue'
import { shallowMount } from '@vue/test-utils'

describe('AddPaymentForm', () => {
    it('Test input date', () => {
      const wrapper = shallowMount(AddPaymentForm);
      const date = wrapper.find('input[name="date"]');
      date.setValue('21.21.2121');
      expect(wrapper.vm.date).toBe('21.21.2121');
    })
});

describe('AddPaymentForm', () => {
  it('Test input category', () => {
    const wrapper = shallowMount(AddPaymentForm);
    const category = wrapper.find('input[name="category"]');
    category.setValue('food');
    expect(wrapper.vm.category).toBe('food');
  })
});

describe('AddPaymentForm', () => {
  it('Test input value', () => {
    const wrapper = shallowMount(AddPaymentForm);
    const value = wrapper.find('input[name="value"]');
    value.setValue(321);
    expect(wrapper.vm.value).toBe(321);
  })
});
