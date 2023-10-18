import * as ApplicationService from '../service/application.service';
import * as ApplicationController from './application.controller';
import httpMocks from 'node-mocks-http';
import { Response } from 'express';

const initMockObjects = (validQuery: object) => {
	const mockRequest = initMockRequest(validQuery);
	const mockResponse = httpMocks.createResponse();
	const mockNext = jest.fn();
	return { mockRequest, mockResponse, mockNext };
};
const initMockRequest = (validQuery: object) => {
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
// application controller 테스트
describe('application controller 테스트', () => {
	// getApplications 테스트
	describe('getApplications 테스트', () => {
		it('일반적인 입력, 일반적인 출력', async () => {
			const mockRequest = initMockRequest({ search: 'test' });
			const mockResponse = httpMocks.createResponse();
			const mockNext = jest.fn();
			jest
				.spyOn(ApplicationService, 'getApplications')
				.mockReturnValue(Promise.resolve({ message: 'test' }));
			await ApplicationController.getApplications(
				mockRequest,
				mockResponse,
				mockNext,
			);
			expectMockResponse(mockResponse, 200, { message: 'test' });
		});
		//'search 가 없을 경우는 없음'
		it('search 가 nullish 인 application 모두 조회하기', async () => {
			const { mockRequest, mockResponse, mockNext } = initMockObjects({
				search: null,
			});
			jest
				.spyOn(ApplicationService, 'getApplications')
				.mockReturnValue(Promise.resolve({ message: 'test' }));
			await ApplicationController.getApplications(
				mockRequest,
				mockResponse,
				mockNext,
			);
			expectMockResponse(mockResponse, 200, { message: 'test' });
		});
		// service 에서 에러가 발생할 경우
		it('service 에서 에러가 발생할 경우', async () => {
			const { mockRequest, mockResponse, mockNext } = initMockObjects({
				search: 'test',
			});
			jest
				.spyOn(ApplicationService, 'getApplications')
				.mockReturnValue(Promise.reject(new Error('test')));
			await ApplicationController.getApplications(
				mockRequest,
				mockResponse,
				mockNext,
			);
			expect(mockNext).toHaveBeenCalledWith(
				expect.objectContaining({ message: 'test' }),
			);
		});
	});
});
