import axios from "axios";
import { useState, useEffect } from "react";
import "./Student.css";

function Student() {
  const [studentId, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentAddress, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8080/api/v1/student/getAll"
      );
      console.log("API Response:", result.data); // Temporary log to check data structure
      if (Array.isArray(result.data)) {
        setStudents(result.data);
      } else if (result.data.content) {
        setStudents(result.data.content);
      }
    } catch (err) {
      alert("Error loading students: " + err.message);
    }
  };

  async function save(event) {
    event.preventDefault();
    try {
      const studentData = {
        firstName: firstName,
        lastName: lastName,
        studentAddress: studentAddress,
        contactNumber: mobile,
      };

      const response = await axios.post(
        "http://localhost:8081/api/v1/student/save",
        studentData
      );
      console.log("Save response:", response.data); // Temporary log to check saved data
      alert("Student Registration Successful");
      clearForm();
      loadStudents();
    } catch (err) {
      alert("User Registration Failed: " + err.message);
    }
  }

  async function update(event) {
    event.preventDefault();
    if (!studentId) {
      alert("No student selected for update");
      return;
    }
    try {
      const studentData = {
        firstName: firstName,
        lastName: lastName,
        studentAddress: studentAddress,
        contactNumber: mobile,
      };

      await axios.put(
        `http://localhost:8081/api/v1/student/edit/${studentId}`,
        studentData
      );
      alert("Student Updated Successfully");
      clearForm();
      loadStudents();
    } catch (err) {
      alert("Student Update Failed: " + err.message);
    }
  }

  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://localhost:8081/api/v1/student/delete/${id}`);
        alert("Student deleted successfully");
        loadStudents();
        if (studentId === id) {
          clearForm();
        }
      } catch (err) {
        alert("Error deleting student: " + err.message);
      }
    }
  };

  const editStudent = (student) => {
    setId(student.id);
    setFirstName(student.firstName || "");
    setLastName(student.lastName || "");
    setAddress(student.studentAddress || "");
    setMobile(student.contactNumber || "");
    setIsEditing(true);
  };

  const clearForm = () => {
    setId("");
    setFirstName("");
    setLastName("");
    setAddress("");
    setMobile("");
    setIsEditing(false);
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>
      <div className="form-container">
        <h2>{isEditing ? "Edit Student" : "Add New Student"}</h2>
        <form onSubmit={isEditing ? update : save}>
          <div className="form-columns">
            <div className="column">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="column">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={studentAddress}
                  onChange={(event) => setAddress(event.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="button-group">
            {isEditing ? (
              <>
                <button type="submit" className="btn btn-warning">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={clearForm}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="students-list">
        <h2>Students List</h2>
        <table className="students-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Contact Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((student, index) => {
                // Temporary log to check individual student data
                console.log("Student data:", student);
                return (
                  <tr key={student.id || index}>
                    <td>{student.firstName || "N/A"}</td>
                    <td>{student.lastName || "N/A"}</td>
                    <td>{student.studentAddress || "N/A"}</td>
                    <td>{student.contactNumber || "N/A"}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => editStudent(student)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
