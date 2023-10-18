import { Recruitment } from './recruit.schema';
import { prisma } from '../../index';

export const allRecruits = async () => {
	const Recruitments = await prisma.recruitment.findMany();
	return Recruitments;
};

export const createRecruit = async (recruit: Recruitment) => {
	await prisma.recruitment.create({
		data: {
			company: {
				connect: {
					id: recruit.companyId,
				},
			},
			position: recruit.position,
			compensation: recruit.compensation,
			title: recruit.title,
			techStacks: {
				create: recruit.techStacks.map((techStack) => ({
					techStack: {
						connectOrCreate: {
							where: {
								name: techStack,
							},
							create: {
								name: techStack,
							},
						},
					},
				})),
			},
			description: recruit.description,
		},
	});
};
