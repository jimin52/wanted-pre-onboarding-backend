import { prisma } from '../../index';
export const getApplications = async (validSearch: string) => {
	if (!validSearch) {
		// get all applications
		return { message: 'get all applications' };
	}
	const matchedApplications = await prisma.application.findMany({
		where: {
			OR: [
				{
					recruitment: {
						company: {
							OR: [
								{ name: { contains: validSearch, mode: 'insensitive' } },
								{ country: { contains: validSearch, mode: 'insensitive' } }, // 오타인지 확인하세요 (contry 대신 country를 원하셨을 수도 있습니다)
								{ region: { contains: validSearch, mode: 'insensitive' } },
							],
						},
					},
				},
				{
					recruitment: {
						position: { contains: validSearch, mode: 'insensitive' },
					},
				},
				{
					recruitment: {
						techstacks: {
							some: {
								techstack: {
									name: { contains: validSearch, mode: 'insensitive' },
								},
							},
						},
					},
				},
			],
		},
		include: {
			recruitment: {
				include: {
					company: true,
					techstacks: {
						include: {
							techstack: true,
						},
					},
				},
			},
		},
	});

	console.log(matchedApplications);
	return matchedApplications;
};
