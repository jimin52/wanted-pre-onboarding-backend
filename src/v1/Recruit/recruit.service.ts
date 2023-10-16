import { Recruitment } from './recruit.schema';
export const getRecruits = async () => {
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
	return mockRecruits;
};
