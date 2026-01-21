const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    const getPages = (): (number | string)[] => {
        const pages: (number | string)[] = [];

        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        // display 123...7
        if (currentPage < 4) {
            for (let i = 1; i < 4; i++) pages.push(i);
            pages.push("...", totalPages);
            return pages;
        }

        //display 1...4...7
        if (currentPage > 3 && currentPage < (totalPages - 2)) {
            pages.push(1, "...", currentPage, "...", totalPages);
            return pages;
        }

        // display 1...567
        if (currentPage > (totalPages - 3)) {
            pages.push(1, "...");
            for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        return pages;
    };

    return (
        <div className="flex justify-center gap-2">
            {/* Left Arrow */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200
                   disabled:opacity-50">←</button>

            {getPages().map((page, index) =>
                page === "..." ? (
                    <span
                        key={index}
                        className="px-2 font-semibold text-gray-500">
                        …
                    </span>
                ) : (
                    <button
                        key={index}
                        onClick={() => onPageChange(+page)}
                        className={`flex h-9 w-9 items-center justify-center rounded-full font-semibold
              ${page === currentPage
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}>
                        {page}
                    </button>
                )
            )}

            {/* Right Arrow */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200
                   disabled:opacity-50">→</button>
        </div>
    );
};

export default Pagination;

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};
