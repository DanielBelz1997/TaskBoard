export const DisplayTask = ({ taskDetails }) => {
  <>
    <div>Title: {taskDetails?.title}</div>
    <div>Description: {taskDetails?.description}</div>
    <div>Priority: {taskDetails?.priority}</div>
  </>;
};
