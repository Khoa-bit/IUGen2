import type { NextPage } from "next";
import Image from "next/image";
import profilePic from "../../public/Edited.jpg";

const Home: NextPage = () => {
  return (
    <main className="flex items-center justify-center w-screen">
      <div className="prose prose-blue prose-h2:font-serif prose-h2:text-sky-500 prose-h2:mb-1 prose-h3:my-0.5 prose-img:rounded-full prose-em:underline px-8 prose-hr:m-0">
        <h1>Nguyen Anh Khoa</h1>
        <hr />
        <p>
          <b>Junior at International University</b>
        </p>
        <div className="flex justify-center">
          <Image
            src={profilePic}
            alt="Picture of the me"
            width={150}
            height={150}
            objectFit="cover"
          ></Image>
        </div>
        <h2>Information</h2>
        <hr />
        <ul>
          <li>
            <a href="mailto:nguyenanhkhoablue@gmail.com">
              nguyenanhkhoablue@gmail.com
            </a>{" "}
          </li>
          <li>
            <a href="tel:+84705078703">(+84)705078703</a>{" "}
          </li>
          <li>
            <a href="https://www.linkedin.com/in/khoabit/">
              https://www.linkedin.com/in/khoabit/
            </a>
          </li>
          <li>
            <a href="https://github.com/Khoa-bit">
              https://github.com/Khoa-bit
            </a>
          </li>
        </ul>
        <h2>Skills</h2>
        <hr />
        <h3>Language</h3>
        <ul>
          <li>English - IELTS 7.0</li>
        </ul>
        <h3>Technology</h3>
        <ul>
          <li>
            <em>Proficient in</em>: Python, Django, SQL (MySQL), Linux (Ubuntu),
            Javascript, Java, C++.
          </li>
          <li>
            <em>Knowledge of</em>: ReactJs, NextJs, Node.js, React Native, C,
            Bash, MIPS.
          </li>
        </ul>
        <h3>Tools</h3>
        <ul>
          <li>Collaboration: Git, Github, Trello, Slack, Google Suite.</li>
          <li>UI/UX: Figma</li>
        </ul>
        <h3>Technical</h3>
        <ul>
          <li>Networking, Operating System, DSA, OOP</li>
          <li>Agile Scrum</li>
          <li>UI UX Design, Logo Design</li>
        </ul>
        <h2>Summary</h2>
        <hr />
        <ul>
          <li>
            Currently a junior student at International University with a
            long-term goal to become a backend developer in a professional
            environment.
          </li>
          <li>
            An open-minded and active listener seeking opportunity to develop
            hard and soft skills from working with culleagues and superiors.
          </li>
          <li>
            Looking for a junior backend position to learn more about the full
            development process.
          </li>
        </ul>
        <h2>Education</h2>
        <hr />
        <h3>International University - VNU - HCMC</h3>
        <small>Sep 2019 - Current</small>
        <ul>
          <li>Major: Computer Science</li>
          <li>Third year student</li>
          <li>
            <b>GPA: 8.74/10</b>
          </li>
          <li>
            Achievements:
            <ul>
              <li>
                Full Schularship Award for outstanding performance in the
                Entrance Examination 2019.
              </li>
              <li>
                Student of 5 Good Merits by International University in 2020.
              </li>
              <li>
                Third place at Talented Students’ English contest at city level
                in grade 12th.
              </li>
            </ul>
          </li>
          <li>
            Online courses completed: Harvard CS50, Datacamp SQL, Udemy Python
            Django.
          </li>
        </ul>
        <h2>Projects</h2>
        <hr />
        <h3>Learning Management System</h3>
        <small>Aug 2021 - Dec 2021</small>
        <ul>
          <li>Positions: Project Manager and Full-stack.</li>
          <li>
            Orchestrate Agile Scrum techniques to meet all user stories in time.
            Participate in the design of the system and hosting.
          </li>
          <li>
            Implement most of the user interface, and hydrate it with data.
          </li>
          <li>Score 92/100 on Google Lighthouse audit.</li>
          <li>Technical Skills: Python (Django) and Web Development.</li>
          <li>
            <a href="https://github.com/Khoa-bit/e-learning-se-project">
              https://github.com/Khoa-bit/e-learning-se-project
            </a>
          </li>
        </ul>
        <h3>Boom Game</h3>
        <small>Aug 2020 - Jan 2021</small>
        <ul>
          <li>Positions: Project Manager and Backend.</li>
          <li>Score 100/100 for Object Oriented Programming course.</li>
          <li>
            Implement several components, including map design and sound
            effects.
          </li>
          <li>Technical Skills: Java (Swing) and Design Patterns.</li>
          <li>
            <a href="https://github.com/Khoa-bit/BoomGame_OOP_Project">
              https://github.com/Khoa-bit/BoomGame_OOP_Project
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Home;
