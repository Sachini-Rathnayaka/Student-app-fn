import axios from 'axios';
import { useState } from 'react';
import './Student.css';

function Student() {
  const [studentId, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [studentAddress, setAddress] = useState('');
  const [mobile, setMobile] = useState('');

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/v1/student/save', {
        studentname: firstName,
        lastname: lastName,
        age: age,
        studentaddress: studentAddress,
        mobile: mobile,
      });
      alert('Student Registration Successfully');
      setId('');
      setFirstName('');
      setLastName('');
      setAge('');
      setAddress('');
      setMobile('');
    } catch (err) {
      alert('User Registration Failed');
    }
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put('http://localhost:8080/api/v1/student/edit/' + studentId, {
        studentname: firstName,
        lastname: lastName,
        age: age,
        studentaddress: studentAddress,
        mobile: mobile,
      });
      alert('Registration Updated');
      setId('');
      setFirstName('');
      setLastName('');
      setAge('');
      setAddress('');
      setMobile('');
    } catch (err) {
      alert('Student Update Failed');
    }
  }

  return (
    <div className="container">
      <h1>Welcome to the student management system</h1>
      <div className="form-container">
        <h2>Syudent Details</h2>
        <form>
          <div className="form-columns">
            <div className="column">
              <div className="form-group">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>
            <div className="column">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="studentAddress"
                  value={studentAddress}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </div>
            </div>
            <div className="column">
              <div className="form-group">
                <label>Contact No</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="button-group">
            <button className="btn btn-primary" onClick={save}>
              Register
            </button>
            <button className="btn btn-warning" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Student;