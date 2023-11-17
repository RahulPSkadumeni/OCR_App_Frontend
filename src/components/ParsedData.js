import React, { useEffect, useState } from "react";

const ParsedData = (props) => {
  console.log(">>>>>>>>>>>>", props.aadhaarData);
  const aadhaarData = props.aadhaarData || {};
  const [name, setName] = useState(aadhaarData.name || "");
  console.log(name);
  const [aadharNumber, setAadharNumber] = useState(
    aadhaarData.aadharNumber || ""
  );
  const [dob, setDob] = useState(aadhaarData.dob || "");
  const [gender, setGender] = useState(aadhaarData.gender || "");
  const [address, setAddress] = useState(aadhaarData.address || "");
  const [pincode, setPincode] = useState(aadhaarData.pincode || "");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAadhaarNumberChange = (e) => {
    setAadharNumber(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/saveuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Assuming you're sending JSON data
        },
        body: JSON.stringify({
          name,
          aadharNumber,
          dob,
          gender,
          address,
          pincode,
        }),
      });

      if (response.ok) {
        // Handle successful response
        console.log("User data saved successfully!");
        // You might want to perform additional actions after successful submission
      } else {
        // Handle error response
        console.error("Failed to save user data");
      }
    } catch (error) {
      // Handle fetch errors
      console.error("Error occurred while saving user data:", error);
    }
  };

  useEffect(() => {
    console.log("useffect");
    const aadhaarData = props.aadhaarData;
    setName(aadhaarData.name);
    setAadharNumber(aadhaarData.aadharNumber);
    setDob(aadhaarData.dob);
    setGender(aadhaarData.gender);
    setAddress(aadhaarData.address);
    setPincode(aadhaarData.pincode);
  }, [props.aadhaarData]);

  return (
    <div className="bg-slate-100 border rounded-lg  md:m-2 md:p-5">
      <h1 className="p-1">Api Response</h1>

      <form>
        <div className=" flex  flex-col md:flex-row m-2 ">
          <div className="flex flex-col w-full md:w-1/2 ">
            <p className="text-slate-400">Aadhaar Number</p>
            <input
              placeholder="enter Aadhar number"
              className="bg-slate-100 text-base border-b border-gray-300 outline-none "
              type="text"
              value={aadharNumber}
              onChange={handleAadhaarNumberChange}
              required
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 ml-2 ">
            <p className="text-slate-400">Name On Aadhaar</p>
            <input
              placeholder="Name on aadhar"
              className="bg-slate-100   text-base border-b border-gray-300 outline-none"
              type="text"
              defaultValue={name}
              onChange={handleNameChange}
              required
            />
          </div>
        </div>

        <div className=" flex  flex-col md:flex-row m-2  ">
          <div className="flex flex-col  w-full md:w-1/2 ">
            <p className="text-slate-400">Date of Birth</p>
            <input
              className="bg-slate-100  text-base border-b border-gray-300 outline-none "
              type="text"
              value={dob}
              onChange={handleDobChange}
              required
            />
          </div>

          <div className="flex flex-col  w-full md:w-1/2  ml-2">
            <p className="text-slate-400">Gender</p>
            <input
              placeholder="specify gender"
              className="bg-slate-100  text-base border-b border-gray-300 outline-none "
              type="text"
              value={gender}
              onChange={handleGenderChange}
              required
            />
          </div>
        </div>
        <div className="flex  flex-col md:flex-row  m-2">
          <div className="flex flex-col  w-full md:w-1/2 ">
            <p className="text-slate-400">Address</p>
            <textarea
              className="bg-slate-100 w-full   text-base border-b border-gray-300 outline-none p-2 resize-none focus:outline-none"
              value={address}
              onChange={handleAddressChange}
              rows={1}
              style={{ minHeight: "100px", height: "auto" }}
              required
            />
          </div>

          <div className="flex flex-col  w-full md:w-1/2 ml-2">
            <p className="text-slate-400">Pincode</p>
            <input
              className="bg-slate-100  text-base border-b border-gray-300 outline-none"
              type="text"
              value={pincode}
              onChange={handlePincodeChange}
              required
            />
          </div>
        </div>
        <div className="flex mt-5 mb-5 flex-col justify-center items-center rounded-lg">
          <button
            onClick={handleSubmit}
            className="justify-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Save User Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParsedData;
