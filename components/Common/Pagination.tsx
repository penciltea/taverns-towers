import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationControls = ({ currentPage, totalPages, onPageChange }: PaginationControlsProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 2 }}>
      <Button
        variant="outlined"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Box sx={{ alignSelf: 'center' }}>
        Page {currentPage} of {totalPages}
      </Box>
      <Button
        variant="outlined"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationControls;
