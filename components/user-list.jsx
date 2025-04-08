"use client"

import { useState } from "react"
import { Ban, Check, MoreHorizontal, UserCog } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock user data
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "User",
    status: "Online",
    lastActive: "Just now",
    registeredDate: "Jan 12, 2023",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Admin",
    status: "Online",
    lastActive: "5 minutes ago",
    registeredDate: "Mar 5, 2023",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "User",
    status: "Offline",
    lastActive: "2 hours ago",
    registeredDate: "Apr 18, 2023",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "User",
    status: "Offline",
    lastActive: "1 day ago",
    registeredDate: "Jun 22, 2023",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "Moderator",
    status: "Online",
    lastActive: "Just now",
    registeredDate: "Aug 3, 2023",
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    role: "User",
    status: "Offline",
    lastActive: "3 days ago",
    registeredDate: "Oct 15, 2023",
  },
  {
    id: 7,
    name: "David Miller",
    email: "david.miller@example.com",
    role: "User",
    status: "Online",
    lastActive: "30 minutes ago",
    registeredDate: "Nov 7, 2023",
  },
]

export function UserList({ searchQuery }) {
  const [selectedUser, setSelectedUser] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [suspendedUsers, setSuspendedUsers] = useState([])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewDetails = (user) => {
    setSelectedUser(user)
    setIsDialogOpen(true)
  }

  const handleSuspendUser = (userId) => {
    if (suspendedUsers.includes(userId)) {
      setSuspendedUsers(suspendedUsers.filter((id) => id !== userId))
    } else {
      setSuspendedUsers([...suspendedUsers, userId])
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Registered Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id} className={suspendedUsers.includes(user.id) ? "opacity-50" : ""}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Badge variant={user.status === "Online" ? "success" : "secondary"}>
                  {user.status === "Online" ? <Check className="mr-1 h-3 w-3" /> : <Ban className="mr-1 h-3 w-3" />}
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.lastActive}</TableCell>
              <TableCell>{user.registeredDate}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                      <UserCog className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSuspendUser(user.id)}>
                      <Ban className="mr-2 h-4 w-4" />
                      {suspendedUsers.includes(user.id) ? "Unsuspend User" : "Suspend User"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Detailed information about the selected user.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Name:</span>
                <span className="col-span-3">{selectedUser.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Email:</span>
                <span className="col-span-3">{selectedUser.email}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Role:</span>
                <span className="col-span-3">{selectedUser.role}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Status:</span>
                <span className="col-span-3">
                  <Badge variant={selectedUser.status === "Online" ? "success" : "secondary"}>
                    {selectedUser.status}
                  </Badge>
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Last Active:</span>
                <span className="col-span-3">{selectedUser.lastActive}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Registered:</span>
                <span className="col-span-3">{selectedUser.registeredDate}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium">Status:</span>
                <span className="col-span-3">
                  {suspendedUsers.includes(selectedUser.id) ? (
                    <Badge variant="destructive">Suspended</Badge>
                  ) : (
                    <Badge variant="success">Active</Badge>
                  )}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
