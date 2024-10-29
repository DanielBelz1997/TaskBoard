import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export const Action = ({ handleSnackBarClose, handleUndo }) => {
  return (
    <>
      <Button color="secondary" size="small" onClick={handleUndo}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackBarClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
};

Action.propTypes = {
  handleSnackBarClose: PropTypes.func.isRequired,
  handleUndo: PropTypes.func.isRequired,
};
