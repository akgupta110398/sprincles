 "use client";

import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  image: string;
}

interface Props {
  profiles: Profile[];
  onLikeProfile?: (profile: Profile) => void;
}

const SWIPE_THRESHOLD = 100;

export default function SwipeDeck({ profiles, onLikeProfile }: Props) {
  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);
  const [likedProfiles, setLikedProfiles] = useState<Profile[]>([]);
  const [passedProfiles, setPassedProfiles] = useState<Profile[]>([]);

  const x = useMotionValue(0);
  const likeOpacity = useTransform(x, [0, 80], [0, 1]);
  const passOpacity = useTransform(x, [-80, 0], [1, 0]);
  const rotate = useTransform(x, [-200, 200], [12, -12]);

  const swipe = (direction: "left" | "right" | "super") => {
    if (currentIndex < 0) return;

    const currentProfile = profiles[currentIndex];
    if (!currentProfile) return;

    if (direction === "right") {
      // eslint-disable-next-line no-console
      console.log("Liked ❤️");
      setLikedProfiles((prev) => [...prev, currentProfile]);
      onLikeProfile?.(currentProfile);
    } else if (direction === "left") {
      // eslint-disable-next-line no-console
      console.log("Passed ❌");
      setPassedProfiles((prev) => [...prev, currentProfile]);
    } else {
      // eslint-disable-next-line no-console
      console.log("Super Like ⭐");
    }

    setCurrentIndex((prev) => prev - 1);
    x.set(0);
  };

  useEffect(() => {
    if (likedProfiles.length === 0) return;
    // eslint-disable-next-line no-console
    console.log("likedProfiles", likedProfiles);
  }, [likedProfiles]);

  useEffect(() => {
    if (passedProfiles.length === 0) return;
    // eslint-disable-next-line no-console
    console.log("passedProfiles", passedProfiles);
  }, [passedProfiles]);

  const handleDrag = (_: unknown, info: PanInfo) => {
    x.set(info.offset.x);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      swipe("right");
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      swipe("left");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[320px] h-[500px]">
        {profiles
          .slice(Math.max(0, currentIndex - 2), currentIndex + 1)
          .map((profile, index) => {
            const profileIndex = Math.max(0, currentIndex - 2) + index;
            const isTop = profileIndex === currentIndex;
            const depth = currentIndex - profileIndex; // 0 = top, 1 = next, 2 = third

            const scale = 1 - depth * 0.05;
            const translateY = depth * 14;
            const zIndex = 10 - depth;

            return (
              <motion.div
                key={profile.id}
                className="absolute w-full h-full bg-white rounded-xl shadow-lg overflow-hidden"
                style={{
                  zIndex,
                  rotate: isTop ? rotate : undefined,
                }}
                initial={{ scale, y: translateY, opacity: 1 }}
                animate={{ scale, y: translateY, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
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

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => swipe("left")}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-red-500 shadow-md hover:bg-red-50 transition dark:border-gray-700 dark:bg-gray-900 dark:text-red-400"
        >
          <span className="text-2xl" aria-hidden="true">
            ❌
          </span>
          <span className="sr-only">Pass</span>
        </button>

        <button
          type="button"
          onClick={() => swipe("super")}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-400 bg-blue-500 text-white shadow-md hover:bg-blue-600 transition"
        >
          <span className="text-xl" aria-hidden="true">
            ⭐
          </span>
          <span className="sr-only">Super Like</span>
        </button>

        <button
          type="button"
          onClick={() => swipe("right")}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 text-white shadow-md hover:bg-pink-600 transition"
        >
          <span className="text-2xl" aria-hidden="true">
            ❤️
          </span>
          <span className="sr-only">Like</span>
        </button>
      </div>
    </div>
  );
}

