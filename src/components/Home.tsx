import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import {
  useAllStudentsQuery,
  useDeleteStudentsMutation,
  useSingleViewUserQuery,
  useTotalNumberOfStudentsQuery,
} from "../redux/studentSlice";
import Dropdown from "react-bootstrap/Dropdown";
import threeDots from "../images/3Dots.svg";
import "../components/Home.css";
import AddUserModal from "./AddUserModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Audio, Circles } from "react-loader-spinner";
import Form from "react-bootstrap/Form";
import Pagination from "react-responsive-pagination";
import { useDispatch } from "react-redux";
import { logout } from "../redux/AuthApiSlice";
// import { useDebounce } from "use-debounce";

const Home = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const [details, setDetails] = useState<any>("");
  const [searchValue, setSearchValue] = useState("");
  const [sortBtn, setSortBtn] = useState(false);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [currentPageNumber, setCurrentPageNumber] = useState<any>(0);

  const pageSize = 5;
  // const totalPages=4;
  // const [text] = useDebounce(searchValue, 7000);

  const [deleteStudents] = useDeleteStudentsMutation();

  const notify = () => toast.success("Student deleted successfully ");

  const { data: dataTs } = useTotalNumberOfStudentsQuery();
  console.log("df", dataTs?.length);
  const totalPages = Math.ceil(dataTs?.length / pageSize);
  const { data, error, isLoading, isFetching, isSuccess } = useAllStudentsQuery(
    sortBtn
      ? {
          searchValue: searchValue,
          sorting: "id",
          orderType: "asc",
          initialEntry: currentPageNumber,
          finalEntry: currentPageNumber + 5,
        }
      : {
          searchValue: searchValue,
          sorting: "id",
          orderType: "desc",
          initialEntry: currentPageNumber,
          finalEntry: currentPageNumber + 5,
        }
  );
  console.log("sortBtn", data);

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
  const handlePagination = (page: number) => {
    console.log("event", page);
    setCurrentPage(page);
    if (page === 1) {
      setCurrentPageNumber(0);
    } else {
      setCurrentPageNumber(page * pageSize - pageSize);
    }
  };

  const handleLogout=()=>{
    dispatch(logout());
    toast.success('Student logout successfully!');
    navigate('/auth');
  }
  const handleSort = () => {
    setSortBtn(!sortBtn);
    if (!sortBtn) {
      toast.success("Data sorted in ascending order");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center my-4 gap-3 align-items-center">
        <Button variant="secondary" className="m-0" onClick={handleAddUser}>
          Add User
        </Button>
        <Form.Group className="m-0" controlId="formBasicEmail">
          <Form.Control
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="email"
            placeholder="search by name"
          />
        </Form.Group>
        <Button variant="light" className="m-0" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
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
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : error ? (
          <h1>error</h1>
        ) : isSuccess ? (
          <Table striped bordered hover>
            <thead>
              <tr style={{ cursor: "pointer" }} onClick={handleSort}>
                <th>S.no.</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    {sortBtn && currentPage === 1
                      ? dataTs?.length - index
                      : sortBtn && currentPage
                      ? dataTs?.length +
                        pageSize -
                        index -
                        pageSize * currentPage
                      : currentPage === 1
                      ? index + 1
                      : currentPage * pageSize - pageSize + 1 + index}
                  </td>
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
        <div className="d-flex justify-content-end w-100 my-4">
          <Pagination
            current={currentPage}
            total={totalPages}
            onPageChange={(page) => handlePagination(page)}
          />
        </div>
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
