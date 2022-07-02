import React, { useEffect } from "react";
import { useState } from "react";
import { X } from "react-feather";
import { useAccount } from "wagmi";

const FormData = require("form-data");
const axios = require("axios");

function Adminpage(props) {
  const { isModalOpen, setIsModalOpen } = props;
  const { data } = useAccount();
  const userAddress = data?.address;
  const [values, setValues] = useState({
    name: "",
    description: "",
    image: "",
    link: "",
  });
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionErr, setSubmissionErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await fetch(
        "https://cryptoawards-98f49-default-rtdb.firebaseio.com/listofcourses.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/JSON",
          },
          body: JSON.stringify({
            name: values.name,
            description: values.description,
            image: fileURL,
            link: values.link,
            account: userAddress,
          }),
        }
      );

      setIsSubmitting(false);
      setIsModalOpen(false);
    } catch (err) {
      setIsSubmitting(false);
      console.log(err);
      setSubmissionErr(err.message || err);
    }
  };

  // to handle change in input fields
  const handleName = (event) => {
    setValues({ ...values, name: event.target.value });
  };
  const handleDescription = (event) => {
    setValues({ ...values, description: event.target.value });
  };
  const handleImage = (event) => {
    setValues({ ...values, image: event.target.value });
    handleIPFSUpload(event.target.files[0]);
  };
  const handleLink = async (event) => {
    setValues({ ...values, link: event.target.value });
  };
  const handleaccount = async (event) => {
    setValues({ ...values, account: event.target.value });
  };

  // to upload image to IPFS
  const pinata_api_key = "df3d4848f3d2cf5fc681";
  const pinata_secret_api_key =
    "ceb4d3f8f9caa065f30882015b871b1972d316d8133ca1be096a8f54a234ddb2";
  const [fileURL, setFileURL] = useState("");

  const handleIPFSUpload = (file) => {
    setIsFileUploading(true);
    const apiURL = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    let data = new FormData();
    data.append("file", file);
    axios
      .post(apiURL, data, {
        headers: {
          "Content-Type": `multipart/form-data; boundary= ${data._boundary}`,
          pinata_api_key: pinata_api_key,
          pinata_secret_api_key: pinata_secret_api_key,
        },
      })
      .then(function (response) {
        setIsFileUploading(false);
        setFileURL(
          `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
        );
      })
      .catch(function (error) {
        setIsFileUploading(false);
        console.log("error", error);
      });
  };

  const [projects, setProjects] = useState({});
  useEffect(() => {
    setProjects(JSON.parse(localStorage.getItem("projects")));
  }, []);

  const reset = () => {
    setIsModalOpen(false);
    setIsFileUploading(false);
    setFileURL("");
    setValues({
      image: "",
    });
  };

  if (isModalOpen) {
    return (
      <div className="bg-black bg-opacity-30 fixed top-0 right-0 h-full w-full flex items-center justify-center">
        <div className="form-container bg-white w-[45rem] rounded-2xl p-6 relative">
          <h1 className="text-gray-900 font-medium text-xl mb-6 text-left">
            Add course details
          </h1>
          <form className="flex flex-col gap-6 register-form">
            <Input
              type="text"
              onChange={handleName}
              value={values.name}
              placeholder="Title"
              name="name"
              required
            />
            <Input
              onChange={handleDescription}
              value={values.description}
              placeholder="Description"
              name="description"
              required
              type="text"
            />
            <Input
              onChange={handleImage}
              type="file"
              value={values.image}
              placeholder="Image"
              name="image"
              id="image"
              required
            />
            <Input
              onChange={handleLink}
              value={values.link}
              placeholder="Link"
              name="link"
              required
              type="text"
            />

            <div
              className={`mt-5 flex justify-between w-full ${
                fileURL ? "items-end" : "items-center"
              }`}
            >
              {isFileUploading ? (
                <p className="text-gray-600">File is uploading...</p>
              ) : fileURL ? (
                <div className="flex flex-col justify-start">
                  <p className="font-medium text-gray-900 text-left mb-2 text-lg">
                    Image preview
                  </p>
                  <img src={fileURL} className="w-40 rounded-md" />
                </div>
              ) : (
                <p className="text-gray-600">Please fill the form</p>
              )}
              <button
                type="submit"
                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-md disabled:bg-gray-300"
                disabled={isFileUploading || !userAddress || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting && (
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-white animate-spin mr-2 -ml-2"></div>
                )}
                {isSubmitting ? "Submitting" : "Submit"}
              </button>
            </div>
            {submissionErr && (
              <p className="w-full bg-red-100 text-red-500 p-2 rounded-md text-sm">
                {submissionErr}
              </p>
            )}
          </form>

          <button
            className="absolute top-6 right-6 w-7 h-7 rounded-full bg-gray-200 flex justify-center items-center"
            onClick={reset}
          >
            <X className="w-5 h-5 text-gray-700 font-medium" />
          </button>
        </div>
      </div>
    );
  } else return null;
}

const Input = ({ type, name, placeholder, value, onChange, id }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      id={id}
      className="px-2 h-12 rounded-md bg-gray-100 flex items-center border-2 border-gray-200 focus:border-blue-200 w-full focus:bg-white"
      required
    />
  );
};
export default Adminpage;
