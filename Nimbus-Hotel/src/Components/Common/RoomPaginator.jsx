//class to navigate through the list of rooms.

import React from "react";

const RoomPaginator = ({currentPage, totalPages, onPageChange}) => {
    const pageNumbers = Array.from({length : totalPages}, (_, i) => i + 1) // Creates an array of page numbers from 1 to totalPages.
    return (
        <nav>
            <ul className="pagination justify-content-center">
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber}
                    className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
                        <button className="page-link" onClick={() => onPageChange(pageNumber)}>
                            {pageNumber}
                        </button>
                    </li>
                ))}

            </ul>
            
        </nav>
    )
}

export default RoomPaginator