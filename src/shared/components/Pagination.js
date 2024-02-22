import React from "react";

const Pagination = (totalItems, itemsPerPage) => {
  let pages = [];

  console.log(totalItems)
  console.log(itemsPerPage)


  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
    console.log(pages)
  }

  return (
    <div>
        {
        pages.map((page,index) =>{
            return <button key={index}>{page}</button>
         })
        }
    
    </div>
  );
};

export default Pagination;
