import { RecruitBodyType, RecruitWithTechstackType } from '../recruit.schema';
import { prisma } from '../../../index';

export const allRecruits = async () => {
	const Recruitments = await prisma.recruitment.findMany({
		include: {
			company: true,
			techStacks: {
				include: {
					techStack: true,
				},
			},
		},
	});
	const RecruitmentsReturn: RecruitWithTechstackType[] = Recruitments.map(
		(recruit) => ({
			companyId: recruit.company.id,
			position: recruit.position,
			compensation: recruit.compensation,
			title: recruit.title,
			techStacks: recruit.techStacks.map((techStack) => ({
				name: techStack.techStack.name,
			})),
			description: recruit.description,
		}),
	);
	return RecruitmentsReturn;
};

export const createRecruit = async (recruit: RecruitBodyType) => {
	const prismaReturn = await prisma.recruitment.create({
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
		include: {
			company: true,
			techStacks: {
				include: {
					techStack: true,
				},
			},
		},
	});
	const recruitReturn: RecruitWithTechstackType = {
		companyId: prismaReturn.company.id,
		position: prismaReturn.position,
		compensation: prismaReturn.compensation,
		title: prismaReturn.title,
		techStacks: prismaReturn.techStacks.map((techStacks) => ({
			name: techStacks.techStack.name,
		})),
		description: prismaReturn.description,
	};
	return recruitReturn;
};
