import { prisma } from '../../../index';
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
								{ country: { contains: validSearch, mode: 'insensitive' } },
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
						techStacks: {
							some: {
								techStack: {
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
					techStacks: {
						include: {
							techStack: true,
						},
					},
				},
			},
		},
	});

	console.log(matchedApplications);
	return matchedApplications;
};
