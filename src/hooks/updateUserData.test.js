import { describe, expect, it } from 'vitest';
import useRealTimeDB from './useRealTimeDB';

const { updateUserData } = useRealTimeDB();


describe('test realtime database, updateUserData method', () => {
	
	const data = { userName: 'Admin', message: 'test', messageSendTime: 1, messageId:'01', userDB:'tests/' };

	it('the function must be defined', () => {
		expect(updateUserData(data)).toBeDefined();
	});

	it('must trow an error if no data its passed', async () => {
		await expect(updateUserData()).rejects.toThrowError('no data found');
	}, 30000 );

	it('must throw an error if required data its no passed', async () => {
		const wrongData = {...data, messageId: undefined, userDB: undefined };

		await expect(updateUserData(wrongData)).rejects.toThrowError('userDB and messageId are required');
	},{ timeout: 60000 });

	it('must resolve a string "data updated" if the data was updated satisfactorily', async ()=> {
		await expect(updateUserData(data)).resolves.toBe('data updated');
	}, 60000);

});