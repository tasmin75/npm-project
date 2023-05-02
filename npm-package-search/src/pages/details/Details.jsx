import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GrFormView } from "react-icons/gr";
import { RiEditBoxFill } from "react-icons/ri";
import { AiTwotoneDelete } from "react-icons/ai";
import Swal from "sweetalert2";

export default function Details() {
  const allDataFromLocal = JSON.parse(localStorage.getItem("favNpm")) || [];
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [packName, setPackName] = useState("");
  const [ediMesage, setEdiMessage] = useState("");
  const [enableEdit, setEnableEdit] = useState(false);
  const [deleted, setDeleted] = useState(1);
  const [editingId, setEditingId] = useState("");

  const goToAddFav = () => {
    navigate("/addfav");
  };

  const handleEdit = (id) => {
    const tempdata = allDataFromLocal.find((item) => item.id == id);
    if (tempdata != undefined) {
      setEnableEdit(true);
      setEditingId(tempdata.id);

      setPackName(tempdata.packageName);
      setEdiMessage(tempdata.message);
    } else {
      setEnableEdit(false);
    }
  };

  const handleView = (id) => {
    const tempdata = allDataFromLocal.find((item) => item.id == id);
    if (tempdata != undefined) {
      setMessage(tempdata.message);
    } else {
      setMessage("");
    }
  };

  const handleEditSubmission = () => {
    const tempdata = [...allDataFromLocal];
    const editedData = tempdata.map((item) => {
      if (item.id == editingId) {
        return { id: editingId, packageName: packName, message: ediMesage };
      } else {
        return item;
      }
    });
    localStorage.setItem("favNpm", JSON.stringify(editedData));
    setEdiMessage("");
    setPackName("");
    setEnableEdit(false);
  };

  const handleDeletion = (id) => {
    setDeleted(deleted + 1);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this! (Refresh the page)",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const tempdata = [...allDataFromLocal];
        const AfterDeletionData = tempdata.filter((item) => item.id != id);
        localStorage.setItem("favNpm", JSON.stringify(AfterDeletionData));
      }
    });
    setDeleted(deleted + 1);
    console.log(deleted);
  };

  return (
    <div>
      <h1>Welcome to Favourite Npm packages</h1>
      <p>Detail Page</p>
      <button
        className="btn ps-4 pe-4 mb-4 text-white ms-5"
        style={{ backgroundColor: "#6558F5" }}
        onClick={goToAddFav}
      >
        Add Fav
      </button>
      <table className="table border table-hover">
        <thead>
          <tr>
            <th>Package Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allDataFromLocal.map((item) => (
            <tr key={item.id}>
              <td>{item.packageName}</td>
              <td>
                <span onClick={() => handleView(item.id)}>
                  <GrFormView fontSize={30} />
                </span>{" "}
                &nbsp;
                <span onClick={() => handleEdit(item.id)}>
                  <RiEditBoxFill fontSize={20} />
                </span>{" "}
                &nbsp;
                <span onClick={() => handleDeletion(item.id)}>
                  <AiTwotoneDelete fontSize={20} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1> {message}</h1>

      {enableEdit && (
        <div>
          <input
            className="form-control mx-auto m-3"
            style={{ width: "50%" }}
            type="text"
            value={packName}
            onChange={(e) => setPackName(e.target.value)}
          />
          <input
            className="form-control mx-auto m-3"
            style={{ width: "50%" }}
            type="text"
            value={ediMesage}
            onChange={(e) => setEdiMessage(e.target.value)}
          />
          <button
            className="btn btn-success ps-5 pe-5 text-white ms-5"
            onClick={handleEditSubmission}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
