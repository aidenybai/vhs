import { data } from './data.jsx';
import { runDvd } from './dvd.jsx';
import { PowerGlitch } from 'powerglitch';

const root = document.getElementById('root');
const REDUCE_MOTION = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
const audio = new Audio('/effect.webm');

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
    <header class="p-8 md:p-16 md:pb-0 max-w-full md:w-[55rem] space-y-5">
      <h4 class="flex gap-2 items-center text-2xl font-black text-black">
        <img
          class="w-12 hover:animate-spin motion-reduce:animate-none ease-in-out rounded-full"
          src="/head.jpeg"
          loading="lazy"
          decoding="async"
          alt="Headshot"
        />
        Aiden Bai
      </h4>
      <p>
        Right now, I'm building{' '}
        <Link href="https://million.dev">Million.js</Link> <Link href="https://www.ycombinator.com/companies/million-js">(YC W24)</Link>: The
        copilot for web performance. My hope is that one day,
        we'll be able to learn, create, and collaborate{' '}
        <span class="italic">faster</span> on the web.
      </p>
      <p>
        I'm also a <strike>serial lecture skipper</strike> student at the
        Computer Science at the{' '}
        <Link href="https://www.uw.edu/">
          University of Washington
        </Link>
        &nbsp;(currently on leave)
      </p>
      <p>
        For fun, I like{' '}
        <Link href="https://open.spotify.com/user/pc8oiwotonvqvkw61vimh0kks">
          blasting music
        </Link>{' '}
        with my windows down on the highway, chugging{' '}
        <span title="Mango Kiwi with Lichee Jelly!">
          fruit tea boba
        </span>
        , giggling over capybaras ʕ•ᴥ•ʔ, and fishing in{' '}
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
      {/* <p class="italic">
        Want to hire me? Check out my{' '}
        <Link href="https://linkedin.com/in/aidenbai">
          LinkedIn
        </Link>{' '}
        &{' '}
        <Link href="https://www.figma.com/file/n4MkGYBP1CEc3LsXU9z1pT/Resume?node-id=0%3A1">
          Resume
        </Link>
        !
      </p> */}
      {!REDUCE_MOTION ? (
        <p class="italic text-gray-400">
          P.S. Try ejecting the page!
        </p>
      ) : (
        <p></p>
      )}
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
    <p class="transition w-full ml-8 my-auto md:ml-16 whitespace-nowrap animate-pulse motion-reduce:animate-none hover:animate-none hover:underline">
      |
    </p>
  );

  createSpinner(spinner, !REDUCE_MOTION);

  if (!REDUCE_MOTION) {
    let count = 0;
    spinner.addEventListener('click', () => {
      audio.cloneNode(true).play();
      document.body.className =
        'bg-black text-white font-mono flex items-center justify-center h-screen overflow-hidden';
      PowerGlitch.glitch('#root', {
        glitchTimeSpan: false,
      });

      const spinner = <span>|</span>;
      createSpinner(spinner);

      setTimeout(() => {
        document.body.textContent = '';
        document.body.style.overflow = 'hidden';
        const dvd = (
          <img class="dvd" src="/capy.gif" draggable="false" />
        );
        const display = <span>{String(count)}</span>;
        const reload = (
          <button class="hover:underline">REWIND ⏮</button>
        );
        reload.addEventListener('click', () => {
          audio.cloneNode(true).play();
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
        document.body.appendChild(
          <div class="text-center">
            {dvd}
            <p>
              {spinner}
              {display} EJECTED
            </p>
            <p class="mx-auto w-10/12 sm:w-80 mt-5 text-gray-400">
              I guess the sooner we come to terms with our{' '}
              <span class="text-white hover:underline">
                <a href="https://www.pinterest.com/pin/480407485258299307/">
                  mortality
                </a>
              </span>
              , the more time we can spend really living in the
              here-and-now.
            </p>
            <p class="mt-5">{reload}</p>
          </div>
        );
        runDvd(dvd, () => {
          count++;
          display.textContent = String(count);
        });
      }, 1000);
    });
  }

  return (
    <div class="whitespace-normal hidden flex-col text-xl bg-slate-100 text-gray-700 font-normal transition motion-reduce:transition-none min-h-screen">
      <div class="transition-all sticky justify-between z-50 top-0 flex bg-blue-700 w-full h-10 hover:h-12 text-white font-mono motion-reduce:transition-none duration-1000">
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

const vcr = document.getElementById('vcr');
const content = <Content />;

if (!REDUCE_MOTION) {
  const timer = <p class="glitch">0:00:00</p>;
  createTimer(timer);
  document.getElementById('marker').appendChild(timer);

  const glitch0 = PowerGlitch.glitch('.overlay', {
    glitchTimeSpan: false,
  });
  const glitch1 = PowerGlitch.glitch('.glitch', {
    timing: {
      duration: 700,
      easing: 'ease-in-out',
    },
  });
  let init = false;
  setTimeout(() => {
    if (!init) {
      document.getElementById('reminder').style.opacity = 1;
    }
    glitch0.stopGlitch();
  }, 1000);
  const start = () => {
    if (init) return;
    audio.cloneNode(true).play();
    init = true;
    glitch1.stopGlitch();
    const glitch2 = PowerGlitch.glitch('.glitch', {
      glitchTimeSpan: false,
    });
    clearInterval(timerInterval);
    vcr.style.opacity = 0;
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      glitch2.stopGlitch();
      vcr.style.display = 'none';
    }, 1000);
    content.style.display = 'flex';
  };
  document.addEventListener('click', start);
} else {
  vcr.style.display = 'none';
  content.style.display = 'flex';
  document.body.style.overflow = 'auto';
}
root.appendChild(content);
