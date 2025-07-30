import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [about, setAbout] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formData.append("about", about);

      // console log formdata
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setFees("");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="w-full max-w-4xl m-5">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border border-gray-300 rounded-xl shadow-md w-full max-h-[80vh] overflow-y-auto space-y-6">
        {/* Upload */}
        <div className="flex items-center gap-5 text-gray-600">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-20 h-20 object-cover bg-gray-100 rounded-full border border-gray-300"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-sm text-gray-500 leading-tight">
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col lg:flex-row gap-8 text-gray-700">
          <div className="w-full lg:flex-1 flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Doctor Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter name"
                required
                className="input-style"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter email"
                required
                className="input-style"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter password"
                required
                className="input-style"
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label className="mb-1 font-medium">Experience</label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="input-style"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>
                    {i + 1 === 10 ? "10+ Year" : `${i + 1} Year`}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Fees</label>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="number"
                placeholder="Enter fees"
                required
                className="input-style"
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="mb-1 font-medium">Speciality</label>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="input-style"
              >
                <option>General physician</option>
                <option>Gynecologist</option>
                <option>Dermatologist</option>
                <option>Pediatricians</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Education</label>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="Enter education"
                required
                className="input-style"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="mb-1 font-medium">Address</label>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                type="text"
                placeholder="Address line 1"
                required
                className="input-style"
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                type="text"
                placeholder="Address line 2"
                required
                className="input-style"
              />
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">About Doctor</label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="Write about the doctor"
            rows={4}
            required
            className="input-style resize-none"
          />
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-[var(--color-primary)] hover:bg-indigo-600 text-white rounded-lg font-semibold transition"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
