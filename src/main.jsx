import { data } from './data.jsx';

const root = document.getElementById('root');
const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');

let timerInterval;
const createTimer = (timer) => {
  const reformat = (num) => `0${num}`.slice(-2);
  let time = 0;

  timerInterval = setInterval(() => {
    time += 1;
    const hours = Math.floor(time / 3600);
    const minutes = reformat(Math.floor((time % 3600) / 60));
    const seconds = reformat(Math.floor(time % 60));

    timer.textContent = `${hours}:${minutes}:${seconds}`;
  }, 1);
};
let spinnerInterval;
const createSpinner = (spinner) => {
  const time = ['|', '/', '-', '\\'];
  let i = 0;

  spinnerInterval = setInterval(() => {
    i += 1;
    spinner.textContent = `PLAYING ${time[i % time.length]}`;
  }, 1);
};

const Link = (props) => {
  return (
    <a
      class="underline decoration-gray-400 text-black font-medium rounded-md hover:bg-gray-200 transition-colors duration-200"
      href={props.href}
    >
      {props.children}
    </a>
  );
};

const Header = () => {
  return (
    <header class="p-16 pb-20 max-w-full w-[45rem] space-y-5">
      <h4 class="flex gap-2 items-center text-2xl font-black text-black">
        <img
          class="w-12 animate-spin ease-in-out rounded-full"
          src="/head.png"
          loading="lazy"
          decoding="async"
          alt="Headshot"
        />
        Aiden Bai
      </h4>
      <p>I'm a 17 y/o high school student from the USA. </p>
      <p>
        My current research focuses on the intersection between human-computer
        interaction, web frameworks, and information equality.
      </p>
      <p>
        Currently, I create open-source JavaScript libraries that help web
        programmers make better websites for end users. My hope is that one day,
        we'll be able to learn, create, and collaborate faster on the web.
      </p>
      <p>
        On the side, I like blasting music with my windows down on the highway,
        chugging fruit tea boba, and sampling chicken karage.
      </p>
      <p class="italic">
        Want to reach out?{' '}
        <Link href="mailto:aiden.bai05@gmail.com">Say hello!</Link>
      </p>
      <p class="flex flex-wrap gap-10">
        <span class="animate-pulse">◕ ◡ ◕ っ</span>
        <span>
          <Link href="https://github.com/aidenybai">GitHub</Link> ·{' '}
          <Link href="https://twitter.com/aidenybai">Twitter</Link> ·{' '}
          <Link href="https://youtube.com/@aidenbai">YouTube</Link>
        </span>
      </p>
    </header>
  );
};

const Stats = () => {
  return (
    <div class="p-16 pt-0 space-y-16">
      <section class="flex gap-4">
        <div class="animate-pulse w-32 text-gray-400">Projects</div>
        <div class="flex flex-wrap w-full gap-y-10 gap-x-20">
          {data.projects.map(({ name, description, link }) => (
            <div class="w-60">
              <Link href={link}>{name}</Link> <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section class="flex gap-4">
        <div class="animate-pulse w-32 text-gray-400">Work</div>
        <div class="flex flex-wrap w-full gap-y-10 gap-x-20">
          {data.work.map(({ name, description, link }) => (
            <div class="w-60">
              <Link href={link}>{name}</Link> <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section class="flex gap-4">
        <div class="animate-pulse w-32 text-gray-400">Awards</div>
        <div class="flex flex-wrap w-full gap-y-10 gap-x-20">
          {data.awards.map(({ name, description, link }) => (
            <div class="w-60">
              <Link href={link}>{name}</Link> <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Footer = () => {
  return (
    <footer class="p-16 pt-0 space-y-16">
      <p class="italic">
        Want to hire me? Check out my{' '}
        <Link href="https://linkedin.com/in/aidenbai">LinkedIn</Link> ·{' '}
        <Link href="https://www.figma.com/file/n4MkGYBP1CEc3LsXU9z1pT/Resume?node-id=0%3A1">
          Resume
        </Link>
      </p>
    </footer>
  );
};

const Content = () => {
  const timer = <p class="my-auto ml-auto mr-16">0:00:00</p>;
  createTimer(timer);
  const spinner = <p class="my-auto ml-16 animate-pulse">PLAYING |</p>;
  createSpinner(spinner);

  return (
    <div class="hidden text-xl text-gray-700 font-normal transition">
      <div class="sticky z-50 top-0 flex bg-blue-700 w-full h-10 text-white font-mono transition-opacity duration-1000">
        {spinner}
        {timer}
      </div>
      <Header />
      <Stats />
      <Footer />
    </div>
  );
};

const VCR = () => {
  const timer = <p class="text-5xl">0:00:00</p>;
  createTimer(timer);
  return (
    <div class="absolute flex flex-col bg-blue-700 w-full text-5xl h-screen p-16 text-white font-mono transition-opacity duration-1000">
      <div class="flex mb-auto animate-pulse">
        <button class="mr-auto">PLAY</button>
        <p>--:--</p>
      </div>
      <div class="flex animate-pulse">
        <p class="mr-36">SLP</p>
        {timer}
      </div>
    </div>
  );
};

const content = <Content />;

if (REDUCE_MOTION) {
  const vcr = <VCR />;
  root.appendChild(vcr);
  setTimeout(() => {
    clearInterval(timerInterval);
    vcr.style.opacity = 0;
    setTimeout(() => {
      vcr.style.display = 'none';
    }, 1000);
    content.style.display = 'block';
  }, Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000);
}

root.appendChild(content);
