import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/Components/ui/dialog"
import { Button } from "@/Components/ui/button"
import { router } from '@inertiajs/react'

interface LogoutDialogProps {
  children: React.ReactNode;
}

export function LogoutDialog({ children }: LogoutDialogProps) {
  const [open, setOpen] = React.useState(false)

  const handleLogout = () => {
    router.post('/auth/logout', {}, {
      onSuccess: () => {
        setOpen(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to logout? You'll need to login again to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
