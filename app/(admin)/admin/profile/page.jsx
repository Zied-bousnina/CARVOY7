"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import Card from "@/components/ui/Card";
import BasicArea from "@/components/partials/chart/appex-chart/BasicArea"; // Ensure this path is correct
import { ProfileService } from "@/_services/profile.service";

const Profile = () => {
  const [UserProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch profile data
  const fetchProfile = () => {
    ProfileService.GetProfile()
      .then((res) => {
        setUserProfile(res);
        setUpdatedProfile(res); // Pre-fill form with existing data
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Preview image
      setUpdatedProfile({ ...updatedProfile, avatar: file });
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  // Save updated profile
  const handleSave = () => {
    setIsLoading(true);

    // Create form data for uploading image
    const formData = new FormData();
    // Object.keys(updatedProfile).forEach((key) => {
    //   formData.append(key, updatedProfile[key]);
    // });
    // const formData = new FormData();
    Object.keys(updatedProfile).forEach((key) => {
      if (Array.isArray(updatedProfile[key])) {
        updatedProfile[key].forEach((value) => {
          formData.append(key, value);
        });
      } else {
        formData.append(key, updatedProfile[key]);
      }
    });
  console.log("FormData Sent:", Object.fromEntries(formData.entries())); // Debugging

console.log(updatedProfile)
    ProfileService.EditProfile_Web(formData)
      .then(() => {
        fetchProfile(); // Refresh profile
        setEditMode(false);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <div className="profile-page space-y-5">
        <div className="profiel-wrap bg-white dark:bg-slate-800 px-[35px] pb-10 pt-10 rounded-lg relative">
          <div className="bg-slate-900 absolute top-0 left-0 h-[150px] w-full rounded-t-lg"></div>

          <div className="profile-box text-center">
            <div className="relative w-[140px] h-[140px] mx-auto mb-4 rounded-full ring-4 ring-slate-100">
              <Image
                src={selectedImage || UserProfile?.avatar || "/assets/images/users/user-1.jpg"}
                alt="Profile"
                width={140}
                height={140}
                className="w-full h-full object-cover rounded-full"
                unoptimized
              />
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              )}
            </div>

            <div className="text-2xl font-medium text-slate-900 dark:text-slate-200">

               { UserProfile?.user?.name}

            </div>

            <div className="text-sm text-slate-600 dark:text-slate-400">

               { UserProfile?.user?.role}

            </div>
          </div>

          <div className="text-center mt-4">
            {editMode ? (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-4 col-span-12">
            <Card title="Info">
              <ul className="list space-y-8">
                <li className="flex space-x-3">
                  <Icon icon="heroicons:envelope" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 uppercase mb-1">EMAIL</div>

                      <a href={`mailto:${UserProfile?.user?.email}`} className="text-base text-slate-600">
                        {UserProfile?.user?.email}
                      </a>

                  </div>
                </li>

                <li className="flex space-x-3">
                  <Icon icon="heroicons:phone-arrow-up-right" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 uppercase mb-1">PHONE</div>
                    {editMode ? (
                      <input
                        type="text"
                        name="tel"
                        value={updatedProfile?.tel || ""}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      <a href={`tel:${UserProfile?.tel}`} className="text-base text-slate-600">
                        {UserProfile?.tel}
                      </a>
                    )}
                  </div>
                </li>

                <li className="flex space-x-3">
                  <Icon icon="heroicons:map" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 uppercase mb-1">VILLE</div>
                    {editMode ? (
                      <input
                        type="text"
                        name="city"
                        value={updatedProfile?.city || ""}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      <div className="text-base text-slate-600">{UserProfile?.city}</div>
                    )}
                  </div>
                </li>

                <li className="flex space-x-3">
                  <Icon icon="heroicons:globe-alt" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 uppercase mb-1">PAYS</div>
                    {editMode ? (
                      <input
                        type="text"
                        name="country"
                        value={updatedProfile?.country || ""}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      <div className="text-base text-slate-600">{UserProfile?.country}</div>
                    )}
                  </div>
                </li>

                <li className="flex space-x-3">
                  <Icon icon="heroicons:map-pin" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-500 uppercase mb-1">CODE POSTAL</div>
                    {editMode ? (
                      <input
                        type="text"
                        name="postalCode"
                        value={updatedProfile?.postalCode || ""}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full"
                      />
                    ) : (
                      <div className="text-base text-slate-600">{UserProfile?.postalCode}</div>
                    )}
                  </div>
                </li>
              </ul>
            </Card>
          </div>

          <div className="lg:col-span-8 col-span-12">
            <Card title="User Overview">
              <BasicArea height={190} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
