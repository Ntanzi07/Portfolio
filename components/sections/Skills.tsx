import { skills } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-12 text-center">
          Skills & Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Frontend
            </h3>
            <ul className="space-y-2">
              {skills.frontend.map((skill, index) => (
                <li
                  key={index}
                  className="text-zinc-700 dark:text-zinc-300 flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Backend
            </h3>
            <ul className="space-y-2">
              {skills.backend.map((skill, index) => (
                <li
                  key={index}
                  className="text-zinc-700 dark:text-zinc-300 flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Tools & Other
            </h3>
            <ul className="space-y-2">
              {skills.tools.map((skill, index) => (
                <li
                  key={index}
                  className="text-zinc-700 dark:text-zinc-300 flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
