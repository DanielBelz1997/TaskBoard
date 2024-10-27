import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const CustomizedDialogs = ({
  open,
  onClose,
  title,
  content,
  buttonText,
}) => {
  return (
    <>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}>
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {content.map((text, index) => (
            <Typography key={index} gutterBottom>
              {text}
            </Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            {buttonText || "Save changes"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

CustomizedDialogs.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.string).isRequired,
  buttonText: PropTypes.string,
};

