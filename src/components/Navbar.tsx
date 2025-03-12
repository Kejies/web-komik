import { Search } from "lucide-react";

export default function Navbar(){
    return(
        <div className="flex bg-yellow-300 p-4 justify-between text-white text-lg">
            <h1>Cihuy Komik</h1>
            <ul className="flex flex-row gap-4 items-center">
                <li>Home</li>
                <li>Popular</li>
                <li>Daftar Komik</li>
            </ul>
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-1/2 py-2 pl-4 pr-5 text-white bg-gray-900 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
             </div>
        </div>

    )
}