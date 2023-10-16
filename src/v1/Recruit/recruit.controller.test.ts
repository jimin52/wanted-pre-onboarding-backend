import * as RecruitServices from './recruit.service';
import * as RecruitController from './recruit.controller';
import httpMocks from 'node-mocks-http';
import { Response } from 'express';
import { Recruitment } from './recruit.schema';

const initMockObjects = (validQuery: object) => {
	const mockRequest = initMockRequest(validQuery);
	const mockResponse = httpMocks.createResponse();
	const mockNext = jest.fn();
	return { mockRequest, mockResponse, mockNext };
};
const initMockRequest = (validQuery: object | undefined) => {
	return httpMocks.createRequest({
		method: 'GET',
		url: '/v1/application',
		validQuery,
	});
};
const expectMockResponse = (
	mockResponse: httpMocks.MockResponse<Response<any, Record<string, any>>>,
	statusCode: number,
	data: any,
) => {
	expect(mockResponse.statusCode).toBe(statusCode);
	expect(mockResponse._getJSONData()).toEqual(data);
};

describe('RecruitController', () => {
	describe('getRecruits', () => {
		it('should return 200 with all recruits', async () => {
			const validQuery = {};
			const { mockRequest, mockResponse, mockNext } =
				initMockObjects(validQuery);
			const mockRecruits: Recruitment[] = [
				{
					id: 1,
					companyId: 1,
					position: 'test',
					compensation: 'test',
					techStack: ['test'],
					description: 'test',
				},
			];
			jest
				.spyOn(RecruitServices, 'allRecruits')
				.mockReturnValue(Promise.resolve(mockRecruits));
			await RecruitController.getRecruits(mockRequest, mockResponse, mockNext);
			expectMockResponse(mockResponse, 200, mockRecruits);
		});
	});
});
