export const DisplayTask = ({ taskDetails }) => {
  return (
    <>
      <div>Title: {taskDetails?.title}</div>
      <div>Description: {taskDetails?.description}</div>
      <div>Priority: {taskDetails?.priority}</div>
    </>
  );
};

