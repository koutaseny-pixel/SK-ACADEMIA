"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { Modal } from "@/components/ui/Modal";
import { Table, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import { Mail, ArrowRight, Download, Search, Check } from "lucide-react";

export default function DesignSystem() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-4xl font-black text-[#1b508f]">SK Academia - Design System</h1>
          <p className="mt-4 text-lg text-gray-600">
            A comprehensive UI kit showcasing all reusable components, typography, colors, and patterns used across the platform.
          </p>
        </div>

        {/* 1. Color Palette */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-[#1b508f] shadow-sm flex items-end p-3"><span className="text-white font-mono text-sm">#1b508f</span></div>
              <p className="font-bold text-sm text-gray-700">Primary Blue</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-[#f97316] shadow-sm flex items-end p-3"><span className="text-white font-mono text-sm">#f97316</span></div>
              <p className="font-bold text-sm text-gray-700">Accent Orange</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-gray-900 shadow-sm flex items-end p-3"><span className="text-white font-mono text-sm">#111827</span></div>
              <p className="font-bold text-sm text-gray-700">Text Dark</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-lg bg-gray-50 border border-gray-200 shadow-sm flex items-end p-3"><span className="text-gray-900 font-mono text-sm">#f9fafb</span></div>
              <p className="font-bold text-sm text-gray-700">Background</p>
            </div>
          </div>
        </section>

        {/* 2. Typography */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Typography</h2>
          <div className="bg-white p-8 rounded-xl border border-gray-200 space-y-6">
            <div>
              <h1 className="text-5xl font-black text-gray-900">Heading 1 (5xl, Black)</h1>
              <p className="text-sm text-gray-500 mt-1">Used for main page titles and hero sections.</p>
            </div>
            <hr className="border-gray-100" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Heading 2 (3xl, Bold)</h2>
              <p className="text-sm text-gray-500 mt-1">Used for section headers.</p>
            </div>
            <hr className="border-gray-100" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Heading 3 (xl, Semibold)</h3>
              <p className="text-sm text-gray-500 mt-1">Used for card titles and subsections.</p>
            </div>
            <hr className="border-gray-100" />
            <div>
              <p className="text-base text-gray-700">
                <strong>Body Text:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Buttons */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Buttons</h2>
          <div className="bg-white p-8 rounded-xl border border-gray-200 space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Sizes & States</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
                <Button isLoading>Loading</Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">With Icons</h3>
              <div className="flex flex-wrap gap-4">
                <Button leftIcon={<Mail size={18} />}>Email Me</Button>
                <Button variant="outline" rightIcon={<ArrowRight size={18} />}>Next Step</Button>
                <Button variant="secondary" className="px-3"><Search size={18} /></Button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Forms */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Forms & Inputs</h2>
          <div className="bg-white p-8 rounded-xl border border-gray-200 max-w-md space-y-6">
            <Input 
              label="Standard Input" 
              placeholder="Enter your name" 
            />
            <Input 
              label="With Icon" 
              placeholder="you@example.com" 
              type="email"
              leftIcon={<Mail size={18} />} 
            />
            <Input 
              label="With Error State" 
              placeholder="Password" 
              type="password"
              error="Password must be at least 8 characters long." 
            />
          </div>
        </section>

        {/* 5. Alerts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Alerts</h2>
          <div className="bg-white p-8 rounded-xl border border-gray-200 space-y-4">
            <Alert type="info" title="Information">
              This is a standard informational message for the user.
            </Alert>
            <Alert type="success" title="Success!">
              Your payment has been processed successfully.
            </Alert>
            <Alert type="warning" title="Warning">
              Your subscription will expire in 3 days.
            </Alert>
            <Alert type="error" title="Error">
              Failed to connect to the database. Please try again later.
            </Alert>
          </div>
        </section>

        {/* 6. Modals */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Modals</h2>
          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <Button onClick={() => setIsModalOpen(true)}>Open Modal Dialog</Button>
            
            <Modal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)}
              title="Confirm Action"
              footer={
                <div className="flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" onClick={() => setIsModalOpen(false)}>Confirm</Button>
                </div>
              }
            >
              <p className="text-gray-600">
                Are you sure you want to perform this action? This operation cannot be undone and will permanently delete the selected items from the database.
              </p>
            </Modal>
          </div>
        </section>

        {/* 7. Tables */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Tables (Dashboard Ready)</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <tbody>
              <TableRow>
                <TableCell className="font-medium text-gray-900">#ORD-001</TableCell>
                <TableCell>Mamadou Ndiaye</TableCell>
                <TableCell>Oct 24, 2026</TableCell>
                <TableCell>15 000 CFA</TableCell>
                <TableCell><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">PAID</span></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-gray-900">#ORD-002</TableCell>
                <TableCell>Fatou Diop</TableCell>
                <TableCell>Oct 23, 2026</TableCell>
                <TableCell>5 000 CFA</TableCell>
                <TableCell><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">PENDING</span></TableCell>
              </TableRow>
            </tbody>
          </Table>
        </section>

      </div>
    </div>
  );
}
