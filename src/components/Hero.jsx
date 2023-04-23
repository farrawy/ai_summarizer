import { logo, github } from '../assets';

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center  w-full mb-10 pt-3">
        <img src={logo} alt="sumz_logo" className="w-52 object-contain" />

        <button
          type="button"
          onClick={() =>
            window.open('https://github.com/farrawy/ai_summarizer')
          }
          className="black_btn flex items-center justify-center flex-row "
        >
          <img src={github} alt="github" className="w-6 h-6 object-contain " />
          <p
            className="
            font-satoshi text-sm font-medium text-white max-sm:hidden ml-2
          "
          >
            Source Code
          </p>
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>

      <h2 className="desc">
        Simplify your reading with Summarizz, an open-source article summarizer
        that transforms long-form content into short, easy-to-read summaries.
      </h2>
    </header>
  );
};

export default Hero;
