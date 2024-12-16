import { Heart } from 'lucide-react'
import { emailBody, emailSubject } from '@/constants/email.ts'
import '@/styles/animations.css'

const handleClick = () => {
  window.open('https://linkedin.com/in/raigo-tuulik', '_blank')
  window.location.href = `mailto:raigo.tuulik@gmail.com?subject=${emailSubject}&body=${emailBody}`
}

export const Footer = () => {
  return (
    <footer className="w-full py-4 bg-white border-t">
      <div className="max-w-md mx-auto flex items-center justify-center gap-3">
        <span className="text-sm text-gray-600">Made with</span>
        <Heart className="heartbeat w-4 h-4 text-red-400" />
        by
        <button
          onClick={handleClick}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        >
          Raigo Tuulik
        </button>
      </div>
    </footer>
  )
}
