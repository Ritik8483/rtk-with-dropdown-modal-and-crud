import { Form, Formik } from "formik";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputField from "./InputField";
import * as Yup from "yup";
import {
  useAddStudentsMutation,
  useUpdateStudentsMutation,
} from "../redux/studentSlice";
import { toast } from "react-toastify";
import { CloseButton } from "react-bootstrap";

const AddUserModal = ({ modal, onHide, details, setDetails }: any) => {
  const [addStudents] = useAddStudentsMutation();
  const [updateStudents] = useUpdateStudentsMutation();

  const notify = () => toast.success("Student added successfully ");
  const updateToast = () => toast.success("Student updated successfully ");

  const submitDetails = async (values: any) => {
    if (details.id) {
      if (details.name === values.name) {
        toast.error('No update performed');
      } else {
        try {
          await updateStudents({ ...values, id: details.id });
          updateToast();
        } catch (error: any) {
          console.log("error", error);
        }
      }
    } else {
      try {
        await addStudents(values);
        notify();
      } catch (error: any) {
        console.log("error", error);
      }
    }
    console.log("values", values);
    onHide();
  };
  const initialValues = {
    name: "",
    phone: "",
  };
  const validation = Yup.object().shape({
    name: Yup.string()
      .min(5, "Must be 5 characters or more")
      .required("Name is required"),
    phone: Yup.string()
      .min(5, "Invalid phone number")
      .required(" Phone Number is required"),
  });
  const handleClose = () => {
    onHide();
  };
  const handleCloseButton = () => {
    onHide();
  };
  console.log("details : ", details);
  return (
    <div>
      <Modal show={modal} onHide={onHide}>
        <Modal.Header>
          <Modal.Title className="w-100 d-flex justify-content-between align-items-center">
            Add Student
            <CloseButton onClick={handleCloseButton} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            onSubmit={submitDetails}
            initialValues={details || initialValues}
            enableReinitialize={true}
            validationSchema={validation}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <InputField
                  controlId="validation01"
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  errors={errors.name}
                  isInvalid={!!errors.name}
                  placeholder="Enter your name"
                  type="text"
                />
                <InputField
                  controlId="validation02"
                  name="phone"
                  label="Phone Number"
                  value={values.phone}
                  onChange={handleChange}
                  errors={errors.phone}
                  isInvalid={!!errors.phone}
                  placeholder="Enter your phone number"
                  type="number"
                />

                <div className="d-flex justify-content-end w-100 mt-2">
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddUserModal;
