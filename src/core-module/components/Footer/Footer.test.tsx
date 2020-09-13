/** Import React */
import * as React from 'react';

/** Import Test Environment */
import { shallow, ShallowWrapper } from 'enzyme';

/** Import Tested Component */
import Footer from './Footer';

describe("<Footer />", () => {

	describe("default", () => {
		let html: ShallowWrapper;

		beforeAll(() => {
			html = shallow(<Footer />);
		});

		it("should render a <div />", () => {
			expect(html.contains(<div />)).toBe(true);
		});
	});
});
