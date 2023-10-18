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

export const upsertRecruit = async (
	id: number,
	recruitData: RecruitBodyType,
) => {
	const existingRecruitment = await prisma.recruitment.findUnique({
		where: { id },
	});
	let result;
	if (existingRecruitment) {
		// 존재하는 경우 업데이트
		result = await prisma.$transaction([
			prisma.recruitmentTechStack.deleteMany({ where: { recruitmentId: id } }),
			prisma.recruitment.update({
				where: { id },
				data: {
					companyId: recruitData.companyId,
					position: recruitData.position,
					compensation: recruitData.compensation,
					title: recruitData.title,
					description: recruitData.description,
					techStacks: {
						create: recruitData.techStacks.map((tech) => ({
							techStack: {
								connectOrCreate: {
									where: { name: tech },
									create: { name: tech },
								},
							},
						})),
					},
				},
			}),
		]);
	} else {
		// 존재하지 않는 경우 새로 생성
		result = await prisma.recruitment.create({
			data: {
				id,
				companyId: recruitData.companyId,
				position: recruitData.position,
				compensation: recruitData.compensation,
				title: recruitData.title,
				description: recruitData.description,
				techStacks: {
					create: recruitData.techStacks.map((tech) => ({
						techStack: {
							connectOrCreate: {
								where: { name: tech },
								create: { name: tech },
							},
						},
					})),
				},
			},
		});
	}
	return result;
};

export const deleteRecruitById = async (id: number) => {
	return await prisma.$transaction([
		prisma.application.deleteMany({
			where: {
				recruitmentId: id,
			},
		}),
		prisma.recruitmentTechStack.deleteMany({
			where: {
				recruitmentId: id,
			},
		}),
		prisma.recruitment.delete({
			where: {
				id,
			},
		}),
	]);
};
