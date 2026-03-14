"use client";

import SwipeDeck from "../components/SwipeDeck";

const MOCK_PROFILES = [
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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SwipeDeck profiles={MOCK_PROFILES} />
    </div>
  );
}