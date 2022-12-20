import { data } from './data.jsx';
import { runDvd } from './dvd.jsx';
import { PowerGlitch } from 'powerglitch';

const root = document.getElementById('root');
const REDUCE_MOTION = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);

let timerInterval;
const createTimer = (timer, progress) => {
  const reformat = (num) => `0${num}`.slice(-2);
  let time = 0;

  timerInterval = setInterval(() => {
    time += 1;
    const hours = Math.floor(time / 3600);
    const minutes = reformat(Math.floor((time % 3600) / 60));
    const seconds = reformat(Math.floor(time % 60));

    let payload = `${hours}:${minutes}:${seconds}`;

    if (progress) {
      let baseProgress = '-------'.split('');
      baseProgress[time % 7] = '█';
      payload = `●${baseProgress.join('')}● ${payload}`;
    }

    timer.textContent = payload;
  }, 1000);
};
const createSpinner = (spinner, eject) => {
  const time = ['|', '/', '-', '\\'];
  let i = 0;

  setInterval(() => {
    i += 1;

    let payload = `${time[i % time.length]}`;
    if (eject) payload += ' EJECT ⏏';
    spinner.textContent = payload;
  }, 1);
};

const Link = (props) => {
  return (
    <a
      class="underline decoration-gray-400 text-black font-medium rounded-md hover:bg-gray-200 transition-colors motion-reduce:transition-none duration-200"
      href={props.href}
    >
      {props.children}
    </a>
  );
};

const Header = () => {
  return (
    <header class="p-8 md:p-16 md:pb-20 max-w-full w-[45rem] space-y-5">
      <h4 class="flex gap-2 items-center text-2xl font-black text-black">
        <img
          class="w-12 animate-spin motion-reduce:animate-none ease-in-out rounded-full"
          src="/head.png"
          loading="lazy"
          decoding="async"
          alt="Headshot"
        />
        Aiden Bai
      </h4>
      <p>I'm a 17 y/o high school student from the USA. </p>
      <p>
        My current research focuses on the intersection between
        human-computer interaction, web frameworks, and
        information equality.
      </p>
      <p>
        Currently, I create open-source JavaScript libraries that
        help web programmers make better websites for end users.
        My hope is that one day, we'll be able to learn, create,
        and collaborate faster on the web.
      </p>
      <p>
        On the side, I like blasting music with my windows down
        on the highway, chugging fruit tea boba, and sampling
        chicken karage.
      </p>
      <p class="italic">
        Want to reach out?{' '}
        <Link href="mailto:aiden.bai05@gmail.com">
          Say hello!
        </Link>
      </p>
      <p class="flex flex-wrap gap-10">
        <span class="animate-pulse motion-reduce:animate-none">
          ◕ ◡ ◕ っ
        </span>
        <span>
          <Link href="https://github.com/aidenybai">GitHub</Link>{' '}
          ·{' '}
          <Link href="https://twitter.com/aidenybai">
            Twitter
          </Link>{' '}
          ·{' '}
          <Link href="https://youtube.com/@aidenbai">
            YouTube
          </Link>
        </span>
      </p>
    </header>
  );
};

const Stats = () => {
  return (
    <div class="p-8 md:p-16 pt-0 space-y-16">
      <section class="flex flex-wrap md:flex-nowrap gap-4">
        <div class="italic animate-pulse motion-reduce:animate-none w-32 text-gray-400">
          Projects
        </div>
        <div class="flex flex-wrap w-full gap-y-10 gap-x-20">
          {data.projects.map(({ name, description, link }) => (
            <div class="w-full md:w-60">
              <Link href={link}>{name}</Link>{' '}
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section class="flex flex-wrap md:flex-nowrap gap-4">
        <div class="italic animate-pulse motion-reduce:animate-none w-32 text-gray-400">
          Work
        </div>
        <div class="flex flex-wrap w-full gap-y-10 gap-x-20">
          {data.work.map(({ name, description, link }) => (
            <div class="w-full md:w-60">
              <Link href={link}>{name}</Link>{' '}
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section class="flex flex-wrap md:flex-nowrap gap-4">
        <div class="italic animate-pulse motion-reduce:animate-none w-32 text-gray-400">
          Awards
        </div>
        <div class="flex flex-wrap w-full gap-y-10 gap-x-20">
          {data.awards.map(({ name, description, link }) => (
            <div class="w-full md:w-60">
              <Link href={link}>{name}</Link>{' '}
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Footer = () => {
  return (
    <footer class="p-8 md:p-16 pt-0 space-y-16">
      <p class="italic">
        Want to hire me? Check out my{' '}
        <Link href="https://linkedin.com/in/aidenbai">
          LinkedIn
        </Link>{' '}
        &{' '}
        <Link href="https://www.figma.com/file/n4MkGYBP1CEc3LsXU9z1pT/Resume?node-id=0%3A1">
          Resume
        </Link>
        !
      </p>
    </footer>
  );
};

const Content = () => {
  const timer = (
    <p class="mr-8 my-auto md:mr-16 animate-pulse whitespace-nowrap motion-reduce:animate-none">
      0:00:00
    </p>
  );
  createTimer(timer, true);

  const spinner = (
    <p class="w-full ml-8 my-auto md:ml-16 whitespace-nowrap animate-pulse motion-reduce:animate-none">
      | EJECT ⏏
    </p>
  );
  createSpinner(spinner, true);

  spinner.addEventListener('click', () => {
    document.body.className =
      'bg-black text-white font-mono flex items-center justify-center h-screen overflow-hidden';
    PowerGlitch.glitch('#root', {
      glitchTimeSpan: false,
    });

    const spinner = <span>|</span>;
    createSpinner(spinner);

    setTimeout(() => {
      document.body.textContent = '';
      document.body.appendChild(
        <div class="text-center">
          <p id="dvd">{spinner} EJECTED</p>
        </div>
      );
      runDvd();
    }, 1000);
  });

  return (
    <div class="hidden text-xl bg-white text-gray-700 font-normal transition motion-reduce:transition-none">
      <div class="sticky justify-between z-50 top-0 flex bg-blue-700 w-full h-10 text-white font-mono transition-opacity motion-reduce:transition-none duration-1000">
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
  const timer = <p class="text-5xl glitch">0:00:00</p>;
  createTimer(timer);
  return (
    <div class="absolute flex flex-col bg-blue-700 pointer-events-none w-full text-5xl h-screen p-8 md:p-16 text-white font-mono motion-reduce:transition-none transition-opacity duration-500">
      <div class="flex justify-between mb-auto animate-pulse motion-reduce:animate-none">
        <p class="glitch">PLAY ►</p>
        <p class="glitch">--:--</p>
      </div>
      <div class="flex justify-between animate-pulse motion-reduce:animate-none">
        <p class="glitch">SP</p>
        {timer}
      </div>
    </div>
  );
};

const content = <Content />;

if (REDUCE_MOTION) {
  const vcr = <VCR />;
  root.appendChild(vcr);
  const glitch1 = PowerGlitch.glitch('.glitch', {
    timing: {
      duration: 700,
      iterations: 25,
      easing: 'ease-in-out',
    },
  });
  setTimeout(() => {
    glitch1.stopGlitch();
    const glitch2 = PowerGlitch.glitch('.glitch', {
      glitchTimeSpan: false,
    });
    clearInterval(timerInterval);
    vcr.style.opacity = 0;
    setTimeout(() => {
      glitch2.stopGlitch();
      vcr.style.display = 'none';
    }, 1000);
    content.style.display = 'block';
  }, Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000);
} else {
  content.style.display = 'block';
}
root.appendChild(content);
