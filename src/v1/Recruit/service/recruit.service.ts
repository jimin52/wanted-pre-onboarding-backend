import { RecruitBodyType, RecruitWithTechstackType } from '../recruit.schema';
import { prisma } from '../../../index';

export const findAllRecruits = async () => {
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
			techStacks: recruit.techStacks.map(
				(techStacks) => techStacks.techStack.name,
			),
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
		techStacks: prismaReturn.techStacks.map(
			(techStacks) => techStacks.techStack.name,
		),
		description: prismaReturn.description,
	};
	return recruitReturn;
};

export const findRecruitById = async (id: number) => {
	const prismaReturn = await prisma.recruitment.findUnique({
		where: {
			id,
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
	if (!prismaReturn) {
		throw new Error('Recruit not found');
	}
	const recruitReturn: RecruitWithTechstackType = {
		companyId: prismaReturn.company.id,
		position: prismaReturn.position,
		compensation: prismaReturn.compensation,
		title: prismaReturn.title,
		techStacks: prismaReturn.techStacks.map(
			(techStacks) => techStacks.techStack.name,
		),
		description: prismaReturn.description,
	};
	return recruitReturn;
};

export const upsertRecruit = async (id: number, recruit: RecruitBodyType) => {
	const prismaReturn = await prisma.recruitment.upsert({
		where: {
			id,
		},
		update: {
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
		create: {
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
		techStacks: prismaReturn.techStacks.map(
			(techStacks) => techStacks.techStack.name,
		),
		description: prismaReturn.description,
	};
	return recruitReturn;
};

export const deleteRecruitById = async (id: number) => {
	const prismaReturn = await prisma.recruitment.delete({
		where: {
			id,
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
};
