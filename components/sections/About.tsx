import { about } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8 text-center">
          About Me
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-8 shadow-lg">
          <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
            {about.bio}
          </p>
          <div className="space-y-3">
            {about.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 text-xl">✓</span>
                <p className="text-zinc-700 dark:text-zinc-300">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
