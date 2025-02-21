"use client";

import Navigation from "@/components/Navigation";
import Link from "next/link";

export default function About() {
  const skills = {
    frontend: [
      "TypeScript",
      "React.js",
      "Angular",
      "Next.js",
      "TailwindCSS",
      "MaterialUI",
      "Redux",
      "Svelte",
      "jQuery",
      "HTML5",
      "CSS3/SCSS",
    ],
    backend: [
      "Node.js",
      "Python",
      "Go",
      "NestJS",
      "Django",
      "FastAPI",
      "GraphQL",
      "Express.js",
      "SailsJS",
      "Fiber",
      "Gin",
    ],
    databases: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Firebase",
      "MySQL",
      "Cassandra",
      "CouchDB",
      "SQLite",
      "Microsoft SQL Server",
    ],
    mobile: [
      "React Native",
      "Flutter",
      "Native Android",
      "Ionic",
      "Apache Cordova",
      "Firebase SDKs",
    ],
    devops: [
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Git",
      "Jenkins",
      "GitHub Actions",
      "GitLab CI/CD",
    ],
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="max-w-4xl mx-auto p-8">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              Software Developer with{" "}
              <span className="font-semibold">7+ years of experience</span>{" "}
              designing and developing scalable web and mobile applications.
              Proficient in{" "}
              <span className="font-semibold">
                ReactJS, Angular, NestJS, GoLang, Python
              </span>
              , and <span className="font-semibold">Node.js</span>, with
              experience building{" "}
              <span className="font-semibold">
                high-performance platforms for 80,000+ users
              </span>
              .
            </p>
            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <Link
                href="https://www.linkedin.com/in/ashkan-tofangdar/"
                target="_blank"
                className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              >
                LinkedIn
              </Link>
              <Link
                href="http://github.com/ashkan4472"
                target="_blank"
                className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              >
                GitHub
              </Link>
              <a
                href="mailto:ashkan4472@gmail.com"
                className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              >
                ashkan4472@gmail.com
              </a>
              <span className="text-gray-600 dark:text-gray-400">
                Tehran, Iran
              </span>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="space-y-3">
                  <h3 className="text-xl font-semibold capitalize text-gray-800 dark:text-gray-200">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Languages
            </h2>
            <div className="flex gap-8">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  English
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Fluent</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Persian
                </h3>
                <p className="text-gray-600 dark:text-gray-400">Native</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="space-y-8">
              <div className="border-l-2 border-indigo-500 pl-4">
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                  Senior Software Developer
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  BerryOnMars | Germany | 2023 - Present
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>
                    Led development of dynamic web applications with 60%
                    performance improvement
                  </li>
                  <li>Implemented AI systems for task automation</li>
                  <li>Developed comprehensive testing strategies</li>
                  <li>
                    Collaborated with UX/UI designers for intuitive interfaces
                  </li>
                  <li>Optimized web application performance</li>
                </ul>
              </div>

              <div className="border-l-2 border-indigo-500 pl-4">
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                  Lead Developer & Co-founder
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Ninipaa | 2020 - 2023
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Built and scaled application to 80,000+ users</li>
                  <li>Mentored 50+ junior developers</li>
                  <li>
                    Reduced time-to-market by 20% through Agile implementation
                  </li>
                  <li>Built custom RESTful and GraphQL APIs</li>
                  <li>Enhanced application through systematic refactoring</li>
                </ul>
              </div>

              <div className="border-l-2 border-indigo-500 pl-4">
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                  Software Architect
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Lingoberry | 2021 - 2023
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>
                    Designed multi-tier software architecture for large-scale
                    applications
                  </li>
                  <li>Developed coding standards and best practices</li>
                  <li>Mentored junior software engineers</li>
                  <li>Created architectural diagrams and documentation</li>
                </ul>
              </div>

              <div className="border-l-2 border-indigo-500 pl-4">
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                  Technical Advisor
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  SmartX Accelerator | 2021 - 2022
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>
                    Provided technical guidance for multiple software projects
                  </li>
                  <li>Assisted in legacy system migrations</li>
                  <li>Developed solutions for operational efficiency</li>
                  <li>Managed system-level configurations</li>
                </ul>
              </div>

              <div className="border-l-2 border-indigo-500 pl-4">
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                  Full Stack Developer
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Swing | 2017 - 2020
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>
                    Developed full-stack applications with modern frameworks
                  </li>
                  <li>Built secure backend systems and APIs</li>
                  <li>Led legacy system modernization efforts</li>
                  <li>Integrated real-time features using WebSockets</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Notable Projects
            </h2>
            <div className="space-y-6">
              <div className="border-l-2 border-indigo-500 pl-4">
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                  ESR Machine Development
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Novin Gostar
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>
                    Designed diagnostic ESR machine for hospitals and
                    laboratories
                  </li>
                  <li>Built custom operating system for medical compliance</li>
                  <li>Implemented advanced image processing systems</li>
                  <li>
                    Collaborated with hardware engineers and medical
                    professionals
                  </li>
                </ul>
              </div>

              <div className="border-l-2 border-indigo-500 pl-4">
                <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">
                  Augmented Reality Web App
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  Iran Mine House
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Developed AR application using JavaScript and AR.js</li>
                  <li>Implemented QR code scanning for company profiles</li>
                  <li>Designed for international events and conferences</li>
                  <li>Enhanced UI/UX for seamless user experience</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Education & Awards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-indigo-500 pl-4">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                      B.Sc. in Computer Engineering
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Hamedan University of Tech | 2019 - 2024
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      GPA: 3.8
                    </p>
                  </div>
                  <div className="border-l-2 border-indigo-500 pl-4">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                      B.Sc. in Computer Engineering
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Shahid Beheshti University | 2020 - 2021
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Honorably Graduated 4 terms as guest in SBU
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Awards
                </h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-indigo-500 pl-4">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                      Best Paper Award
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Global Interdisciplinary Green Cities Conference | 2023
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Awarded for paper titled &ldquo;Improving Attention
                      Stand-alone Process Program (ASPP) with Artificial
                      Intelligence (AI)&rdquo;
                    </p>
                  </div>
                  <div className="border-l-2 border-indigo-500 pl-4">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                      Sharif MPM
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      8th Place | 2020
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Achieved score of 16.18 in the prestigious Sharif Mobile
                      Programming Marathon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
