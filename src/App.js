import { useEffect, useState } from "react";
import FileUpload from "./components/FileUpload";
import ParsedData from "./components/ParsedData";

function App() {
  const [aadhaarData, setAadharData] = useState(null);

  console.log("VVVVVVVVVVVVVV", aadhaarData);
  useEffect(() => {
    console.log(" useeffect first");
  }, [aadhaarData]);

  return (
    <div className=" h-screen">
      <header className=" bg-slate-200 m-3 shadow-lg p-2 rounded-full  text-xl md:text-5xl font-semibold text-sky-600 flex justify-center items-center">
        Aadhaar OCR System
      </header>
      <div className="flex flex-col md:flex-row m-3 pb-5">
        <FileUpload aadhaarData={aadhaarData} setAadharData={setAadharData} />
        <div className="w-full md:w-1/2  mt-3 p-6 mx-auto border shadow-lg rounded-lg  flex flex-col ">
          <h1 className="text-lg  font-medium">Parsed Data</h1>
          {aadhaarData ? (
            <ParsedData aadhaarData={aadhaarData} />
          ) : (
            <div className=" m-5  flex  flex-col  justify-center items-center p-5 bg-slate-100 rounded-lg h-auto">
              <p>
                "Start performing OCR by inputting your Aadhaar front and back"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
