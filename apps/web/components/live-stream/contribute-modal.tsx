import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"

export function ContributeModal({ isOpen, onClose }:{
    isOpen: boolean
    onClose: () => void
}) {
  const [amount, setAmount] = useState('')

  const handleContribute = (e:any) => {
    e.preventDefault()
    // Handle contribution logic here
    console.log(`Contributing ${amount}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Contribute to the Project</DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter the amount you'd like to contribute to support this project.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleContribute}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3 bg-gray-700 text-white border-gray-600"
                placeholder="Enter amount"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              Contribute
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}