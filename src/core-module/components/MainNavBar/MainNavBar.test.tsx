/** Import React */
import * as React from 'react';

/** Import Test Environment */
import { shallow, ShallowWrapper } from 'enzyme';

/** Import Tested Component */
import MainNavBar from './MainNavBar';

describe("<MainNavBar />", () => {

	describe("default", () => {
		let html: ShallowWrapper;

		beforeAll(() => {
			html = shallow(<MainNavBar />);
		});

		it("should render a <div />", () => {
			expect(html.contains(<div />)).toBe(true);
		});
	});
});
