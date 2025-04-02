"use client";

import NoteEditModal from "@/app/components/noteEditModal";
import NoteComponent from "../../components/note";
import NoteInterface from "../../interfaces/note";
import Link from "next/link";
import api from "../../utils/axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SpaceShipPage() {
  const { username } = useParams();
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false); // Creating note if true

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const response = await api.get("/api/notes/get", {
        withCredentials: true,
      });
      setNotes(response.data.notes);
      console.log(response.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const createNote = async (title: string, content: string) => {
    try {
      const response = await api.post(
        "/api/notes/create",
        { title: title, content: content },
        { withCredentials: true }
      );
      setNotes([...notes, response.data.newNote]);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      console.log(id);
      await api.delete(`/api/notes/delete/${id}`, { withCredentials: true });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Functions that are passed to the modal
  const saveNoteData = (title: string, content: string) => {
    createNote(title, content);
    setShowModal(false);
  };

  const handleDeleteNote = (id: string) => {
    notes.filter((note) => note._id !== id);
    deleteNote(id);
    setShowModal(false);
    handleModalClose();
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="h-full bg-gray-800">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl text-white text-center p-4 w-full">
            Welcome to your spaceship,{" "}
            {username
              ? username[0].toUpperCase() + username.slice(1)
              : username}
            !
          </h1>
          <div className="flex justify-end me-6">
            <Link href="/">
              <button className="bg-red-600 p-3 rounded-md">
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
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
        <div className="flex justify-center bg-gray-800">
          <div className="flex justify-end items-center bg-gray-700 rounded-lg h-16 ms-4 me-4 p-4 w-6xl">
            <button
              onClick={() => setShowModal(true)}
              className="flex bg-blue-500 text-white p-2 rounded-md m-4 hover:bg-blue-600"
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="bg-gray-800 p-4 ps-10 pe-10">
          {notes.length > 0 ? (
            // Grouping the notes in groups of 4
            notes
              .reduce((acc: NoteInterface[][], note, i) => {
                // If the index is divisible by 4, create a new group (subarray)
                // Acc is an array of subarrays of 4 or less notes
                if (i % 4 === 0) acc.push([]); // Create a new group if needed
                acc[acc.length - 1].push(note); // Push the note to the last group
                return acc;
              }, [] as NoteInterface[][])
              .map((group, idx) => (
                // Map over the groups and render them
                <div key={idx} className="flex justify-center space-x-6 mb-4">
                  {group.map((note) => (
                    <NoteComponent
                      key={note._id}
                      _id={note._id}
                      title={note.title}
                      content={note.content}
                      handleDeleteNote={handleDeleteNote}
                    />
                  ))}
                </div>
              ))
          ) : (
            <p className="text-center text-white">No hay notas aún</p>
          )}
        </div>
      </div>
      {showModal && (
        <NoteEditModal
          handleModalClose={handleModalClose}
          saveNoteData={saveNoteData}
        />
      )}
    </>
  );
}
