import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const techstacks = await prisma.techstack.createMany({
		data: [
			{ name: 'Node.js' },
			{ name: 'TypeScript' },
			{ name: 'Prisma' },
			{ name: 'PostgreSQL' },
			{ name: 'Git' },
			{ name: 'React' },
			{ name: 'Vue.js' },
		],
	});

	const wanted = await prisma.company.create({
		data: {
			name: 'Wanted',
			country: 'Korea',
			region: 'Seoul',
			Recruitments: {
				create: {
					position: 'Backend Developer',
					compensation: 1000000,
					title: 'Backend Developer',
					description: '원티드에서 백엔드 개발자를 모집합니다...',
					applications: {},
				},
			},
		},
	});
	const naver = await prisma.company.create({
		data: {
			name: 'Naver',
			country: 'Korea',
			region: 'Seoul',
			Recruitments: {
				create: {
					position: 'Frontend Developer',
					compensation: 500000,

					title: 'Frontend Developer',
					description: '네이버에서 프론트엔드 개발자를 모집합니다...',
					applications: {},
				},
			},
		},
	});
	const kakao = await prisma.company.create({
		data: {
			name: 'Kakao',
			country: 'Korea',
			region: 'Seoul',
			Recruitments: {
				create: [
					{
						position: 'Frontend Developer',
						compensation: 500000,
						title: 'Frontend Developer',
						description: '카카오에서 프론트엔드 개발자를 모집합니다...',
						applications: {},
					},
					{
						position: 'Backend Developer',
						compensation: 1000000,
						title: 'Backend Developer',
						description: '카카오에서 백엔드 개발자를 모집합니다...',
						applications: {},
					},
				],
			},
		},
	});

	const alice = await prisma.user.upsert({
		where: { id: 1 },
		update: {},
		create: {
			email: 'alice@email.com',
			name: 'Alice',
			applications: {},
		},
	});
	const bob = await prisma.user.upsert({
		where: { id: 2 },
		update: {},
		create: {
			email: 'bob@email.com',
			name: 'Bob',
			applications: {},
		},
	});
	const jimin = await prisma.user.upsert({
		where: { id: 3 },
		update: {},
		create: {
			email: 'jimin@email.com',
			name: 'jimin',
			applications: {},
		},
	});
	const requirement_techstacks = await prisma.recruitmentTechstack.createMany({
		data: [
			{
				recruitmentId: 1,
				techstackId: 1,
			},
			{
				recruitmentId: 1,
				techstackId: 2,
			},
			{
				recruitmentId: 1,
				techstackId: 3,
			},
			{
				recruitmentId: 1,
				techstackId: 4,
			},
			{
				recruitmentId: 1,
				techstackId: 5,
			},
			{
				recruitmentId: 2,
				techstackId: 6,
			},
			{
				recruitmentId: 3,
				techstackId: 7,
			},
			{
				recruitmentId: 4,
				techstackId: 1,
			},
			{
				recruitmentId: 4,
				techstackId: 2,
			},
			{
				recruitmentId: 4,
				techstackId: 3,
			},
			{
				recruitmentId: 4,
				techstackId: 4,
			},
			{
				recruitmentId: 4,
				techstackId: 5,
			},
		],
	});
	const applications = await prisma.application.createMany({
		data: [
			{
				userId: 1,
				recruitmentId: 1,
			},
			{
				userId: 2,
				recruitmentId: 1,
			},
			{
				userId: 3,
				recruitmentId: 1,
			},
			{
				userId: 1,
				recruitmentId: 2,
			},
			{
				userId: 2,
				recruitmentId: 2,
			},
		],
	});
}
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
