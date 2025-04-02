export default function ErrorModal({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  const errorMessage = message || "An error occurred. Please try again later.";
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm">
        <div className="flex justify-between bg-gray-600 rounded-lg p-4 w-sm h-sm outline outline-1">
          <div className="flex">
            <div className="warning-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-white ms-2">Error</h2>
              <p className="text-white ms-2">{errorMessage}</p>
            </div>
          </div>
          <div>
              <button
                onClick={onClose}
                className="ms-5 px-1 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
          </div>
        </div>
      </div>
    </>
  );
}
