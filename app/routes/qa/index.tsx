import { Link } from "@remix-run/react";

function index() {
    return (
        <Link to={"add"} className="bg-gray-100 p-2 rounded-md shadow-md mt-5 mb-0 ease-in-out relative hover:bg-gray-200 w-auto" type="submit">
            Legg til spørsmål & svar
        </Link>
    );
}

export default index;