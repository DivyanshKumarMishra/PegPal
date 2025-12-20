import Image from 'next/image';

const heroText = {
  head_text: 'Let the Happy Hours Begin',
  sub_text:
    'Join the ultimate social network for alcohol connoisseurs. Keep the good times flowing 24/7',
  cta_text: 'Explore Drinks',
};

function HeroSection() {
  return (
    <section className="w-full bg-black">
      <div className="md:hidden py-10 mx-auto flex w-full max-w-7xl flex-col gap-10 items-center md:h-130">
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src="/hero-image.png"
            alt="hero image"
            width={600}
            height={600}
            priority
            className="object-cover mix-blend-screen opacity-80"
          />
        </div>
        <div className="w-full md:w-1/2 px-8 flex flex-col items-center justify-center md:justify-start">
          <h1 className="font-logo text-4xl md:text-5xl text-accent text-center font-bold leading-tight">
            {heroText.head_text}
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed text-center">
            {heroText.sub_text}
          </p>
          <button className="mt-6 w-fit rounded-lg bg-accent px-6 py-3 text-accent-foreground font-medium transition-colors hover:bg-accent/90">
            {heroText.cta_text}
          </button>
        </div>
      </div>
      <div className="hidden md:flex relative items-center justify-center">
        <Image
          src="/hero-image.png"
          alt="hero image"
          width={600}
          height={600}
          priority
          className="object-cover mix-blend-screen opacity-80 w-full lg:h-125 xl:h-150"
        />
      </div>
      <div className="hidden md:absolute md:top-15 md:flex md:h-100 lg:h-125 xl:h-150 w-1/2 flex-col items-center">
        <div className="pl-6 lg:pl-12 flex flex-col w-full h-full gap-5 justify-center">
          <h1 className="font-logo font-bold md:text-5xl lg:text-6xl xl:text-8xl text-accent leading-tight">
            {heroText.head_text}
          </h1>
          <p className="text-base md:text-lg md:max-w-xs lg:max-w-lg text-muted-white leading-relaxed">
            {heroText.sub_text}
          </p>
          <button className="w-fit rounded-lg bg-accent px-6 py-3 text-accent-foreground font-medium transition-colors hover:bg-accent/90">
            {heroText.cta_text}
          </button>
          <div></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
