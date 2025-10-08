"use client"

import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react"

export function ProfileContent() {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-secondary/30 py-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
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
                  <p className="text-lg font-medium">{user.firstName}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Last Name</Label>
                  <p className="text-lg font-medium">{user.lastName}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <p className="text-lg font-medium">{user.email}</p>
              </div>

              {user.phone && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <p className="text-lg font-medium">{user.phone}</p>
                </div>
              )}

              {user.address && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Address
                  </Label>
                  <p className="text-lg font-medium">{user.address}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Member Since
                </Label>
                <p className="text-lg font-medium">{user.memberSince}</p>
              </div>
            </CardContent>
          </Card>

          {/* Order History */}
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders and track current shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't placed any orders yet</p>
                <Button asChild>
                  <a href="/shop">Start Shopping</a>
                </Button>
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
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full sm:w-auto ml-0 sm:ml-2 bg-transparent">
                Change Password
              </Button>
              <div className="pt-4 border-t">
                <Button variant="destructive" onClick={logout} className="w-full sm:w-auto">
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
