import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import {
  useAllStudentsQuery,
  useDeleteStudentsMutation,
  useSingleViewUserQuery,
} from "../redux/studentSlice";
import Dropdown from "react-bootstrap/Dropdown";
import threeDots from "../images/3Dots.svg";
import "../components/Home.css";
import AddUserModal from "./AddUserModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

const Home = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState<boolean>(false);
  const [details, setDetails] = useState<any>("");

  const [deleteStudents] = useDeleteStudentsMutation();
  const notify = () => toast.success("Student deleted successfully ");

  const { data, error, isLoading, isFetching, isSuccess } =
    useAllStudentsQuery();

  const handleDelete = async (id: any) => {
    if (!window.confirm("Are you sure you want to delete this student ?")) {
      return;
    }
    try {
      await deleteStudents(id);
      notify();
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleEdit = (id: any) => {
    try {
      const singleStudentData = data?.filter((item) => item.id === id);
      const studentDetail = singleStudentData && singleStudentData[0];
      setDetails(studentDetail);
      setModal(true);
      console.log("dDDDD", singleStudentData && singleStudentData[0]);
    } catch (error: any) {
      console.log("ee", error);
    }
  };
  const handleAddUser = () => {
    setModal(true);
    setDetails("");
  };
  const handleView = (id: any) => {
    navigate(`/view/${id}`);
  };

  console.log("DD", data);
  return (
    <div>
      <div className="d-flex justify-content-center my-4 align-items-center flex-column">
        <Button variant="secondary" onClick={handleAddUser}>
          Add User
        </Button>
        <Button variant="secondary">Date</Button>
      </div>
      <div className="d-flex justify-content-center align-items-center">
      {isLoading ? (
        <Audio
        height="80"
        width="80"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
      ) : isFetching ? (
        <h1>...fetching</h1>
      ) : error ? (
        <h1>error</h1>
      ) : isSuccess ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.no.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>
                  <Dropdown>
                    <Dropdown.Toggle
                      className="text-left bg-transparent shadow-none border-0 w-10 dropDown"
                      variant="success"
                      id="dropdown-basic"
                    >
                      <img
                        src={threeDots}
                        alt="threeDots"
                        height={19}
                        width={5}
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleView(item.id)}>
                        View
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleEdit(item.id)}>
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(item.id)}>
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}

      {modal && (
        <AddUserModal
          setDetails={setDetails}
          details={details}
          modal={modal}
          onHide={() => setModal(false)}
        />
      )}
      </div>
    </div>
  );
};

export default Home;
