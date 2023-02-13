import { Link, Outlet } from "@remix-run/react";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center flex gap-5 flex-col">
        <h1 className="text-6xl font-bold">QA App</h1>
        <Link
          to="/qa"
          className="text-blue-500 hover:text-blue-600 hover:underline text-2xl"
        >
          Gå till FAQ
        </Link>
      </div>
    </div>
  );
}
