/** Import React */
import * as React from 'react';

/** Import Test Environment */
import { shallow, ShallowWrapper } from 'enzyme';

/** Import Tested Component */
import OverlaySpinner from './OverlaySpinner';

describe("<OverlaySpinner />", () => {

	describe("default", () => {
		let html: ShallowWrapper;

		beforeAll(() => {
			html = shallow(<OverlaySpinner />);
		});

		it("should render a <div />", () => {
			expect(html.contains(<div />)).toBe(true);
		});
	});
});
