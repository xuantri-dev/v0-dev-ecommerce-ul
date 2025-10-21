"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Mail, Phone, MapPin, Calendar, Lock, Gift } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const mockCustomer = {
  firstName: "Alexander",
  lastName: "Sterling",
  email: "alexander.sterling@example.com",
  phone: "+1 (555) 123-4567",
  address: "142 Madison Avenue, New York, NY 10016",
  memberSince: "January 2023",
}

const mockVouchers = [
  {
    id: "V001",
    code: "SPRING20",
    discount: 20,
    type: "percentage",
    description: "20% off spring collection",
    expiryDate: "2024-04-30",
    minPurchase: 100,
    status: "active",
  },
  {
    id: "V002",
    code: "LUXURY50",
    discount: 50,
    type: "fixed",
    description: "$50 off orders over $500",
    expiryDate: "2024-05-15",
    minPurchase: 500,
    status: "active",
  },
  {
    id: "V003",
    code: "WELCOME10",
    discount: 10,
    type: "percentage",
    description: "10% off first purchase",
    expiryDate: "2024-03-31",
    minPurchase: 50,
    status: "expired",
  },
  {
    id: "V004",
    code: "SUMMER15",
    discount: 15,
    type: "percentage",
    description: "15% off summer collection",
    expiryDate: "2024-08-31",
    minPurchase: 150,
    status: "active",
  },
  {
    id: "V005",
    code: "VIP100",
    discount: 100,
    type: "fixed",
    description: "$100 off VIP members",
    expiryDate: "2024-12-31",
    minPurchase: 1000,
    status: "active",
  },
  {
    id: "V006",
    code: "FLASH25",
    discount: 25,
    type: "fixed",
    description: "$25 off flash sale",
    expiryDate: "2024-03-20",
    minPurchase: 200,
    status: "expired",
  },
]

const VOUCHERS_PER_PAGE = 3

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function ProfileContent() {
  const { toast } = useToast()
  const [editFormData, setEditFormData] = useState({
    firstName: mockCustomer.firstName,
    lastName: mockCustomer.lastName,
    email: mockCustomer.email,
    phone: mockCustomer.phone,
    address: mockCustomer.address,
  })

  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [vouchersPage, setVouchersPage] = useState(1)

  const handleEditProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields are filled
    if (
      !editFormData.firstName.trim() ||
      !editFormData.lastName.trim() ||
      !editFormData.email.trim() ||
      !editFormData.phone.trim() ||
      !editFormData.address.trim()
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    if (!validateEmail(editFormData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    })
    setIsEditDialogOpen(false)
  }

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields are filled
    if (
      !passwordFormData.currentPassword.trim() ||
      !passwordFormData.newPassword.trim() ||
      !passwordFormData.confirmPassword.trim()
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      })
      return
    }

    // Validate passwords match
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully.",
    })
    setPasswordFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setIsPasswordDialogOpen(false)
  }

  // Calculate vouchers pagination
  const totalVouchersPages = Math.ceil(mockVouchers.length / VOUCHERS_PER_PAGE)
  const vouchersStartIndex = (vouchersPage - 1) * VOUCHERS_PER_PAGE
  const vouchersEndIndex = vouchersStartIndex + VOUCHERS_PER_PAGE
  const displayedVouchers = mockVouchers.slice(vouchersStartIndex, vouchersEndIndex)

  return (
    <div className="py-16 px-4 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">My Profile</h1>
          <p className="text-muted-foreground text-lg">Manage your account information</p>
        </div>

        <div className="grid gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Your account details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">First Name</Label>
                  <p className="text-lg font-medium">{mockCustomer.firstName}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Last Name</Label>
                  <p className="text-lg font-medium">{mockCustomer.lastName}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <p className="text-lg font-medium">{mockCustomer.email}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <p className="text-lg font-medium">{mockCustomer.phone}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </Label>
                <p className="text-lg font-medium">{mockCustomer.address}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Member Since
                </Label>
                <p className="text-lg font-medium">{mockCustomer.memberSince}</p>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>Update your personal information</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleEditProfileSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={editFormData.firstName}
                          onChange={(e) => setEditFormData({ ...editFormData, firstName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={editFormData.lastName}
                          onChange={(e) => setEditFormData({ ...editFormData, lastName: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      {/* Remove type="email" from email input to disable default HTML validation */}
                      <Input
                        id="email"
                        value={editFormData.email}
                        onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={editFormData.phone}
                        onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={editFormData.address}
                        onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2 justify-end pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto ml-0 sm:ml-2 bg-transparent">
                    Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Change Password
                    </DialogTitle>
                    <DialogDescription>Update your account password</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordFormData.currentPassword}
                        onChange={(e) => setPasswordFormData({ ...passwordFormData, currentPassword: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordFormData.newPassword}
                        onChange={(e) => setPasswordFormData({ ...passwordFormData, newPassword: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordFormData.confirmPassword}
                        onChange={(e) => setPasswordFormData({ ...passwordFormData, confirmPassword: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2 justify-end pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Change Password</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* My Vouchers section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                My Vouchers
              </CardTitle>
              <CardDescription>View and manage your available discount vouchers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {displayedVouchers.length > 0 ? (
                <div className="space-y-3">
                  {displayedVouchers.map((voucher) => (
                    <div key={voucher.id} className="p-4 border rounded-lg hover:bg-secondary/30 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-semibold text-lg">{voucher.code}</p>
                            <Badge
                              variant={voucher.status === "active" ? "default" : "secondary"}
                              className={
                                voucher.status === "active"
                                  ? "bg-green-500 hover:bg-green-600"
                                  : "bg-gray-400 hover:bg-gray-500"
                              }
                            >
                              {voucher.status === "active" ? "Active" : "Expired"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{voucher.description}</p>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Discount: </span>
                              <span className="font-medium">
                                {voucher.type === "percentage"
                                  ? `${voucher.discount}%`
                                  : `$${voucher.discount.toFixed(2)}`}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Min Purchase: </span>
                              <span className="font-medium">${voucher.minPurchase.toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Expires: </span>
                              <span className="font-medium">{voucher.expiryDate}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(voucher.code)
                            toast({
                              title: "Copied",
                              description: `Voucher code ${voucher.code} copied to clipboard.`,
                            })
                          }}
                        >
                          Copy Code
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No vouchers available</p>
              )}

              {totalVouchersPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVouchersPage((prev) => Math.max(1, prev - 1))}
                    disabled={vouchersPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="flex gap-1">
                    {Array.from({ length: totalVouchersPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={vouchersPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setVouchersPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVouchersPage((prev) => Math.min(totalVouchersPages, prev + 1))}
                    disabled={vouchersPage === totalVouchersPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
