import { mount } from '@vue/test-utils';
import MbTextarea from './Textarea';

describe('MbTextarea', () => {
  it('is called', () => {
    const wrapper = mount(MbTextarea);
    expect(wrapper.name()).toBe('MbTextarea');
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
