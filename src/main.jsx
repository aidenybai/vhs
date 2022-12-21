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
  const BIRTHDAY = new Date('January 5, 2005').getTime();
  const calc = () => {
    const diff = new Date().getTime() - BIRTHDAY;
    return (diff / 1000 / 60 / 60 / 24 / 365).toFixed(9);
  };

  const age = <span class="font-mono">{calc()}</span>;

  setInterval(() => {
    age.textContent = calc();
  }, 10);

  return (
    <header class="p-8 md:p-16 md:pb-0 max-w-full md:w-[55rem] space-y-5">
      <h4 class="flex gap-2 items-center text-2xl font-black text-black">
        <img
          class="w-12 hover:animate-spin motion-reduce:animate-none ease-in-out rounded-full"
          src="/head.png"
          loading="lazy"
          decoding="async"
          alt="Headshot"
        />
        Aiden Bai
      </h4>
      <p>I'm a {age} y/o high school student from the USA. </p>
      <p>
        My current research focuses on the intersection between{' '}
        <Link href="https://en.wikipedia.org/wiki/Human%E2%80%93computer_interaction">
          human-computer interaction
        </Link>
        , web frameworks, and information equality.
      </p>
      <p>
        Currently, I{' '}
        <Link href="https://github.com/aidenybai">
          create open-source JavaScript libraries
        </Link>{' '}
        that help web programmers make better websites for end
        users. My hope is that one day, we'll be able to learn,
        create, and collaborate{' '}
        <span class="italic">faster</span> on the web.
      </p>
      <p>
        On the side, I like{' '}
        <Link href="https://open.spotify.com/user/pc8oiwotonvqvkw61vimh0kks">
          blasting music
        </Link>{' '}
        with my windows down on the highway, chugging{' '}
        <span
          class="italic"
          title="Mango Kiwi with Lichee Jelly!"
        >
          fruit tea boba
        </span>
        , and grinding{' '}
        <Link href="https://www.stardewvalley.net/">
          Stardew Valley
        </Link>
        .
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
    <div class="p-8 md:p-16 pb-0 pt-0 space-y-8">
      <section class="flex flex-wrap md:flex-nowrap gap-4">
        <div class="italic animate-pulse motion-reduce:animate-none w-32 text-gray-400">
          Projects
        </div>
        <div class="flex flex-wrap w-full gap-y-10 gap-x-20">
          {data.projects.map(({ name, description, link }) => (
            <div class="w-full md:w-60">
              <p class="font-mono">
                <Link href={link}>{name}</Link>
              </p>{' '}
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
              <p class="font-mono">
                <Link href={link}>{name}</Link>
              </p>{' '}
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
              <p class="font-mono">
                <Link href={link}>{name}</Link>
              </p>{' '}
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
    <footer class="p-8 md:p-16 md:pt-0 space-y-8">
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
      <p class="italic text-gray-400">P.S. Try ejecting the page!</p>
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
    <p class="transition w-full ml-8 my-auto md:ml-16 whitespace-nowrap animate-pulse motion-reduce:animate-none hover:animate-none hover:text-gray-300">
      | EJECT ⏏
    </p>
  );
  createSpinner(spinner, true);

  let count = 0;
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
      const dvd = (
        <img class="dvd" src="/folder.png" draggable="false" />
      );
      const display = <span>{String(count)}</span>;
      document.body.appendChild(
        <div class="text-center">
          {dvd}
          <p>
            {spinner}
            {display} EJECTED
          </p>
          <p class="mx-auto w-10/12 sm:w-80 mt-10 text-gray-400">
            I guess the sooner we come to terms with our{' '}
            <span class="text-white">mortality</span>, the more
            time we can spend really living in the here-and-now.
          </p>
        </div>
      );
      runDvd(dvd, () => {
        count++;
        display.textContent = String(count);
      });
    }, 1000);
  });

  return (
    <div class="whitespace-normal hidden flex-col text-xl bg-slate-100 text-gray-700 font-normal transition motion-reduce:transition-none">
      <div class="transition-all sticky justify-between z-50 top-0 flex bg-blue-700 w-full h-10 hover:h-16 text-white font-mono motion-reduce:transition-none duration-1000">
        {spinner}
        {timer}
      </div>
      <div class="mx-auto">
        <Header />
        <Stats />
        <Footer />
      </div>
    </div>
  );
};

const VCR = () => {
  const timer = <p class="glitch">0:00:00</p>;
  createTimer(timer);
  return (
    <div class="absolute flex flex-col bg-blue-700 pointer-events-none w-full text-4xl sm:text-5xl md:text-6xl lg:text-8xl h-screen pb-32 p-8 md:p-16 text-white font-mono motion-reduce:transition-none transition-opacity duration-500">
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
    content.style.display = 'flex';
  }, Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000);
} else {
  content.style.display = 'flex';
}
root.appendChild(content);
