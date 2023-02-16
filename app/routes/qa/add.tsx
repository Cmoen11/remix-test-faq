import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useTransition } from "@remix-run/react";
import { useRef } from "react";
import { insertFaq } from "~/services/FaqService";

export async function action({ request }: ActionArgs) {
    const body = await request.formData();

    const question = body.get("question");
    const answer = body.get("answer");

    console.log("action is called")

    if (question && answer) {
        await insertFaq({
            question: question.toString(),
            answer: answer.toString(),
        });
    }

    return redirect("/qa");
}


function Add() {
    const transition = useTransition();
    const formRef = useRef<HTMLFormElement>(null);


    let isAdding = transition.state === "submitting";

    return (
        <div className="flex-col w-full mx-auto max-md:w-full max-md:px-5">
            {transition.state === "submitting" && (
                <p className="text-yellow-500">
                    Legger til spørsmålet...
                </p>
            )}
            {transition.state === "loading" && (
                <p className="text-green-500">Spørsmålet er lagt til!</p>
            )}

            <Form method="post" className="flex-col mx-auto max-md:w-full max-md:py-5" ref={formRef}>
                <input type="text" disabled={isAdding} autoFocus className="bg-gray-100 p-2 rounded-md shadow-md mt-5 mb-0 ease-in-out relative hover:bg-gray-200 w-full" name="question" placeholder="Skriv inn spørsmål" />
                <textarea disabled={isAdding} className="bg-gray-100 p-2 rounded-md shadow-md mt-5 mb-0 ease-in-out relative hover:bg-gray-200 w-full" name="answer" placeholder="Skriv inn svar" />

                <section className="flex flex-row gap-5">
                    <button disabled={isAdding} className="bg-green-100 p-2 rounded-md shadow-md mt-5 mb-0 ease-in-out relative hover:bg-gray-200 w-auto" type="submit">
                        Legg til spørsmål
                    </button>
                    <Link to="/qa" className="bg-red-100 p-2 rounded-md shadow-md mt-5 mb-0 ease-in-out relative hover:bg-gray-200 w-auto">
                        Avbryt
                    </Link>
                </section>
            </Form>

        </div>
    )
};

export default Add;