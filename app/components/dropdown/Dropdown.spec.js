import { mount } from '@vue/test-utils';
import MbDropdown from './Dropdown';

describe('MbDropdown', () => {
  it('is called', () => {
    const wrapper = mount(MbDropdown);
    expect(wrapper.name()).toBe('MbDropdown');
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
