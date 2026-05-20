import { fetchTrendingIdeas } from "@/lib/ideas/data";
import IdeaCard from "./IdeaCard";

const TrendingIdeas = async () => {
  const ideas = await fetchTrendingIdeas();

  return (
    <section className="bg-white dark:bg-gray-950 py-20 px-5  border-gray-200 dark:border-gray-800">
      <div className="container mx-auto ">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-gray-200 dark:border-gray-900 gap-6">
          <div className="space-y-3 text-left">
            <div className="font-mono text-xs tracking-widest text-gray-400 dark:text-gray-500 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#249E94]" />
              EXPLORE WHAT'S NEXT
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase text-gray-900 dark:text-white">
              Trending Startup{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0C7779] via-[#249E94] to-[#3BC1A8] italic font-serif">
                Concepts.
              </span>
            </h2>
          </div>

          <div className="font-mono text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-bold">
            Sorting: Hot Vault activity // Total Count: {ideas.length}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="transition-transform duration-200 hover:-translate-y-1"
            >
              <IdeaCard idea={idea} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingIdeas;
