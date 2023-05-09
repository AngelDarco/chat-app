import { describe, expect, it } from 'vitest';
import useRealTimeDB from './useRealTimeDB';

const { writeUserData } = useRealTimeDB();


describe('test for realtime database, writeUserData method', () => {
	const data = { userUid: 'test', lastName: 'Darco', userName: 'Admin', about: 'I programer', file: '', photo:'', state:'working on it' };

	it('the function must be defined', () => {
		expect(writeUserData(data)).toBeDefined();
	});

	it('must throw an error if data itsnot passed', async () => {
		await expect(writeUserData()).rejects.toThrowError('no data found');
	}, 30000);

	it('must throw an error if no userUid is passed', async ()=>{
		const wrongData = { ...data, userUid: undefined, userName: undefined, lastName: undefined };

		await expect(writeUserData(wrongData)).rejects.toThrowError('userUid, userName, lastName are required');
	}, 30000);


	it('must return a string "data writed" if data was writed correctly', async ()=>{
		await expect(writeUserData(data)).resolves.toBe('data writed');
	}, 30000);

});