import { projects } from "@/data/portfolio";
import Image from "next/image";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-12 text-center">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 bg-zinc-200 dark:bg-zinc-800">
                {/* Add your project images to /public/projects/ */}
                <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                  Project Image
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                  {project.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
