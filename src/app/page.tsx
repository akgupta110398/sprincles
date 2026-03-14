 "use client";

import { useEffect, useState } from "react";
import SwipeDeck from "../components/SwipeDeck";
import Matches from "../components/Matches";

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  image: string;
}

const MOCK_PROFILES: Profile[] = [
  {
    id: 1,
    name: "Emily",
    age: 23,
    bio: "Fitness lover 💪",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    id: 2,
    name: "Sophia",
    age: 25,
    bio: "Coffee addict ☕",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    id: 3,
    name: "Olivia",
    age: 22,
    bio: "Travel enthusiast ✈️",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"swipe" | "matches">("swipe");
  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const storedLikes = localStorage.getItem("sprincles-liked-profiles");
    if (storedLikes) {
      try {
        const parsedLikes = JSON.parse(storedLikes) as Profile[];
        setLikedProfiles(parsedLikes);
      } catch {
        // ignore malformed JSON
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sprincles-liked-profiles", JSON.stringify(likedProfiles));
  }, [likedProfiles]);

  const handleLikeProfile = (profile: Profile) => {
    setLikedProfiles((prev) =>
      prev.some((p) => p.id === profile.id) ? prev : [...prev, profile],
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-4 py-8">
      <div className="mb-6 flex gap-2 rounded-full bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveTab("swipe")}
          className={`px-4 py-2 text-sm font-medium rounded-full transition ${
            activeTab === "swipe"
              ? "bg-pink-500 text-white shadow"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Swipe
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("matches")}
          className={`px-4 py-2 text-sm font-medium rounded-full transition ${
            activeTab === "matches"
              ? "bg-pink-500 text-white shadow"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Matches
        </button>
      </div>

      {activeTab === "swipe" ? (
        <SwipeDeck profiles={MOCK_PROFILES} onLikeProfile={handleLikeProfile} />
      ) : (
        <Matches matches={likedProfiles} />
      )}
    </div>
  );
}