import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(false);
  const [appNotifications, setAppNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState("friends");
  const [dataPreferences, setDataPreferences] = useState({
    shareLocation: true,
    shareRelationship: false,
  });
  const [changesSaved, setChangesSaved] = useState(false);

  const handleSaveChanges = () => {
    setChangesSaved(true);
    setTimeout(() => setChangesSaved(false), 3000);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 md:min-h-screen">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Settings</h1>
        </div>
        <nav className="p-2">
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "account"
                    ? "bg-red-50 text-red-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Account Details
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "security"
                    ? "bg-red-50 text-red-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Security
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "notifications"
                    ? "bg-red-50 text-red-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                Notifications
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("privacy")}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "privacy"
                    ? "bg-red-50 text-red-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Privacy
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("billing")}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "billing"
                    ? "bg-red-50 text-red-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                Billing
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("linked")}
                className={`w-full flex items-center px-4 py-2 rounded-md ${
                  activeTab === "linked"
                    ? "bg-red-50 text-red-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                Linked Accounts
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8">
        {/* Account Details */}
        {activeTab === "account" && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Account Details
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-3">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-ob7miW3mUreePYfXdVwkpFWHthzoR5.svg?height=100&width=100"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="text-sm px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-50">
                    Update Photo
                  </button>
                </div>

                <div className="flex-1 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        defaultValue="John"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        defaultValue="Doe"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      defaultValue="john.doe@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-between">
                    {changesSaved && (
                      <div className="flex items-center text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm">Changes saved</span>
                      </div>
                    )}
                    <button
                      onClick={handleSaveChanges}
                      className="ml-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Security
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Password
                    </h3>
                    <p className="text-sm text-gray-500">
                      Last changed 2 weeks ago
                    </p>
                  </div>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Change Password
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={twoFactorEnabled}
                      onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Notifications
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Email Notifications
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700">
                      Get notified about new features
                    </p>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailUpdates}
                        onChange={() => setEmailUpdates(!emailUpdates)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-700">Desktop Notifications</p>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={desktopNotifications}
                        onChange={() =>
                          setDesktopNotifications(!desktopNotifications)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  App Notifications
                </h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-700">Push notifications</p>
                    <p className="text-sm text-gray-500">
                      Receive push notifications when important events happen
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appNotifications}
                      onChange={() => setAppNotifications(!appNotifications)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Privacy Section */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Privacy
            </h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Profile Visibility
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="visibility-public"
                      name="visibility"
                      type="radio"
                      checked={profileVisibility === "public"}
                      onChange={() => setProfileVisibility("public")}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <label
                      htmlFor="visibility-public"
                      className="ml-3 block text-gray-700"
                    >
                      Public
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="visibility-friends"
                      name="visibility"
                      type="radio"
                      checked={profileVisibility === "friends"}
                      onChange={() => setProfileVisibility("friends")}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <label
                      htmlFor="visibility-friends"
                      className="ml-3 block text-gray-700"
                    >
                      Friends Only
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="visibility-private"
                      name="visibility"
                      type="radio"
                      checked={profileVisibility === "private"}
                      onChange={() => setProfileVisibility("private")}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                    />
                    <label
                      htmlFor="visibility-private"
                      className="ml-3 block text-gray-700"
                    >
                      Private
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Data Preferences
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="share-location"
                        name="share-location"
                        type="checkbox"
                        checked={dataPreferences.shareLocation}
                        onChange={() =>
                          setDataPreferences({
                            ...dataPreferences,
                            shareLocation: !dataPreferences.shareLocation,
                          })
                        }
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="share-location"
                        className="font-medium text-gray-700"
                      >
                        Share location for better services
                      </label>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="share-relationship"
                        name="share-relationship"
                        type="checkbox"
                        checked={dataPreferences.shareRelationship}
                        onChange={() =>
                          setDataPreferences({
                            ...dataPreferences,
                            shareRelationship:
                              !dataPreferences.shareRelationship,
                          })
                        }
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="share-relationship"
                        className="font-medium text-gray-700"
                      >
                        Show relationship updates
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button className="flex items-center text-red-600 font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Restrict Data Access
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would go here */}
        {activeTab === "security" && (
          <div className="text-center py-12">Security settings content</div>
        )}
        {activeTab === "notifications" && (
          <div className="text-center py-12">
            Notifications settings content
          </div>
        )}
        {activeTab === "privacy" && (
          <div className="text-center py-12">Privacy settings content</div>
        )}
        {activeTab === "billing" && (
          <div className="text-center py-12">Billing settings content</div>
        )}
        {activeTab === "linked" && (
          <div className="text-center py-12">
            Linked Accounts settings content
          </div>
        )}
      </div>
    </div>
  );
}
