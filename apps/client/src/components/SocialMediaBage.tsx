import instagramIcon from '@/assets/instagram.svg'
import tiktokIcon from '@/assets/tiktok.svg'

interface SocialMediaBadgeProps {
  platform: string
  username: string
}

export const SocialMediaBadge = ({ platform, username }: SocialMediaBadgeProps) => {
  const isInstagram = platform.toLowerCase() === 'instagram'
  const icon = isInstagram ? instagramIcon : tiktokIcon

  return (
    <div
      role="status"
      aria-label={`${platform} account: ${username}`}
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
        isInstagram ? 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] text-white' : 'bg-[#000000] text-white'
      }`}
    >
      <img
        src={icon}
        alt="" // We move the alt text to aria-label above
        className="w-3.5 h-3.5 mr-1.5"
        aria-hidden="true"
      />
      <span>{username}</span>
    </div>
  )
}
