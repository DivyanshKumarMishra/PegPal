import Image from 'next/image';

const heroText = {
  head_text: 'Let the Happy Hours Begin',
  sub_text: [
    'Join the ultimate social network for alcohol connoisseurs.',
    'Keep the good times flowing 24/7.',
  ],
  cta_text: 'Explore Drinks',
};

function HeroSection() {
  return (
    <section className="w-full">
      <div className="w-full flex flex-col md:flex-row gap-10 md:gap-0 items-center md:h-150">
        <div className="h-full md:w-1/2 px-6 lg:px-10 flex flex-col items-center md:items-start justify-center gap-5">
          <h1 className="font-logo text-5xl md:text-5xl lg:text-6xl text-accent text-center md:text-left font-bold leading-tight">
            {heroText.head_text}
          </h1>
          <div className='w-full md:max-w-xs lg:max-w-sm xl:max-w-xl'>
            {heroText.sub_text?.map((text, idx) => (
              <p
                key={idx}
                className="text-base md:text-lg lg:text-xl text-white text-center md:text-left"
              >
                {text}
              </p>
            ))}
          </div>
          <button className="w-fit rounded-lg bg-accent px-6 py-3 text-accent-foreground font-medium transition-colors hover:bg-accent/90">
            {heroText.cta_text}
          </button>
        </div>
        <div className="relative w-full md:w-1/2 h-full flex aspect-square items-center justify-center">
          <Image
            src="/hero-image.png"
            alt="hero image"
            fill
            priority
            className="object-contain opacity-80"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
