import React from 'react';
import { Card } from 'react-native-elements';
import renderer from 'react-test-renderer';
import App from './App';
import BookDetails from './src/screens/BookDetails';
import Login from './src/screens/Login';
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('<App />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('App test against snapshot', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});


describe('Card', () => {
it('should render correctly', () => {
    const header = renderer.create(
    <Card item={{'cover_img':'https://img.webnovel.com/bookcover/12301378806233905/300/300.jpg?updateTime=1578397501796'}} />
    ).toJSON;
    expect(header).toMatchSnapshot();
});
});
