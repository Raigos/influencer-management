import { Button } from '@/components/ui/button.tsx'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx'
import { Label } from '@/components/ui/label.tsx'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select.tsx'
import { useEffect, useState } from 'react'
import { useManagerAssignment } from '@/hooks/useManager.ts'
import { ManagerId, UUID } from '@influencer-management/shared/src'
import { useManagerRemoval } from '@/hooks/useManagerRemoval.ts'
import { ManagerBase, ManagerDetails } from '@/types/influencerSearch.tsx'
import { toast } from '@/hooks/use-toast.ts'

interface ModalProps {
  currentManager: ManagerDetails | null
  managers: ManagerBase[]
  influencerId: UUID
}

export function Modal({ currentManager, managers, influencerId }: ModalProps) {
  const [selectedManager, setSelectedManager] = useState<UUID | null>(currentManager?.id ?? null)
  const [isOpen, setIsOpen] = useState(false)

  const { mutate: assignManager, isPending: isAssigning } = useManagerAssignment(influencerId)
  const { mutate: removeManager, isPending: isRemoving } = useManagerRemoval(influencerId)

  const currentManagerDetails = managers.find(m => m.id === selectedManager)

  const handleManagerSelect = (value: string) => {
    setSelectedManager(value === 'no-manager' ? null : (value as UUID))
  }

  useEffect(() => {
    if (!isOpen) {
      setSelectedManager(currentManager?.id ?? null)
    }
  }, [isOpen, currentManager])

  const handleSave = async () => {
    if (selectedManager) {
      const managerId: ManagerId = { managerId: selectedManager as UUID }

      assignManager(managerId, {
        onSuccess: () => {
          setIsOpen(false)
          toast({
            title: 'Success',
            description: `Successfully changed manager to ${currentManagerDetails?.firstName} ${currentManagerDetails?.lastName}`,
          })
        },
        onError: (error: Error) => {
          console.error('Failed to assign manager:', error)
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to update manager! Please try again.',
          })
        },
      })
    } else if (selectedManager === null) {
      removeManager(undefined, {
        onSuccess: () => {
          setIsOpen(false)
          toast({
            title: 'Success',
            description: `Manager ${currentManager?.firstName} ${currentManager?.lastName} has been removed.`,
          })
        },
        onError: (error: Error) => {
          toast({
            variant: 'destructive',
            title: 'Failed to Remove Manager',
            description: error.message || 'Please try again or contact support if the problem persists.',
          })
        },
      })
    }
  }
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button>Edit Manager</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Manager</DialogTitle>
          <DialogDescription>Make changes to your influencer's manager here</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 justify-start">
          <div className="grid  grid-cols-[auto_1fr] items-center gap-4 justify-start">
            <Label
              htmlFor="name"
              className="text-right"
            >
              Manager
            </Label>
            <Select
              value={selectedManager ?? 'no-manager'}
              onValueChange={handleManagerSelect}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue>
                  {currentManagerDetails ? `${currentManagerDetails.firstName} ${currentManagerDetails.lastName}` : 'No manager'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Managers</SelectLabel>
                  {managers.map(manager => (
                    <SelectItem
                      key={manager.id}
                      value={manager.id}
                    >
                      {manager.firstName} {manager.lastName}
                    </SelectItem>
                  ))}
                  <SelectItem value="no-manager">No manager</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={isAssigning || isRemoving}
            className="relative"
          >
            {isAssigning || isRemoving ? (
              <>
                <span className="opacity-0">Save</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                </div>
              </>
            ) : (
              'Save'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
