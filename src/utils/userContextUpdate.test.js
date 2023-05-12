import {  describe, expect, it } from 'vitest';
import userContextUpdate from './userContextUpdate';


describe('userContextUpdate test', () => {
	const { userContextData } = userContextUpdate();

	it('should work as expected', () => {
		expect(userContextData()).toBeDefined();
	});
});