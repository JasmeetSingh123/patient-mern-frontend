// import './App.css';

import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    axios
      .get("https://sparkling-gold-bandanna.cyclic.app/patients/")
      .then((response) => {
        setPatients(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleChangeContact = (e) => {
    setContact(e.target.value);
  };

  const handleChangePincode = (e) => {
    setPincode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPatient = {
      name: name,
      address: address,
      contact: contact,
      pincode: pincode,
    };

    if (name !== "" || address !== "" || contact !== "" || pincode !== "") {
      axios
        .post(
          "https://sparkling-gold-bandanna.cyclic.app/patients/add",
          newPatient
        )
        .then((res) => console.log(res.data));

      setPatients([...patients, newPatient]);
      setName("");
      setAddress("");
      setContact("");
      setPincode("");
    }
  };

  const handleDelete = (id) => {
    axios
      .delete("https://sparkling-gold-bandanna.cyclic.app/patients/" + id)
      .then((res) => console.log(res.data));

    setPatients(patients.filter((patient) => patient._id !== id));
  };

  const handleEdit = (id) => {
    const updatedPatient = {
      name: name,
      address: address,
      contact: contact,
      pincode: pincode,
    };

    axios
      .post(
        "https://sparkling-gold-bandanna.cyclic.app/patients/update/" + id,
        updatedPatient
      )
      .then((res) => console.log(res.data));

    setPatients(
      patients.map((patient) => {
        if (patient._id === id) {
          return {
            _id: id,
            name: name,
            address: address,
            contact: contact,
            pincode: pincode,
          };
        } else {
          return patient;
        }
      })
    );
    setName("");
    setAddress("");
    setContact("");
    setPincode("");
  };

  return (
    <>  
      <div className="flex flex-col items-center justify-center h-screen  w-full gap-12 bg-gradient-to-b from-black to-gray-600">
        <h2 className="text-2xl font-semibold text-white">Add New Patient</h2>
        <form onSubmit={handleSubmit} className='text-white flex flex-col gap-3 items-center'>
          <div className="flex gap-2">
            <label>Name:</label>
            <input className="text-black" type="text" value={name} onChange={handleChangeName} />
          </div>
          <div className="flex gap-2">
            <label>Address:</label>
            <input className="text-black" type="text" value={address} onChange={handleChangeAddress} />
          </div>
          <div className="flex gap-2">
            <label>Contact:</label>
            <input className="text-black" type="text" value={contact} onChange={handleChangeContact} />
          </div>
          <div className="flex gap-2">
            <label>Pincode:</label>
            <input className="text-black" type="text" value={pincode} onChange={handleChangePincode} />
          </div >
          <button className="bg-blue-600 w-1/2" type="submit">Add Patient</button>
        </form>

        <div className="flex flex-col items-center w-full text-white ">
          <h2 className="text-2xl font-bold text-white">Patients List</h2>
          <table className="flex flex-col gap-5 w-full">
            <thead className="flex w-full "> 
              <tr className="flex  w-full">
                <th className="w-[20%] ">Name</th>
                <th className="w-[20%]">Address</th>
                <th className="w-[20%]">Contact</th>
                <th className="w-[20%]">Pincode</th>
                <th className="w-[20%]">Actions</th>
              </tr>
            </thead>
            <tbody className="flex flex-col gap-3  w-full">
              {patients.map((patient) => (
                <tr className="flex w-full items-center" key={patient._id}>
                  <td className="w-[20%] items-center justify-center  ">{patient.name}</td>
                  <td className="w-[20%] ">{patient.address}</td>
                  <td className="w-[20%] items-center">{patient.contact}</td>
                  <td className="w-[20%] items-center">{patient.pincode}</td>
                  <td className="w-[20%] items-center flex justify-around">
                    <button className="bg-blue-600" onClick={() => handleDelete(patient._id)}>
                      Delete
                    </button>
                    <button
                    className="bg-blue-600"
                      onClick={() => {
                        setName(patient.name);
                        setAddress(patient.address);
                        setContact(patient.contact);
                        setPincode(patient.pincode);
                      }}
                      >
                      Edit
                    </button>
                    <button
                    className="bg-blue-600"
                      onClick={() => {
                        setName("");
                        setAddress("");
                        setContact("");
                        setPincode("");
                      }}
                      >
                      Cancel
                    </button>
                    <button className="bg-blue-600" onClick={() => handleEdit(patient._id)}>
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              </div>
        </div>
    </>
  );
}

export default App;
