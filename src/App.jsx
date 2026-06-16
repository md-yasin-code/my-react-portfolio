import { useState, useEffect } from "react";

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress =
        (window.pageYOffset / totalHeight) * 100;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-white font-bold text-xl">
            M. YASIN
          </h1>

          <div className="flex gap-4 text-white">
            <button onClick={() => scrollToSection("home")}>
              Home
            </button>

            <button onClick={() => scrollToSection("about")}>
              About
            </button>

            <button onClick={() => scrollToSection("skills")}>
              Skills
            </button>

            <button onClick={() => scrollToSection("projects")}>
              Projects
            </button>

            <button onClick={() => scrollToSection("contact")}>
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center text-center px-6"
      >
        <h1 className="text-5xl font-bold mb-4">
          Md Yasin
        </h1>

        <p className="text-xl text-gray-500">
          Accounting Student & Web Developer
        </p>
      </section>

      {/* About */}
      <section
        id="about"
        className="max-w-5xl mx-auto py-24 px-6"
      >
        <h2 className="text-3xl font-bold mb-6">
          About Me
        </h2>

        <p>
          I am an Accounting student and a passionate
          web developer. I enjoy creating modern and
          professional websites using React, Tailwind
          CSS and Firebase.
        </p>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="max-w-5xl mx-auto py-24 px-6"
      >
        <h2 className="text-3xl font-bold mb-6">
          Skills
        </h2>

        <ul className="space-y-3">
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>Tailwind CSS</li>
          <li>Firebase</li>
        </ul>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="max-w-5xl mx-auto py-24 px-6"
      >
        <h2 className="text-3xl font-bold mb-6">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-xl p-5">
            <h3 className="text-xl font-semibold">
              Resume Builder
            </h3>

            <p>
              Professional CV and Resume Builder
              Website.
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h3 className="text-xl font-semibold">
              Portfolio Website
            </h3>

            <p>
              Modern React Portfolio with animations.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="max-w-5xl mx-auto py-24 px-6"
      >
        <h2 className="text-3xl font-bold mb-6">
          Contact
        </h2>

        <p>Email: your@email.com</p>
      </section>
    </>
  );
}

export default App;
