import { mount } from '@vue/test-utils';
import MbButton from './Button';

describe('MbButton', () => {
  it('is called', () => {
    const wrapper = mount(MbButton);
    expect(wrapper.name()).toBe('MbButton');
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
