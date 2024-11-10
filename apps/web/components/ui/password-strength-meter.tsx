import { useState, useEffect } from 'react'
import { Progress } from "./progress"

export function PasswordStrengthMeter({ password }: { password: string }) {
  const [strength, setStrength] = useState(0)

  useEffect(() => {
    const calculateStrength = () => {
      let score = 0
      if (password.length > 6) score++
      if (password.length > 10) score++
      if (/[A-Z]/.test(password)) score++
      if (/[0-9]/.test(password)) score++
      if (/[^A-Za-z0-9]/.test(password)) score++
      setStrength((score / 5) * 100)
    }

    calculateStrength()
  }, [password])

  const getColor = () => {
    if (strength < 33) return 'bg-red-500'
    if (strength < 66) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="space-y-2">
      <Progress value={strength} className={`w-full h-2 ${getColor()}`} />
      <p className="text-sm text-muted-foreground">
        Password strength: {strength < 33 ? 'Weak' : strength < 66 ? 'Medium' : 'Strong'}
      </p>
    </div>
  )
}