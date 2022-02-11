import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Link to="/" className="flex flex-col w-full text-center uppercase border-b-2">
      <span className="text-4xl font-bold text-green-400">Wordle</span>
      <span className="font-light tracking-widest">with friends</span>
    </Link>
  )
}