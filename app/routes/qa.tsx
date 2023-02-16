import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { FaqItem } from "~/components/Faq";
import { getFaqList } from "~/services/FaqService";

export async function loader() {
	const faqs = await getFaqList();

	return json(
		{
			FaqItems: faqs,
		},
		{
		}
	);
}


function QaIndex() {
	const data = useLoaderData<typeof loader>();

	return (
		<div className="">
			<div className="flex-col w-2/4 mx-auto max-md:w-full max-md:px-5">

				<div className="flex flex-col border-b-2 mb-3 pb-2">
					<h1 className="text-5xl font-bold">FAQ</h1>
					<span className="text-black">Her finner du svar på de vanligste spørsmålene om React og Remix.</span>
				</div>
				{data.FaqItems.map((item) => {
					return (
						<FaqItem
							key={item.id}
							title={item.question}
							answer={item.answer}
						/>
					);
				})}
				<Outlet />
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
