import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { FaqItem } from "~/components/Faq";

export async function loader() {
	// fake time to load data
	return json(
		{
			FaqItems: [
				{
					title: "Hva er React?",
					answer: "React er et åpen kildekode JavaScript-bibliotek som brukes til å bygge brukergrensesnitt og nettsider.",
				},
				{
					title: "Hva er Remix.run?",
					answer: "Remix.run er en rammeverk for å bygge raske, moderne og skalerbare nettapplikasjoner ved hjelp av React og server-side rendering.",
				},
				{
					title: "Hva er forskjellen mellom React og Remix.run?",
					answer: "React er et JavaScript-bibliotek, mens Remix.run er en rammeverk bygget på toppen av React.",
				},
				{
					title: "Hva er server-side rendering i Remix.run?",
					answer: "Server-side rendering betyr at innholdet til en nettside blir generert på serveren og sendes til nettleseren. Dette gjør at nettsiden kan lastes raskere og gi bedre ytelse.",
				},
				{
					title: "Hva er forskjellen mellom useEffect og useLayoutEffect i React?",
					answer: "useEffect kjører etter at React har oppdatert DOM, mens useLayoutEffect kjører før. useLayoutEffect kan brukes til å beregne størrelsen eller posisjonen til en komponent før den blir lagt til i DOM.",
				},
				{
					title: "Kan jeg bruke TypeScript med React og Remix.run?",
					answer: "Ja, både React og Remix.run støtter TypeScript. Du kan skrive React-komponenter og Remix.run-ruter med TypeScript for å få bedre type-sjekk og feilhåndtering.",
				},
			],
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

function QaIndex() {
	const data = useLoaderData<typeof loader>();

	return (
		<div className="">
			<div className="flex-col w-2/4 mx-auto max-md:w-full max-md:px-5">
				<strong className="font-bold text-left">FAQ</strong>
				{data.FaqItems.map((item) => {
					return (
						<FaqItem
							key={item.title}
							title={item.title}
							answer={item.answer}
						/>
					);
				})}
				<button className="bg-gray-100 p-2 rounded-md shadow-md mt-5 mb-0 ease-in-out relative hover:bg-gray-200 w-auto">
					Legg til spørsmål
				</button>
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
