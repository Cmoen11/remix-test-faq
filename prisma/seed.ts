import type { Faq } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const faqList: Faq[] = [
	{
		id: 1,
		question: "Hva er React?",
		answer: "React er et åpen kildekode JavaScript-bibliotek som brukes til å bygge brukergrensesnitt og nettsider.",
	},
	{
		id: 2,
		question: "Hva er Remix.run?",
		answer: "Remix.run er en rammeverk for å bygge raske, moderne og skalerbare nettapplikasjoner ved hjelp av React og server-side rendering.",
	},
	{
		id: 3,
		question: "Hva er forskjellen mellom React og Remix.run?",
		answer: "React er et JavaScript-bibliotek, mens Remix.run er en rammeverk bygget på toppen av React.",
	},
	{
		id: 4,
		question: "Hva er server-side rendering i Remix.run?",
		answer: "Server-side rendering betyr at innholdet til en nettside blir generert på serveren og sendes til nettleseren. Dette gjør at nettsiden kan lastes raskere og gi bedre ytelse.",
	},
	{
		id: 5,
		question:
			"Hva er forskjellen mellom useEffect og useLayoutEffect i React?",
		answer: "useEffect kjører etter at React har oppdatert DOM, mens useLayoutEffect kjører før. useLayoutEffect kan brukes til å beregne størrelsen eller posisjonen til en komponent før den blir lagt til i DOM.",
	},
	{
		id: 6,
		question: "Kan jeg bruke TypeScript med React og Remix.run?",
		answer: "Ja, både React og Remix.run støtter TypeScript. Du kan skrive React-komponenter og Remix.run-ruter med TypeScript for å få bedre type-sjekk og feilhåndtering.",
	},
];

async function main() {
	await prisma.faq.deleteMany();
	faqList.forEach(async (faq) => {
		await prisma.faq.create({
			data: {
				question: faq.question,
				answer: faq.answer,
			},
		});
	});
}

main();
