import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Loader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-xl">
      <div className="size-40 md:size-60">
        <DotLottieReact src="/cheers.lottie" loop autoplay />
      </div>
    </div>
  );
}

export default Loader;
