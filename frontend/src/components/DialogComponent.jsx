import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";

export function DialogComponent({
  open,
  setOpen,
  setClose,
  title,
  acceptFun,
  acceptText,
  acceptIcon,
  children,
  ...rest
}) {
  return (
    <Dialog
      {...rest}
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="xs"
      fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <Divider />

      <DialogContent>{children}</DialogContent>

      <DialogActions>
        <Button
          startIcon={<IoMdClose />}
          variant="text"
          onClick={() => setClose()}>
          Close
        </Button>

        <Button startIcon={acceptIcon} onClick={acceptFun}>
          {acceptText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setClose: PropTypes.func.isRequired,
  acceptFun: PropTypes.func.isRequired,
  acceptText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  acceptIcon: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
};

