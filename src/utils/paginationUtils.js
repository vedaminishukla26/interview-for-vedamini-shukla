export const computePagesToShow = ({ page, totalPages }) => {
  const pages = new Set();
  const add = (p) => {
    if (p >= 1 && p <= totalPages) pages.add(p);
  };

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) add(i);
  } else if (page <= 2) {
    for (let i = 1; i <= 3; i++) add(i);
    add(totalPages);
  } else if (page >= totalPages - 1) {
    add(1);
    for (let i = totalPages - 2; i <= totalPages; i++) add(i);
  } else {
    add(1);
    for (let i = page - 1; i <= page + 1; i++) add(i);
    add(totalPages);
  }

  return Array.from(pages).sort((a, b) => a - b);
};

export default computePagesToShow; 