import { PropTypes } from "prop-types";

export const Form = ({ register, errors, updateTaskDetails }) => {
  return (
    <form>
      <div>
        <label
          htmlFor="title"
          style={{
            display: "flex",
            marginBottom: "0.5rem",
            marginTop: "0.5rem",
          }}>
          Title
        </label>
        <input
          id="title"
          type="text"
          defaultValue={updateTaskDetails?.title}
          style={{ width: "30vh", height: "3vw" }}
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <div style={{ color: "red", marginTop: "0.5rem" }}>
            {errors.title.message}
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          style={{
            display: "flex",
            marginBottom: "0.5rem",
            marginTop: "0.5rem",
          }}>
          Description
        </label>
        <textarea
          defaultValue={updateTaskDetails?.description}
          id="description"
          style={{ width: "40vh", height: "7vw" }}
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <div style={{ color: "red" }}>{errors.description.message}</div>
        )}
      </div>
    </form>
  );
};

Form.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    title: PropTypes.shape({
      message: PropTypes.string,
    }),
    description: PropTypes.shape({
      message: PropTypes.string,
    }),
  }).isRequired,
  updateTaskDetails: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

