import { Icon } from '@iconify/react';

export default function Navigate() {
  return (
    <span className="links">
      <a href="https://www.linkedin.com/in/ryangormican/">
        <Icon icon="mdi:linkedin" color="#0e76a8" />
      </a>
      <a href="https://github.com/RyanGormican/SimplySolo/">
        <Icon icon="mdi:github" color="#e8eaea" />
      </a>
      <a href="https://ryangormicanportfoliohub.vercel.app/">
        <Icon icon="teenyicons:computer-outline" color="#199c35" />
      </a>
      <div className="cursor-pointer">
        <Icon icon="material-symbols:feedback" />
      </div>
    </span>
  );
}
