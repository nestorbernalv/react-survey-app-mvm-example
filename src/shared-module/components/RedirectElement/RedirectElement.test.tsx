/** Import React */
import * as React from 'react';

/** Import Test Environment */
import { shallow, ShallowWrapper } from 'enzyme';

/** Import Tested Component */
import RedirectElement from './RedirectElement';

describe("<RedirectElement />", () => {

	describe("default", () => {
		let html: ShallowWrapper;

		beforeAll(() => {
			html = shallow(<RedirectElement />);
		});

		it("should render a <div />", () => {
			expect(html.contains(<div />)).toBe(true);
		});
	});
});
