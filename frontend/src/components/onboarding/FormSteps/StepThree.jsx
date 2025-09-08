import React, { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import { ProgressIndicator } from "../ProgressIndicator";
import { UploadIcon } from "lucide-react";
import colleges from "../../../assets/colleges.json";

const degreeOptions = [
  { value: "bachelors", label: "Bachelor's" },
  { value: "masters", label: "Master's" },
  { value: "phd", label: "PhD" }
];

// Normalize strings for matching
const normalizeString = (str) =>
  str.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();

// Fuzzy match for degree
const findBestDegreeMatch = (searchTerm, degrees) => {
  if (!searchTerm) return "";

  const searchNormalized = normalizeString(searchTerm);

  // Exact or contains match
  const exactMatch = degrees?.find(
    (degree) =>
      normalizeString(degree.value) === searchNormalized ||
      normalizeString(degree.label) === searchNormalized
  );
  if (exactMatch) return exactMatch.value;

  const containsMatch = degrees?.find(
    (degree) =>
      normalizeString(degree.label).includes(searchNormalized) ||
      normalizeString(degree.value).includes(searchNormalized)
  );
  if (containsMatch) return containsMatch.value;

  // Handle abbreviations
  const degreeVariations = {
    bachelors: ["bachelor", "btech", "be", "bsc", "ba", "bcom", "bba"],
    masters: ["master", "mtech", "me", "msc", "ma", "mcom", "mba"],
    phd: ["doctorate", "phd", "ph.d", "doctoral"]
  };

  for (const [degreeValue, variations] of Object.entries(degreeVariations)) {
    if (variations.some((v) => searchNormalized.includes(v))) {
      return degreeValue;
    }
  }

  return "";
};

// Async loader for college dropdown
const loadCollegeOptions = (inputValue, callback) => {
  if (!inputValue || inputValue.trim() === "") {
    callback([]);
    return;
  }

  const normalizedInput = normalizeString(inputValue);
  const filtered = colleges
    .map((c) => (typeof c === "string" ? c : c.college || ""))
    .filter((name) => normalizeString(name).includes(normalizedInput))
    .slice(0, 30)
    .map((name) => ({ value: name, label: name }));

  callback(filtered);
};

export const StepThree = ({ onNext, onCancel, onBack = onCancel, formData, onChange }) => {
  const [localFormData, setLocalFormData] = useState({
    college: "",
    degree: formData.education[0]?.degree || "",
    semester: formData.education[0]?.semester || "",
    specialization: formData.education[0]?.specialization || "",
    cgpa: formData.education[0]?.cgpa || "",
    degreeCertificate: formData.education[0]?.degreeCertificate || null
  });

  const [selectedCollege, setSelectedCollege] = useState(null);
  const [collegeSuggestions, setCollegeSuggestions] = useState([]);

  // On mount, auto-suggest parsed college and degree
  useEffect(() => {
    const parsedCollege = formData.education[0]?.college;
    const parsedDegree = formData.education[0]?.degree;

    let updates = {};

    if (parsedCollege) {
      const normalizedParsed = normalizeString(parsedCollege);

      const suggestions = colleges
        .map((c) => (typeof c === "string" ? c : c.college || ""))
        .filter((name) => normalizeString(name).includes(normalizedParsed))
        .slice(0, 5);

      setCollegeSuggestions(suggestions);

      if (suggestions.length > 0) {
        updates.college = suggestions[0];
        setSelectedCollege({ value: suggestions[0], label: suggestions[0] });
      }
    }

    if (parsedDegree) {
      const bestDegreeMatch = findBestDegreeMatch(parsedDegree, degreeOptions);
      updates.degree = bestDegreeMatch || parsedDegree;
    }

    if (Object.keys(updates).length > 0) {
      setLocalFormData((prev) => ({ ...prev, ...updates }));
    }
  }, [formData.education]);

  const handleCollegeSelect = (selected) => {
    setSelectedCollege(selected);
    setLocalFormData((prev) => ({ ...prev, college: selected ? selected.value : "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLocalFormData((prev) => ({
        ...prev,
        degreeCertificate: e.target.files[0]
      }));
    }
  };

  const handleNextClick = () => {
    const updatedFormData = {
      ...formData,
      education: [
        {
          college: localFormData.college,
          degree: localFormData.degree,
          semester: localFormData.semester,
          specialization: localFormData.specialization,
          cgpa: localFormData.cgpa,
          degreeCertificate: localFormData.degreeCertificate
        }
      ]
    };
    onChange(updatedFormData);
    onNext();
  };

  return (
    <div className="justify-center items-stretch bg-white z-0 flex min-w-60 flex-col w-[560px] my-auto p-12 max-md:max-w-full max-md:px-5">
      <ProgressIndicator currentStep={3} totalSteps={5} />
      <div className="flex w-full flex-col items-stretch justify-center mt-8 max-md:max-w-full">
        <div className="w-full text-black max-md:max-w-full">
          <h2 className="text-[32px] font-bold leading-[42px] max-md:max-w-full">
            Let's add your educational background!
          </h2>
          <p className="text-base font-normal leading-6 mt-2 max-md:max-w-full">
            Provide your academic background to match with relevant job and internship opportunities.
          </p>
        </div>

        <form className="w-full text-base font-normal mt-8 max-md:max-w-full">
          {/* College */}
          <div className="w-full">
            <label htmlFor="college" className="block text-black">
              College/University
            </label>
            <AsyncSelect
              cacheOptions
              defaultOptions={
                collegeSuggestions.length
                  ? collegeSuggestions.map((name) => ({ value: name, label: name }))
                  : []
              }
              loadOptions={loadCollegeOptions}
              value={selectedCollege}
              onChange={handleCollegeSelect}
              placeholder="Search and select your college/university"
              isClearable
              className="mt-2"
            />
            {/* {formData.education[0]?.college && (
              <p className="text-sm text-gray-600 mt-1">
                Parsed from resume: "{formData.education[0]?.college}"
              </p>
            )} */}
          </div>

          <div className="flex w-full gap-6 mt-6">
            {/* Degree */}
            <div className="flex-1">
              <label htmlFor="degree" className="block text-black">
                Degree
              </label>
              <select
                id="degree"
                name="degree"
                value={localFormData.degree}
                onChange={handleChange}
                className="appearance-none bg-white flex min-h-12 w-full mt-2 p-3 border border-gray-300 rounded"
              >
                <option value="" disabled>
                  Select degree
                </option>
                {degreeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div className="flex-1">
              <label htmlFor="semester" className="block text-black">
                Current Semester
              </label>
              <select
                id="semester"
                name="semester"
                value={localFormData.semester}
                onChange={handleChange}
                className="appearance-none bg-white flex min-h-12 w-full mt-2 p-3 border border-gray-300 rounded"
              >
                <option value="" disabled>
                  Select semester
                </option>
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Semester {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Specialization */}
          <div className="w-full mt-6">
            <label htmlFor="specialization" className="block text-black">
              Field of Study / Specialization
            </label>
            <input
              id="specialization"
              name="specialization"
              value={localFormData.specialization}
              onChange={handleChange}
              className="min-h-12 w-full mt-2 p-3 border border-gray-300 rounded"
              placeholder="Enter your specialization"
            />
          </div>

          {/* CGPA */}
          <div className="w-full mt-6">
            <label htmlFor="cgpa" className="block text-black">
              Current CGPA/Percentage
            </label>
            <input
              id="cgpa"
              name="cgpa"
              type="text"
              value={localFormData.cgpa}
              onChange={handleChange}
              className="min-h-12 w-full mt-2 p-3 border border-gray-300 rounded"
              placeholder="Enter your CGPA or percentage"
            />
          </div>

          {/* Degree Certificate */}
          <div className="w-full mt-6">
            <label htmlFor="degreeCertificate" className="block text-black">
              Degree Certificate (Optional)
            </label>
            <label className="flex min-h-12 w-full gap-2 text-[#666] mt-2 p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
              <span>
                {localFormData.degreeCertificate
                  ? localFormData.degreeCertificate.name
                  : "Upload Degree Certificate"}
              </span>
              <UploadIcon className="w-6 h-6 ml-auto" />
              <input
                id="degreeCertificate"
                name="degreeCertificate"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border rounded-md hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNextClick}
              className="bg-black text-white px-6 py-3 border rounded-md hover:bg-gray-800"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
