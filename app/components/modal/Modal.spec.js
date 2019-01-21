import { shallowMount } from '@vue/test-utils';
import MbModal from './Modal';

describe('MbModal', () => {
  it('is called', () => {
    const wrapper = shallowMount(MbModal);
    expect(wrapper.name()).toBe('MbModal');
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
