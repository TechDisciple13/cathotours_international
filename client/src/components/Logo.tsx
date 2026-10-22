import { Link } from 'react-router-dom'
import ImageSlot from './ImageSlot'

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <ImageSlot
        src="/assets/images/logo-catho-tours.png"
        alt=""
        label="Logo"
        className="size-9 shrink-0 rounded-full object-contain md:size-10 lg:size-14"
      />
      <span className="text-[13px] font-semibold leading-tight text-brand-green md:text-[15px] lg:text-[20px]">
        Catho Tours
        <br />
        International
      </span>
    </Link>
  )
}
