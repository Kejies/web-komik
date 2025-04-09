interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    // Hitung batas kiri dan kanan
    const left = Math.max(currentPage - 2, 2)
    const right = Math.min(currentPage + 2, totalPages - 1)

    const pageItems: number[] = []

    // Always push halaman 1
    pageItems.push(1)

    // Tambahkan range di tengah
    for (let i = left; i <= right; i++) {
        if (!pageItems.includes(i)) pageItems.push(i)
    }

    // Selalu push halaman terakhir
    if (!pageItems.includes(totalPages)) {
        pageItems.push(totalPages)
    }

    return (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
            {/* Tombol Sebelumnya */}
            {currentPage > 1 && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                    « Sebelumnya
                </button>
            )}

            {/* Angka Halaman */}
            {pageItems.map((page, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 rounded ${currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Tombol Berikutnya */}
            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                    Berikutnya »
                </button>
            )}
        </div>
    )
}
