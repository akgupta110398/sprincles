"use client";

import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  image: string;
}

interface Props {
  profiles: Profile[];
}

const SWIPE_THRESHOLD = 100;

export default function SwipeDeck({ profiles }: Props) {
  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);

  const x = useMotionValue(0);
  const likeOpacity = useTransform(x, [0, 80], [0, 1]);
  const passOpacity = useTransform(x, [-80, 0], [1, 0]);
  const rotate = useTransform(x, [-200, 200], [12, -12]);

  const handleDrag = (_: unknown, info: PanInfo) => {
    x.set(info.offset.x);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      console.log("Liked ❤️");
      setCurrentIndex((prev) => prev - 1);
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      console.log("Passed ❌");
      setCurrentIndex((prev) => prev - 1);
    }
    x.set(0);
  };

  return (
    <div className="relative w-[320px] h-[500px]">
      {profiles.slice(0, currentIndex + 1).map((profile, index) => {
        const isTop = index === currentIndex;

        return (
          <motion.div
            key={profile.id}
            className="absolute w-full h-full bg-white rounded-xl shadow-lg overflow-hidden"
            style={{
              zIndex: index,
              rotate: isTop ? rotate : undefined,
            }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={isTop ? handleDrag : undefined}
            onDragEnd={isTop ? handleDragEnd : undefined}
            whileTap={isTop ? { scale: 1.02 } : undefined}
          >
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full h-[70%] object-cover"
            />

            {isTop && (
              <>
                <motion.div
                  className="absolute left-4 top-6 rounded-lg border-2 border-green-500 bg-green-500/20 px-4 py-2 text-xl font-bold uppercase tracking-wider text-green-600"
                  style={{ opacity: likeOpacity }}
                >
                  LIKE
                </motion.div>
                <motion.div
                  className="absolute right-4 top-6 rounded-lg border-2 border-red-500 bg-red-500/20 px-4 py-2 text-xl font-bold uppercase tracking-wider text-red-600"
                  style={{ opacity: passOpacity }}
                >
                  PASS
                </motion.div>
              </>
            )}

            <div className="p-4">
              <h2 className="text-xl font-bold">
                {profile.name}, {profile.age}
              </h2>
              <p className="text-gray-600">{profile.bio}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}