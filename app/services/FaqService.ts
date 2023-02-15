import { Faq } from "@prisma/client";
import { prisma } from "~/db/client";

export async function getFaqList() {
	return await prisma.faq.findMany();
}

export async function insertFaq(faq: Omit<Faq, "id">) {
	return await prisma.faq.create({
		data: {
			question: faq.question,
			answer: faq.answer,
		},
	});
}
