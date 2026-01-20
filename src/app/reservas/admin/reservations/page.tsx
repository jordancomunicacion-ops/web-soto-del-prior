"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import { useEffect, useState } from "react"
import { MockApi, Reservation } from "@/lib/mock-api"

export default function ReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>([])

    useEffect(() => {
        MockApi.getReservations().then(setReservations)
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Reservations</h1>
                <Button>New Reservation</Button>
            </div>
            <div className="rounded-md border p-4 bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Pax</TableHead>
                            <TableHead>Venue</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reservations.map((res) => (
                            <TableRow key={res.id}>
                                <TableCell className="font-medium">{res.id}</TableCell>
                                <TableCell>{res.customerName}</TableCell>
                                <TableCell>{res.date}</TableCell>
                                <TableCell>{res.time}</TableCell>
                                <TableCell>{res.pax}</TableCell>
                                <TableCell>{res.venueId}</TableCell>
                                <TableCell>{res.status}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
