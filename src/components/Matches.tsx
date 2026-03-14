import React from "react";

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  image: string;
}

interface MatchesProps {
  matches: Profile[];
}

export default function Matches({ matches }: MatchesProps) {
  if (!matches.length) {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 text-center">
        <p className="text-lg font-medium text-gray-700">
          No matches yet
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Keep swiping to start matching with people.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">
        Matches
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((profile) => (
          <div
            key={profile.id}
            className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={profile.image}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-4">
              <div className="mb-1 flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {profile.name}
                  <span className="ml-1 text-gray-600">
                    , {profile.age}
                  </span>
                </h3>
              </div>

              <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                {profile.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

