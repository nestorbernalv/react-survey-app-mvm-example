/** Import React */
import * as React from 'react';

/** Import Test Environment */
import { shallow, ShallowWrapper } from 'enzyme';

/** Import Tested Component */
import ErrorBoundary from './ErrorBoundary';

describe("<ErrorBoundary />", () => {

	describe("default", () => {
		let html: ShallowWrapper;

		beforeAll(() => {
			html = shallow(<ErrorBoundary />);
		});

		it("should render a <div />", () => {
			expect(html.contains(<div />)).toBe(true);
		});
	});
});
