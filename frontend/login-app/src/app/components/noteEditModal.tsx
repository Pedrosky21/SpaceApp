import { useState } from "react";

export default function NoteEditModal({
  saveNoteData,
  handleModalClose,
}: {
  saveNoteData: (title: string, content: string) => void;
  handleModalClose: () => void;
}) {
  const [title, setTitle] = useState<string>("Title");
  const [content, setContent] = useState<string>("Content");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await saveNoteData(title, content);
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm">
        <div className="bg-gray-900 rounded-lg w-sm h-lg p-4 outline outline-1 outline-black shadow-xl">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              className="text-4xl w-full outline-0"
            />
            <hr className="my-2 border-t-2 border-gray-700" />
            <textarea
              name="content"
              placeholder="Content"
              onChange={(e) => setContent(e.target.value)}
              rows={9}
              className="text-2xl w-full outline-0 resize-none"
            />
            <hr className="my-2 border-t-2 border-gray-700" />
            <div className="flex justify-between items-center">
              <button
                onClick={handleModalClose}
                className="bg-red-500 text-white p-2 rounded-xl m-4 hover:bg-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-xl m-4 hover:bg-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
