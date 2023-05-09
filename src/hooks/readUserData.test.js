import { describe, expect, it, test } from 'vitest';
import useRealTimeDB from './useRealTimeDB';

const { readUserData } = useRealTimeDB();


describe('test realtime database, readUserData method', () => {

	it('the function must be defined', () => {
		expect(readUserData()).toBeDefined();
	});

	it('must trow an error if a database path its incorrect', async () => {
		await expect(readUserData(1)).rejects.toThrowError('invalid database path');
	}, { timeout: 60000 });

	it('must return an empty {} if the database path does not exist', async () => {
		await expect(readUserData('nouser')).resolves.toStrictEqual({});
	},{ timeout: 60000 });

	test('must return an object with the properties {message, messageSendTime, userName} if public database path is passed', async ()=>{
		const data = await readUserData('/public/');
		
		expect(data[0]).toHaveProperty('message');
		expect(data[0]).toHaveProperty('messageSendTime');
		expect(data[0]).toHaveProperty('userName');
	});

	test('must return an object with the properties {message, messageSendTime, userName} if userUI database path is passed', async ()=>{
		const data = await readUserData('profiles/bVG7dXejftVjWdgK71tSoCUnJu82');
		expect(data).toHaveProperty('about');
		expect(data).toHaveProperty('photo');
		expect(data).toHaveProperty('state');
		expect(data).toHaveProperty('userName');
		expect(data).toHaveProperty('lastName');
	});

});