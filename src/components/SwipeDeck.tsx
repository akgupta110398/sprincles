"use client";

import { motion, type PanInfo } from "framer-motion";

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  image: string;
}

export default function SwipeDeck({ profiles }: { profiles: Profile[] }) {
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 50) {
      console.log("Liked ❤️");
    } else if (info.offset.x < -50) {
      console.log("Passed ❌");
    }
  };

  return (
    <div className="relative w-[300px] h-[450px]">
      {profiles.map((profile) => (
        <motion.div
          key={profile.id}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="absolute w-full h-full bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-[70%] object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold">
              {profile.name}, {profile.age}
            </h2>
            <p className="text-gray-600">{profile.bio}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
