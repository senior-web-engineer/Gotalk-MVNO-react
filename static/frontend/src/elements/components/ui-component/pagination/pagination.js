import React, { useEffect } from "react";
import './pagination.scss';

export default function PaginationComponent({
                                                itemsCount,
                                                itemsPerPage,
                                                currentPage,
                                                setCurrentPage,
                                                alwaysShown = true
                                            }) {
    const pagesCount = Math.ceil(itemsCount / itemsPerPage);
    const isPaginationShown = alwaysShown ? true : pagesCount > 1;
    const isCurrentPageFirst = currentPage === 1;
    const isCurrentPageLast = currentPage === pagesCount;

    const changePage = number => {
        if (currentPage === number) return;
        setCurrentPage(number);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const onPageNumberClick = pageNumber => {
        changePage(pageNumber);
    };

    const onPreviousPageClick = () => {
        changePage(currentPage - 1);
    };

    const onNextPageClick = () => {
        changePage(currentPage + 1);
    };

    const setLastPageAsCurrent = () => {
        if (currentPage > pagesCount) {
            setCurrentPage(pagesCount);
        }
    };

    let isPageNumberOutOfRange;

    const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
        const pageNumber = index + 1;
        const isPageNumberFirst = pageNumber === 1;
        const isPageNumberLast = pageNumber === pagesCount;
        const isCurrentPageWithinTwoPageNumbers =
            Math.abs(pageNumber - currentPage) <= 2;

        if (
            isPageNumberFirst ||
            isPageNumberLast ||
            isCurrentPageWithinTwoPageNumbers
        ) {
            isPageNumberOutOfRange = false;
            return (
                <div className={`pagination-item ${pageNumber === currentPage ? 'pagination-item-active' : ''}`}
                    key={pageNumber}
                    onClick={() => onPageNumberClick(pageNumber)}
                >
                    {pageNumber}
                </div>
            );
        }

        if (!isPageNumberOutOfRange) {
            isPageNumberOutOfRange = true;
            return <div key={pageNumber} className="pagination-item pagination-ellipsis muted" />;
        }

        return null;
    });

    useEffect(setLastPageAsCurrent, [pagesCount]);

    return (
        <div className="pagination-wrapper">
            {isPaginationShown && (
                <div className="pagination">
                    <button type="button"
                            className="pagination-button pagination-button-prev"
                        onClick={onPreviousPageClick}
                        disabled={isCurrentPageFirst}
                    >«</button>
                    {pageNumbers}
                    <button type="button"
                            className="pagination-button pagination-button-next"
                        onClick={onNextPageClick}
                        disabled={isCurrentPageLast}
                    >»</button>
                </div>
            )}
        </div>
    );
};
