import { Input } from '@/components/ui/input.tsx'
import { Label } from '@/components/ui/label.tsx'
import { MAX_NAME_LENGTH } from '@influencer-management/shared/'
import { cn } from '@/lib/utils.ts'

interface NameFieldsProps {
  firstName: string
  lastName: string
  onInputChange: (field: 'firstName' | 'lastName', value: string) => void
}

export function NameFields({ firstName, lastName, onInputChange }: NameFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={firstName}
          onChange={e => onInputChange('firstName', e.target.value)}
          placeholder="First Name"
          required
          maxLength={MAX_NAME_LENGTH}
        />
        <div className={cn('text-xs text-muted-foreground', firstName.length >= MAX_NAME_LENGTH && 'text-destructive')}>
          {firstName.length}/{MAX_NAME_LENGTH} characters
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={lastName}
          onChange={e => onInputChange('lastName', e.target.value)}
          placeholder="Last Name"
          required
          maxLength={MAX_NAME_LENGTH}
        />
        <div className={cn('text-xs text-muted-foreground', lastName.length >= MAX_NAME_LENGTH && 'text-destructive')}>
          {lastName.length}/{MAX_NAME_LENGTH} characters
        </div>
      </div>
    </div>
  )
}
