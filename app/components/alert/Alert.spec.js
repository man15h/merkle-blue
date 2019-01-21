import { mount } from '@vue/test-utils';
import MbAlert from './Alert';

describe('MbAlert', () => {
  it('is called', () => {
    const wrapper = mount(MbAlert);
    expect(wrapper.name()).toBe('MbAlert');
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
