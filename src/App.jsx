import React, { useState, useEffect, useRef } from "react";

const storiesData = [
  {
    id: 1,
    user: "Saurav_kumar",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    stories: [
      "https://images.pexels.com/photos/31995895/pexels-photo-31995895/free-photo-of-turkish-coffee-with-scenic-bursa-view.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/12341218/pexels-photo-12341218.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/32058694/pexels-photo-32058694/free-photo-of-cozy-alpine-cabins-in-misty-mountain-landscape.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    ],
  },
  {
    id: 2,
    user: "Gaurav_kumar",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
    stories: [
      "https://images.pexels.com/photos/32141424/pexels-photo-32141424/free-photo-of-serene-field-of-wildflowers-in-bloom.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/32144341/pexels-photo-32144341/free-photo-of-lush-green-hills-of-artvin-turkiye-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    ],
  },
  {
    id: 3,
    user: "Manoj_kumar",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    stories: [
      "https://images.pexels.com/photos/32188885/pexels-photo-32188885/free-photo-of-close-up-of-fresh-green-peas-in-pod.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/16105790/pexels-photo-16105790/free-photo-of-person-near-castle-and-scaffolding.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/31837575/pexels-photo-31837575/free-photo-of-savannah-landscape-in-zaria-nigeria.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/32195239/pexels-photo-32195239/free-photo-of-breakfast-table-with-bread-and-coffee.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    ],
  },
  {
    id: 4,
    user: "Deepak_singh",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    stories: [
      "https://images.pexels.com/photos/18344230/pexels-photo-18344230/free-photo-of-white-coffee-machine-on-counter.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/31558042/pexels-photo-31558042/free-photo-of-tokyo-skyline-at-night-with-tokyo-tower.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    ],
  },
  {
    id: 5,
    user: "Sunil_kumar",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    stories: [
      "https://images.pexels.com/photos/20745050/pexels-photo-20745050/free-photo-of-beautiful-young-woman-posing-in-a-patterned-blazer.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/31493659/pexels-photo-31493659/free-photo-of-elegant-ceramic-vases-in-rustic-setting.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/31933726/pexels-photo-31933726/free-photo-of-silhouette-by-the-serene-ocean-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      "https://images.pexels.com/photos/32150499/pexels-photo-32150499/free-photo-of-stylish-woman-on-motorcycle-in-urban-setting.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    ],
  },
];

const STORY_DURATION = 5000;

const InstagramStories = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (activeStoryIndex !== null && !isPaused) {
      const start = Date.now();
      intervalRef.current = setInterval(() => {
        const percent = ((Date.now() - start) / STORY_DURATION) * 100;
        if (percent >= 100) {
          handleNext();
        } else {
          setProgress(percent);
        }
      }, 50);
    }
    return () => clearInterval(intervalRef.current);
  }, [activeStoryIndex, currentImageIndex, isPaused]);

  useEffect(() => {
    document.body.style.overflow =
      activeStoryIndex !== null ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [activeStoryIndex]);

  const openStory = (index) => {
    setActiveStoryIndex(index);
    setCurrentImageIndex(0);
    setProgress(0);
    setIsLoading(true);
  };

  const closeStory = () => {
    clearInterval(intervalRef.current);
    setActiveStoryIndex(null);
    setCurrentImageIndex(0);
    setProgress(0);
    setIsPaused(false);
  };

  const handleNext = () => {
    const story = storiesData[activeStoryIndex];
    if (currentImageIndex < story.stories.length - 1) {
      setCurrentImageIndex((prev) => prev + 1);
      setProgress(0);
      setIsLoading(true);
    } else if (activeStoryIndex < storiesData.length - 1) {
      setActiveStoryIndex((prev) => prev + 1);
      setCurrentImageIndex(0);
      setProgress(0);
      setIsLoading(true);
    } else {
      closeStory();
    }
  };

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1);
      setProgress(0);
      setIsLoading(true);
    } else if (activeStoryIndex > 0) {
      const prev = activeStoryIndex - 1;
      setActiveStoryIndex(prev);
      setCurrentImageIndex(storiesData[prev].stories.length - 1);
      setProgress(0);
      setIsLoading(true);
    }
  };

  const handleImageLoad = () => setIsLoading(false);
  const handleImageError = () => {
    setIsLoading(false);
    setTimeout(handleNext, 1000);
  };

  const viewer = storiesData[activeStoryIndex];

  return (
    <div className="w-full min-h-screen flex justify-center items-start bg-gray-900 pt-8">
      {/* Home Screen Styled Like Mobile */}
      {activeStoryIndex === null && (
        <div className="bg-black w-[375px] h-[667px] rounded-2xl shadow-xl p-4 overflow-hidden">
          <h1 className="text-xl font-bold mb-4 text-white">Stories</h1>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {storiesData.map((story, index) => (
              <div
                key={story.id}
                className="flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
                onClick={() => openStory(index)}
              >
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 to-pink-500">
                  <div className="w-full h-full rounded-full bg-black overflow-hidden">
                    <img
                      src={story.avatar}
                      alt={story.user}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs text-center mt-1 truncate max-w-[64px] text-white">
                  {story.user}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Story Viewer */}
      {viewer && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 z-50 flex flex-col items-center px-4">
          <div className="w-full max-w-md flex flex-col flex-grow">
            {/* Progress Bars */}
            <div className="flex space-x-1 p-2">
              {viewer.stories.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-1 bg-gray-700 rounded overflow-hidden"
                >
                  <div
                    className="h-full bg-white transition-all"
                    style={{
                      width:
                        index < currentImageIndex
                          ? "100%"
                          : index === currentImageIndex
                          ? `${progress}%`
                          : "0%",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Header */}
            <div className="flex justify-between items-center px-2 pb-2">
              <div className="flex items-center space-x-2">
                <img
                  src={viewer.avatar}
                  alt={viewer.user}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-semibold">{viewer.user}</span>
              </div>
              <button onClick={closeStory} className="text-3xl font-light">
                &times;
              </button>
            </div>

            {/* Image Area */}
            <div className="relative flex-1 w-full overflow-hidden rounded-md">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-60">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <img
                src={viewer.stories[currentImageIndex]}
                alt="Story"
                onLoad={handleImageLoad}
                onError={handleImageError}
                className={`absolute inset-0 max-w-full max-h-full m-auto object-contain transition-opacity duration-300 ${
                  isLoading ? "opacity-50" : "opacity-100"
                }`}
                onMouseDown={() => setIsPaused(true)}
                onMouseUp={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
              />
              {/* Nav Areas */}
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-0 h-full w-1/3 z-20"
              />
              <button
                onClick={handleNext}
                className="absolute right-0 top-0 h-full w-1/3 z-20"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <InstagramStories />
    </div>
  );
}
