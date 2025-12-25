import Pagination from '@mui/material/Pagination';
import { current } from '@reduxjs/toolkit';

function Paginations({totalPages, currentPage, onChange}) {
  return <Pagination 
     count={totalPages}
     page={currentPage}
     defaultPage={1}
     siblingCount={2} 
     shape="rounded"
    color="primary"
    onChange={onChange} />;
}



export default Paginations;