/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MapPin, School, Building2, Award } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import SuccessAnimation from "./success-animation";
import ChipSelection from "./chip-selection";
import { accreditationOptions, amenitiesOptions } from "@/utils/constants";
import { schoolMethods } from "@/lib/api-methods";

interface FormData {
  name: string;
  address: string;
  email: string;
  contactNumber: string;
  schoolCode: string;
  geoLocation: {
    latitude: number;
    longitude: number;
  };
  timing: {
    start: string;
    end: string;
  };
  amenities: string[];
  description: string;
  foundedIn: number;
  board: string;
  attributes: {
    studentCapacity: number;
    teachersCount: number;
    campusSize: string;
    studentTeacherRatio?: number;
  };
  accreditations: string[];
  photo?: File;
}

const steps = [
  "Basic Information",
  "Location & Timing",
  "School Details",
  "Facilities & Amenities",
];

const commonInputClasses =
  "mt-1 block w-full rounded-md border-gray-300 px-3 py-2 bg-white shadow-sm transition duration-150 ease-in-out focus:outline-none hover:border-emerald-400";

const PartnerRegistration = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "",
    email: "",
    contactNumber: "",
    schoolCode: "",
    geoLocation: { latitude: 0, longitude: 0 },
    timing: { start: "", end: "" },
    amenities: [],
    description: "",
    foundedIn: new Date().getFullYear(),
    board: "",
    attributes: {
      studentCapacity: 0,
      teachersCount: 0,
      campusSize: "",
    },
    accreditations: [],
    photo: undefined,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState(true);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      setLocationPermission(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          geoLocation: { latitude, longitude },
        }));
      },
      () => {
        toast.error("Location permission denied. Please allow access.");
        setLocationPermission(false);
      }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const updateForm = (update: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...update }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateForm({ photo: e.target.files[0] });
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+?[\d\s-]{10,}$/.test(phone);
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (
          !formData.name ||
          !formData.email ||
          !formData.contactNumber ||
          !formData.schoolCode
        ) {
          toast.error("Please fill all required fields");
          return false;
        }
        if (!validateEmail(formData.email)) {
          toast.error("Please enter a valid email address");
          return false;
        }
        if (!validatePhone(formData.contactNumber)) {
          toast.error("Please enter a valid contact number");
          return false;
        }
        return true;
      case 2:
        if (
          !formData.address ||
          !formData.timing.start ||
          !formData.timing.end
        ) {
          toast.error("Please fill all required fields");
          return false;
        }
        return true;
      case 3:
        if (!formData.description || !formData.board || !formData.foundedIn) {
          toast.error("Please fill all required fields");
          return false;
        }
        return true;
      case 4:
        if (
          !formData.attributes.studentCapacity ||
          !formData.attributes.teachersCount ||
          !formData.attributes.campusSize
        ) {
          toast.error("Please fill all required fields");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((current) => current + 1);
    }
  };

  const handlePrevious = () => setCurrentStep((current) => current - 1);

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "photo" && value) {
          formDataToSend.append(key, value as File);
        } else {
          formDataToSend.append(key, JSON.stringify(value));
        }
      });

      const response = await schoolMethods.create(formDataToSend);
      if (!response.success)
        toast.error("Registration failed. Please try again.");
      setShowSuccess(true);
      // toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/");
      }, 5000);
    }
  }, [showSuccess, router]);

  if (!locationPermission) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-white shadow-lg rounded-lg p-8'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>
            Location Permission Required
          </h2>
          <p className='text-gray-600 mb-6'>
            Please allow location access to proceed with the registration.
          </p>
          <button
            onClick={requestLocation}
            className='px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors'>
            Grant Permission
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-emerald-50'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold text-emerald-800 text-center mb-8'>
          Partner With Us
        </h1>

        <div className='mb-8'>
          <div className='flex justify-between items-center'>
            {steps.map((step, index) => (
              <div key={step} className='flex flex-col items-center w-1/4'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > index + 1
                      ? "bg-emerald-500 text-white"
                      : currentStep === index + 1
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-200"
                  }`}>
                  {currentStep > index + 1 ? <Check size={16} /> : index + 1}
                </div>
                <p className='text-sm mt-2 text-center'>{step}</p>
              </div>
            ))}
          </div>
          <div className='relative mt-2'>
            <div className='absolute top-0 h-1 bg-gray-200 w-full'></div>
            <div
              className='absolute top-0 h-1 bg-emerald-500 transition-all duration-500'
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}></div>
          </div>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className='bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto'>
            {currentStep === 1 && (
              <div className='space-y-4'>
                <div className='flex items-center space-x-2 mb-6'>
                  <School className='text-emerald-600' />
                  <h2 className='text-2xl font-semibold text-emerald-800'>
                    Basic Information
                  </h2>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Upload Photo*
                  </label>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='mt-1 block w-full'
                  />
                  {formData.photo && (
                    <div className='mt-4'>
                      <p className='text-sm text-gray-600'>Preview:</p>
                      <img
                        src={URL.createObjectURL(formData.photo)}
                        alt='Uploaded'
                        className='w-32 h-32 object-cover rounded-md border'
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    School Name*
                  </label>
                  <input
                    type='text'
                    value={formData.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                    className={commonInputClasses}
                    placeholder='Enter school name'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    School Code*
                  </label>
                  <input
                    type='text'
                    value={formData.schoolCode}
                    onChange={(e) => updateForm({ schoolCode: e.target.value })}
                    className={commonInputClasses}
                    placeholder='Enter official school registration number or code'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Official Email*
                  </label>
                  <input
                    type='email'
                    value={formData.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                    className={commonInputClasses}
                    placeholder='Enter official school email'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Contact Number*
                  </label>
                  <input
                    type='tel'
                    value={formData.contactNumber}
                    onChange={(e) =>
                      updateForm({ contactNumber: e.target.value })
                    }
                    className={commonInputClasses}
                    placeholder='Enter official contact number'
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className='space-y-4'>
                <div className='flex items-center space-x-2 mb-6'>
                  <MapPin className='text-emerald-600' />
                  <h2 className='text-2xl font-semibold text-emerald-800'>
                    Location & Timing
                  </h2>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Address*
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => updateForm({ address: e.target.value })}
                    className={commonInputClasses}
                    rows={3}
                    placeholder='Enter school address'
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Start Time*
                    </label>
                    <input
                      type='time'
                      value={formData.timing.start}
                      onChange={(e) =>
                        updateForm({
                          timing: { ...formData.timing, start: e.target.value },
                        })
                      }
                      className={commonInputClasses}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      End Time*
                    </label>
                    <input
                      type='time'
                      value={formData.timing.end}
                      onChange={(e) =>
                        updateForm({
                          timing: { ...formData.timing, end: e.target.value },
                        })
                      }
                      className={commonInputClasses}
                    />
                  </div>
                </div>

                {/* <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Latitude
                    </label>
                    <input
                      type='number'
                      value={formData.geoLocation.latitude}
                      onChange={(e) =>
                        updateForm({
                          geoLocation: {
                            ...formData.geoLocation,
                            latitude: parseFloat(e.target.value),
                          },
                        })
                      }
                      className={commonInputClasses}
                      placeholder='Auto-detected'
                      disabled
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Longitude
                    </label>
                    <input
                      type='number'
                      value={formData.geoLocation.longitude}
                      onChange={(e) =>
                        updateForm({
                          geoLocation: {
                            ...formData.geoLocation,
                            longitude: parseFloat(e.target.value),
                          },
                        })
                      }
                      className={commonInputClasses}
                      placeholder='Auto-detected'
                      disabled
                    />
                  </div>
                </div> */}
              </div>
            )}

            {currentStep === 3 && (
              <div className='space-y-4'>
                <div className='flex items-center space-x-2 mb-6'>
                  <Building2 className='text-emerald-600' />
                  <h2 className='text-2xl font-semibold text-emerald-800'>
                    School Details
                  </h2>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Description*
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      updateForm({ description: e.target.value })
                    }
                    className={commonInputClasses}
                    rows={4}
                    placeholder='Enter school description'
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Founded In*
                    </label>
                    <input
                      type='number'
                      value={formData.foundedIn}
                      onChange={(e) =>
                        updateForm({ foundedIn: parseInt(e.target.value) })
                      }
                      className={commonInputClasses}
                      placeholder='Enter founding year'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Board*
                    </label>
                    <select
                      value={formData.board}
                      onChange={(e) => updateForm({ board: e.target.value })}
                      className={commonInputClasses}>
                      <option value=''>Select Board</option>
                      <option value='CBSE'>CBSE</option>
                      <option value='ICSE'>ICSE</option>
                      <option value='IB'>IB</option>
                      <option value='State Board'>State Board</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className='space-y-4'>
                <div className='flex items-center space-x-2 mb-6'>
                  <Award className='text-emerald-600' />
                  <h2 className='text-2xl font-semibold text-emerald-800'>
                    Facilities & Amenities
                  </h2>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Campus Size*
                  </label>
                  <input
                    type='text'
                    value={formData.attributes.campusSize}
                    onChange={(e) =>
                      updateForm({
                        attributes: {
                          ...formData.attributes,
                          campusSize: e.target.value,
                        },
                      })
                    }
                    className={commonInputClasses}
                    placeholder='e.g., 5 acres'
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Student Capacity*
                    </label>
                    <input
                      type='number'
                      value={formData.attributes.studentCapacity}
                      onChange={(e) =>
                        updateForm({
                          attributes: {
                            ...formData.attributes,
                            studentCapacity: parseInt(e.target.value),
                          },
                        })
                      }
                      className={commonInputClasses}
                      placeholder='Enter total student capacity'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Teachers Count*
                    </label>
                    <input
                      type='number'
                      value={formData.attributes.teachersCount}
                      onChange={(e) =>
                        updateForm({
                          attributes: {
                            ...formData.attributes,
                            teachersCount: parseInt(e.target.value),
                          },
                        })
                      }
                      className={commonInputClasses}
                      placeholder='Enter total number of teachers'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Student-Teacher Ratio
                  </label>
                  <input
                    type='number'
                    value={formData.attributes.studentTeacherRatio || ""}
                    onChange={(e) =>
                      updateForm({
                        attributes: {
                          ...formData.attributes,
                          studentTeacherRatio: parseInt(e.target.value),
                        },
                      })
                    }
                    className={commonInputClasses}
                    placeholder='e.g., 20'
                  />
                </div>

                <ChipSelection
                  options={amenitiesOptions}
                  selected={formData.amenities}
                  onChange={(values) => updateForm({ amenities: values })}
                  label='Amenities'
                />

                <ChipSelection
                  options={accreditationOptions}
                  selected={formData.accreditations}
                  onChange={(values) => updateForm({ accreditations: values })}
                  label='Accreditations'
                />
              </div>
            )}

            <div className='mt-8 flex flex-col md:flex-row gap-4 justify-between'>
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className='px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors'>
                  Previous
                </button>
              )}

              {currentStep < steps.length ? (
                <button
                  onClick={handleNext}
                  className='px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors'>
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className='px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
                  {isLoading ? "Submitting..." : "Submit Registration"}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showSuccess && (
          <SuccessAnimation
            onClick={() => {
              router.push("/");
            }}
          />
        )}
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
};

export default PartnerRegistration;
