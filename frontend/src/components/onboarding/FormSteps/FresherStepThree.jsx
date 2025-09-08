

import React, { useState } from "react";
import { ProgressIndicator } from "../ProgressIndicator";
import { ChevronDownIcon, UploadIcon } from "lucide-react";

export const FresherStepThree = ({ onNext, onCancel, onBack = onCancel, formData, onChange }) => {
  const [localFormData, setLocalFormData] = useState({
    college: "",
    degree: "",
    yearOfGraduation: "",
    fieldOfStudy: "",
    cgpa: "",
    certificate: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLocalFormData((prev) => ({ ...prev, certificate: e.target.files[0] }));
    }
  };

  const handleClick = () => {
    onChange({ ...formData, ...localFormData });
    // console.log(formData);
    onNext();
  }

  return (
    <div className="justify-center items-stretch bg-white z-0 flex min-w-60 flex-col w-[560px] my-auto p-12 max-md:max-w-full max-md:px-5">
      <ProgressIndicator currentStep={3} totalSteps={5} />

      <div className="flex w-full flex-col items-stretch justify-center mt-8 max-md:max-w-full">
        <div className="w-full text-black max-md:max-w-full">
          <h2 className="text-[32px] font-bold leading-[42px] max-md:max-w-full">
            Let's add your educational background!
          </h2>
          <p className="text-base font-normal leading-6 mt-2 max-md:max-w-full">
            Provide your academic background to match with relevant job and
            internship opportunities. Employers consider this when shortlisting
            candidates.
          </p>
        </div>

        <form className="w-full text-base font-normal mt-8 max-md:max-w-full">
          <div className="w-full whitespace-nowrap max-md:max-w-full">
            <label
              htmlFor="college"
              className="block text-black max-md:max-w-full"
            >
              College/University
            </label>
            <div className="relative">
              <select
                id="college"
                name="college"
                value={localFormData.college}
                onChange={handleChange}
                className="items-center appearance-none flex min-h-12 w-full gap-2 text-[#666] mt-2 p-3 max-md:max-w-full border border-gray-300 rounded"
              >
                <option value="" disabled selected>
                  Placeholder
                </option>
                <option value="university1">University 1</option>
                <option value="university2">University 2</option>
                <option value="university3">University 3</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none" />
            </div>
          </div>

          <div className="flex w-full gap-6 mt-6 max-md:max-w-full">
            <div className="whitespace-nowrap flex-1 shrink basis-[0%]">
              <label htmlFor="degree" className="block text-black">
                Degree
              </label>
              <div className="relative">
                <select
                  id="degree"
                  name="degree"
                  value={localFormData.degree}
                  onChange={handleChange}
                  className="items-center appearance-none bg-white flex min-h-12 w-full gap-2 text-[#666] mt-2 p-3 border border-gray-300 rounded"
                >
                  <option value="" disabled selected>
                    Placeholder
                  </option>
                  <option value="bachelors">Bachelor's</option>
                  <option value="masters">Master's</option>
                  <option value="phd">PhD</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none" />
              </div>
            </div>

            <div className="flex-1 shrink basis-[0%]">
              <label htmlFor="yearOfGraduation" className="block text-black">
                Year of Graduation
              </label>
              <div className="relative">
                <select
                  id="yearOfGraduation"
                  name="yearOfGraduation"
                  value={localFormData.yearOfGraduation}
                  onChange={handleChange}
                  className="items-center appearance-none bg-white flex min-h-12 w-full gap-2 text-[#666] whitespace-nowrap mt-2 p-3 border border-gray-300 rounded"
                >
                  <option value="" disabled selected>
                    Placeholder
                  </option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="w-full mt-6 max-md:max-w-full">
            <label
              htmlFor="fieldOfStudy"
              className="block text-black max-md:max-w-full"
            >
              Field of Study / Specialization
            </label>
            <div className="relative">
              <select
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={localFormData.fieldOfStudy}
                onChange={handleChange}
                className="items-center appearance-none flex min-h-12 w-full gap-2 text-[#666] whitespace-nowrap mt-2 p-3 max-md:max-w-full border border-gray-300 rounded"
              >
                <option value="" disabled selected>
                  Placeholder
                </option>
                <option value="computerScience">Computer Science</option>
                <option value="engineering">Engineering</option>
                <option value="business">Business</option>
                <option value="arts">Arts</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none" />
            </div>
          </div>

          <div className="w-full text-black mt-6 max-md:max-w-full">
            <label htmlFor="cgpa" className="block max-md:max-w-full">
              Current CGPA/Percentage
            </label>
            <input
              id="cgpa"
              name="cgpa"
              type="text"
              value={localFormData.cgpa}
              onChange={handleChange}
              className="flex min-h-12 w-full gap-2 mt-2 py-3 px-3 border border-gray-300 rounded"
              placeholder="Enter your CGPA or percentage"
            />
          </div>

          <div className="w-full mt-6 max-md:max-w-full">
            <label
              htmlFor="certificate"
              className="block text-black max-md:max-w-full"
            >
              Degree Certificate (Optional)
            </label>
            <label className="items-center flex min-h-12 w-full gap-2 text-[#666] mt-2 p-3 max-md:max-w-full border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
              <span className="self-stretch flex-1 shrink basis-[0%] my-auto">
                {localFormData.certificate
                  ? localFormData.certificate.name
                  : "Upload Degree Certificate"}
              </span>
              <UploadIcon className="self-stretch w-6 shrink-0 h-6 my-auto" />
              <input
                id="certificate"
                name="certificate"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div className="flex min-h-12 w-full gap-2.5 whitespace-nowrap mt-6 max-md:max-w-full">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onBack}
                className="self-stretch gap-2 text-black px-6 py-3 border rounded-md max-md:px-5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onNext}
                className="self-stretch bg-black gap-2 text-white px-6 py-3 border rounded-md max-md:px-5 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};