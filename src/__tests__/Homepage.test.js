import Homepage from '../pages/homepage/Homepage';
import Login from '../pages/login/Login';
import SignUp from '../pages/signup/SignUp';
import '../setupTests.js';
import { mount, shallow } from 'enzyme';

const homepageTest = shallow(<Homepage />);
const instance = homepageTest.instance();

describe("test if containers of homepage are loaded", () => {
    it("test if main container is loaded", () => {
        expect(homepageTest.find(".homepage").exists()).toBe(true);
    });

    it("test if styled tab is loaded", () => {
      expect(homepageTest.find(".title").exists()).toBe(true);
    });

    it("test if Login component is loaded at startup", () => {
      expect(homepageTest.find(Login).exists()).toBe(true);
    });

    it("test if Sign Up component is not loaded at Start up", () => {
      expect(homepageTest.find(SignUp).exists()).toBe(false);
    });

    // it("test if sign in component is loaded onClick", () => {
    //     homepageTest.instance().setValue(1);
    //     expect(homepageTest.find(SignUp).exists()).toBe(true);
    // });
});