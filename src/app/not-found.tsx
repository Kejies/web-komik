/* eslint-disable @next/next/no-img-element */
"use client"
import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {


    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <img src="/404.png" alt="404" width={300} height={300} />
            </motion.div>
            <h1 className="text-4xl font-bold mt-4">Oops! Page Not Found</h1>
            <p className="mt-2 text-lg">Sepertinya halaman ini tidak tersedia.</p>
            <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 rounded text-white">
                Kembali ke Beranda
            </Link>
        </div>
    );
}
