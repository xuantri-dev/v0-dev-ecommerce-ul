"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, MapPin, Calendar, Package } from "lucide-react"

const mockCustomer = {
  firstName: "Alexander",
  lastName: "Sterling",
  email: "alexander.sterling@example.com",
  phone: "+1 (555) 123-4567",
  address: "142 Madison Avenue, New York, NY 10016",
  memberSince: "January 2023",
  orderHistory: [
    {
      id: "ORD-2024-001",
      date: "March 15, 2024",
      total: "$1,245.00",
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-2024-002",
      date: "February 8, 2024",
      total: "$890.00",
      status: "Delivered",
      items: 2,
    },
    {
      id: "ORD-2023-045",
      date: "December 20, 2023",
      total: "$2,150.00",
      status: "Delivered",
      items: 5,
    },
  ],
}

export function ProfileContent() {
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order History
              </CardTitle>
              <CardDescription>View your past orders and track current shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCustomer.orderHistory.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="space-y-1 mb-3 sm:mb-0">
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                      <p className="text-sm text-muted-foreground">{order.items} items</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{order.total}</p>
                        <p className="text-sm text-green-600">{order.status}</p>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
