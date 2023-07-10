import Image from 'next/image'

export function WebsiteLogo() {
  return (
    <div className="flex items-baseline group">
      <span className="font-semibold opacity-80">Isling</span>
      <Image
        className="group-hover:animate-ping ml-0.5"
        src="/favicon.ico"
        width={10}
        height={10}
        alt="Isling Play"
        unoptimized
      />
      <span className="ml-0.5 text-xs font-normal text-primary-light font-mono">
        IoT
      </span>
    </div>
  )
}
