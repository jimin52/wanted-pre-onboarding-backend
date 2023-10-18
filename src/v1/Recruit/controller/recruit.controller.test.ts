import * as RecruitServices from '../service/recruit.service';
import * as RecruitController from './recruit.controller';
import httpMocks from 'node-mocks-http';
import { Response } from 'express';
import { RecruitWithTechstackType } from '../recruit.schema';

const initMockObjects = (validParam: object | undefined) => {
	const mockRequest = initMockRequest(validParam);
	const mockResponse = httpMocks.createResponse();
	const mockNext = jest.fn();
	return { mockRequest, mockResponse, mockNext };
};
const initMockRequest = (validParam: object | undefined) => {
	return httpMocks.createRequest({
		method: 'GET',
		url: '/v1/recruit',
		validParam,
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
		it('모든 recruit 조회', async () => {
			const { mockRequest, mockResponse, mockNext } =
				initMockObjects(undefined);
			const mockRecruits: RecruitWithTechstackType[] = [
				{
					companyId: 1,
					position: 'test',
					title: 'test',
					compensation: 1000000,
					techStacks: [{ name: 'test' }],
					description: '123456789abcdefghijk',
				},
			];
			jest
				.spyOn(RecruitServices, 'allRecruits')
				.mockReturnValue(Promise.resolve(mockRecruits));
			await RecruitController.getRecruits(mockRequest, mockResponse, mockNext);
			expectMockResponse(mockResponse, 200, mockRecruits);
		});
		it('recruit 조회 실패', async () => {
			const { mockRequest, mockResponse, mockNext } =
				initMockObjects(undefined);
			jest
				.spyOn(RecruitServices, 'allRecruits')
				.mockReturnValue(Promise.reject(new Error('error')));
			await RecruitController.getRecruits(mockRequest, mockResponse, mockNext);
			expect(mockNext).toHaveBeenCalledWith(
				expect.objectContaining({ message: 'error' }),
			);
		});
	});
	describe('postRecruit', () => {
		it('recruit 생성', async () => {
			const { mockRequest, mockResponse, mockNext } =
				initMockObjects(undefined);
			const mockRecruit: RecruitWithTechstackType = {
				companyId: 1,
				position: 'test',
				title: 'test',
				compensation: 100000,
				techStacks: [{ name: 'test' }],
				description: 'test',
			};
			jest
				.spyOn(RecruitServices, 'createRecruit')
				.mockReturnValue(Promise.resolve(mockRecruit));
			await RecruitController.postRecruit(mockRequest, mockResponse, mockNext);
			expectMockResponse(mockResponse, 200, mockRecruit);
		});
	});
});
