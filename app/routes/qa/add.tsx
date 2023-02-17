import { ActionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import { useRef } from "react";
import * as yup from "yup";
import { insertFaq } from "~/services/FaqService";

const schema = yup.object().shape({
    question: yup.string().required().min(5),
    answer: yup.string().required().min(10),
});

export async function action({ request }: ActionArgs) {
    const body = await request.formData();

    const question = body.get("question");
    const answer = body.get("answer");


    const isValid = await schema.isValid({
        question,
        answer,
    });

    if (!isValid) {
        return json({
            error: {
                answer: "Svaret må være minst 10 tegn",
                question: "Spørsmålet må være minst 5 tegn",
            }
        })
    }

    await insertFaq({
        question: question!.toString(),
        answer: answer!.toString(),
    });

    return redirect("/qa");
}


function Add() {
    const transition = useTransition();
    const formRef = useRef<HTMLFormElement>(null);
    const actionResult = useActionData<typeof action>();


    let isAdding = transition.state === "submitting";

    return (
        <div className="flex-col w-full mx-auto max-md:w-full max-md:px-5">


            <Form method="post" className="flex-col mx-auto max-md:w-full max-md:py-5" ref={formRef}>
                <div>

                    <input type="text" disabled={isAdding} autoFocus className="bg-gray-100 p-2 rounded-md shadow-md mt-5 mb-0 ease-in-out relative hover:bg-gray-200 w-full" name="question" placeholder="Skriv inn spørsmål" />
                    {actionResult?.error?.question && (
                        <p className="text-red-500">{actionResult.error.question}</p>
                    )}
                </div>
                <div>
                    <textarea disabled={isAdding} className="bg-gray-100 p-2 rounded-md shadow-md mt-5 mb-0 ease-in-out relative hover:bg-gray-200 w-full" name="answer" placeholder="Skriv inn svar" />

                    {actionResult?.error?.answer && (
                        <p className="text-red-500">{actionResult.error.answer}</p>
                    )}
                </div>

                <section className="flex flex-row gap-5">
                    <button disabled={isAdding} className="bg-green-100 p-2 rounded-md shadow-md mt-5 mb-0 ease-in-out relative hover:bg-gray-200 w-auto" type="submit">
                        Legg til spørsmål
                    </button>
                    <Link to="/qa" className="bg-red-100 p-2 rounded-md shadow-md mt-5 mb-0 ease-in-out relative hover:bg-gray-200 w-auto">
                        Avbryt
                    </Link>
                </section>
                {transition.state === "submitting" && (
                    <p className="text-yellow-500">
                        Legger til spørsmålet...
                    </p>
                )}
                {transition.state === "loading" && (
                    <p className="text-green-500">Spørsmålet er lagt til!</p>
                )}
            </Form>

        </div>
    );
}

export function ErrorBoundary({ error }: { error: Error }) {

    return (
        <div className="flex-col w-full mx-auto max-md:w-full max-md:px-5" >
            <p className="text-red-500">
                {error.message}
            </p>
        </div>
    )
}


export default Add;