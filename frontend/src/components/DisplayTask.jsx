import PropTypes from "prop-types";

export const DisplayTask = ({ taskDetails }) => {
  return (
    <>
      <div>Title: {taskDetails?.title}</div>
      <div>Description: {taskDetails?.description}</div>
      <div>Priority: {taskDetails?.priority}</div>
    </>
  );
};

DisplayTask.propTypes = {
  taskDetails: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    priority: PropTypes.number,
  }),
};

