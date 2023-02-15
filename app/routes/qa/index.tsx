import { Faq } from "@prisma/client";
import { ActionArgs, json } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useSubmit, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { FaqItem } from "~/components/Faq";
import { getFaqList, insertFaq } from "~/services/FaqService";

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
		question: "Hva er forskjellen mellom useEffect og useLayoutEffect i React?",
		answer: "useEffect kjører etter at React har oppdatert DOM, mens useLayoutEffect kjører før. useLayoutEffect kan brukes til å beregne størrelsen eller posisjonen til en komponent før den blir lagt til i DOM.",
	},
	{
		id: 6,
		question: "Kan jeg bruke TypeScript med React og Remix.run?",
		answer: "Ja, både React og Remix.run støtter TypeScript. Du kan skrive React-komponenter og Remix.run-ruter med TypeScript for å få bedre type-sjekk og feilhåndtering.",
	},
];


export async function loader() {

	let faqs = await getFaqList();

	if (faqs.length === 0) faqs = faqList;

	return json(
		{
			FaqItems: faqs,
		},
		{
			headers: {
				// max-age controls the browser cache
				// s-maxage controls a CDN cache
				"Cache-Control": "public, max-age=30, s-maxage=86400",
			},
		}
	);
}

export async function action({ request }: ActionArgs) {
	const body = await request.formData();

	const question = body.get("question");
	const answer = body.get("answer");

	if (question && answer) {
		await insertFaq({
			question: question.toString(),
			answer: answer.toString(),
		});
	}

	return json({ success: true });
}

function QaIndex() {
	const data = useLoaderData<typeof loader>();
	const transition = useTransition();
	const formRef = useRef<HTMLFormElement>(null);

	let isAdding = transition.state === "submitting";

	useEffect(() => {
		if (isAdding) {
			formRef.current?.reset();
		}
	}, [isAdding]);


	return (
		<div className="">
			<div className="flex-col w-2/4 mx-auto max-md:w-full max-md:px-5">
				<strong className="font-bold text-left">FAQ</strong>
				{data.FaqItems.map((item) => {
					return (
						<FaqItem
							key={item.id}
							title={item.question}
							answer={item.answer}
						/>
					);
				})}

				<div className="flex-col w-full mx-auto max-md:w-full max-md:px-5">
					{transition.state === "submitting" && (
						<p className="text-yellow-500">
							Legger til spørsmålet...
						</p>
					)}
					{transition.state === "loading" && (
						<p className="text-green-500">Spørsmålet er lagt til!</p>
					)}

					<Form method="post" className="flex-col mx-auto max-md:w-full max-md:px-5" ref={formRef}>
						<input type="text" disabled={isAdding} className="bg-gray-100 p-2 rounded-md shadow-md mt-5 mb-0 ease-in-out relative hover:bg-gray-200 w-full" name="question" placeholder="Skriv inn spørsmål" />
						<textarea disabled={isAdding} className="bg-gray-100 p-2 rounded-md shadow-md mt-5 mb-0 ease-in-out relative hover:bg-gray-200 w-full" name="answer" placeholder="Skriv inn svar" />

						<button disabled={isAdding} className="bg-gray-100 p-2 rounded-md shadow-md mt-5 mb-0 ease-in-out relative hover:bg-gray-200 w-auto" type="submit">
							Legg til spørsmål
						</button>
					</Form>
				</div>
			</div>

		</div>
	);
}

export function ErrorBoundary({ error }: { error: Error }) {
	return (
		<div className="flex-col w-2/4 mx-auto max-md:w-full max-md:px-5">
			<strong className="font-bold text-left">FAQ</strong>
			<p className="text-red-500">
				Beklager, men vårt nettsted har opplevd en feil. Våre systemer
				jobber med å rette opp feilen, så prøv igjen senere.
			</p>
			<div>
				<p className="">Feilmeldingen: {error.message}</p>
			</div>
		</div>
	);
}

export default QaIndex;
