import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSingleViewUserQuery } from "../redux/studentSlice";
import { Audio } from "react-loader-spinner";

const ViewStudentDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log("id", params);
  const paramId = params?.id || "";
  const { data, isFetching } = useSingleViewUserQuery(paramId);
  console.log("dataeee", data);

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center min-vh-100 ">
        {isFetching ? (
          <Audio
            height="80"
            width="80"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
          />
        ) : (
          <div className="d-flex justify-content-center align-items-center flex-column gap-3">
            <h1>Name : {data?.name}</h1>
            <h1>Phone : {data?.phone}</h1>
            <Button variant="secondary" onClick={() => navigate('/home')}>
              Home page
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStudentDetails;
