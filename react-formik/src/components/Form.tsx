import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = () =>
  Yup.object({
    title: Yup.string().required("Title is required..."),
    description: Yup.string().required("Description is required..."),
    assignee: Yup.string().required("Assignee is required..."),
    dueDate: Yup.string().required("Due Date is required..."),
  });

const Form = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      console.log("Form Submitted");
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title ? (
          <div style={{ color: "red" }}>{formik.errors.title}</div>
        ) : null}
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div style={{ color: "red" }}>{formik.errors.description}</div>
        ) : null}
        <label htmlFor="assignee">Assignee:</label>
        <input
          type="text"
          id="assignee"
          name="assignee"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.assignee}
        />
        {formik.touched.assignee && formik.errors.assignee ? (
          <div style={{ color: "red" }}>{formik.errors.assignee}</div>
        ) : null}
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dueDate}
        />
        {formik.touched.dueDate && formik.errors.dueDate ? (
          <div style={{ color: "red" }}>{formik.errors.dueDate}</div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Form;
