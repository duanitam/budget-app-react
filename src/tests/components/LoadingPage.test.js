import React from 'react';
import { shallow } from 'enzyme'
import LoaginPage from "../../components/LoadingPage";


test('Should render LoadingPage correctly', () => {
    const wrapper = shallow(<LoaginPage />);
    expect(wrapper).toMatchSnapshot();
})