// FileUpload.js
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudArrowUp, FaSpinner } from "react-icons/fa6";
const FileUpload = (props) => {
  const [error, setError] = useState("");
  console.log("error", error);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    frontImage: null,
    backImage: null,
  });
  console.log(formData);
  const onDropFront = (acceptedFiles) => {
    setFrontImage(URL.createObjectURL(acceptedFiles[0]));
    setFormData((prevData) => ({ ...prevData, frontImage: acceptedFiles[0] }));
    console.log("front image", formData.frontImage);
  };

  const onDropBack = (acceptedFiles) => {
    setBackImage(URL.createObjectURL(acceptedFiles[0]));
    // setFormData((formData.backImageImage = acceptedFiles[0]));
    setFormData((prevData) => ({
      ...prevData,
      backImage: acceptedFiles[0],
    }));
    console.log("front image", formData.backImage);
  };

  const { getRootProps: getRootFrontProps, getInputProps: getInputFrontProps } =
    useDropzone({
      onDrop: onDropFront,
      accept: "image/*",
    });

  const { getRootProps: getRootBackProps, getInputProps: getInputBackProps } =
    useDropzone({
      onDrop: onDropBack,
      accept: "image/*",
    });

  const handleUpload = () => {
    try {
      setIsloading(true);
      props.setAadharData(null);

      // onUpload({ frontImage, backImage });
      console.log("uploading", frontImage, backImage);
      console.log("formData", formData.frontImage);
      // Check if both front and back images are present
      if (!formData.frontImage || !formData.backImage) {
        console.error("Please upload both front and back images.");
        setError("Please upload both front and back images.");
        console.log(">>>", error);
        return;
      }

      // Create a FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("frontImage", formData.frontImage);
      formDataToSend.append("backImage", formData.backImage);

      // Fetch API call
      fetch("http://localhost:3001/api/upload", {
        method: "POST",
        body: formDataToSend,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response from the server
          console.log("Server response:", data);
          props.setAadharData(data);
          setIsloading(false);
        })
        .catch((error) => {
          console.error("Error sending data to server:", error);
          setError(error.message);
          setIsloading(false);
        })
        .finally();
    } catch (error) {
      console.error("An unexpected error occurred.", error);
      setError(error.message);
    } finally {
      setTimeout(() => {
        setError("");
        setIsloading(false);
      }, 30000);
    }
  };

  return (
    <div className="w-full md:w-1/2  h-auto mx-auto mt-5 p-6 border rounded-lg shadow-lg ">
      {error ? <div className="text-red-500 text-2xl">{error}</div> : null}
      <div className="mb-50 " {...getRootFrontProps()}>
        Aadhaar Front
        <div className=" m-5 flex  flex-col justify-center items-center  bg-slate-100 rounded-lg h-56">
          {frontImage ? (
            <img
              className="w-50 md:w-50 max-h-40   justify-center items-center text-blue-500"
              src={frontImage}
              alt="Front Aadhaar"
              srcset=""
            />
          ) : (
            <FaCloudArrowUp className="text-9xl  justify-center items-center text-blue-500" />
          )}

          <input {...getInputFrontProps()} />
          <p className="text-gray-600  ">
            Drop front image here, or click to select front image
          </p>
        </div>
      </div>
      <div className="mb-50 " {...getRootBackProps()}>
        Aadhaar Back
        <div className=" m-5 flex  flex-col justify-center items-center  bg-slate-100 rounded-lg h-56">
          {backImage ? (
            <img
              className="w-50 md:w-50 max-h-40  justify-center items-center text-blue-500"
              src={backImage}
              alt="Back Aadhaar"
              srcset=""
            />
          ) : (
            <FaCloudArrowUp className="text-9xl  justify-center items-center text-blue-500" />
          )}
          <input {...getInputBackProps()} />
          <p className="text-gray-600">
            Drop back image here, or click to select back image
          </p>
        </div>
      </div>
      <div className=" flex  flex-col justify-center items-center rounded-lg">
        <button
          onClick={handleUpload}
          className=" bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 relative"
          disabled={isloading} // Disable button when loading
        >
          {isloading ? (
            <>
              PARSING...
              <FaSpinner className="animate-spin absolute top-1/2 left-1/2" />{" "}
            </>
          ) : (
            "PARSE AADHAAR"
          )}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
