import { personalInfo } from "@/data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
          Get In Touch
        </h2>
        <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-12">
          I'm always open to new opportunities and interesting projects. 
          Feel free to reach out if you'd like to connect!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href={`mailto:${personalInfo.email}`}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Send Email
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors font-medium"
          >
            LinkedIn
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors font-medium"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
