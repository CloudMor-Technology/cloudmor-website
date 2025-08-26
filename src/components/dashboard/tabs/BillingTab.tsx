
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calendar } from 'lucide-react';

export const BillingTab = () => {
  const [billingData, setBillingData] = useState({
    totalSpent: '$1,299.00',
    nextBilling: 'Feb 1, 2024',
    balance: '$0.00',
    currentPeriod: 'January 2024'
  });

  const services = [
    { name: 'IT Support', amount: '$699.00' },
    { name: 'Phone System', amount: '$300.00' },
    { name: 'Cloud Backup', amount: '$300.00' }
  ];

  const recentInvoices = [
    { id: 'INV-2024-003', date: '01/15/2024', amount: '$1,299.00', status: 'Paid' },
    { id: 'INV-2023-012', date: '12/15/2023', amount: '$1,299.00', status: 'Paid' },
    { id: 'INV-2023-011', date: '11/15/2023', amount: '$1,199.00', status: 'Paid' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Billing</h2>
        <p className="text-white/70">Manage your billing information and view invoices</p>
      </div>

      {/* Billing Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-3xl font-bold text-blue-600">{billingData.totalSpent}</h3>
            <p className="text-gray-600">Total Spent</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-3xl font-bold text-orange-600">{billingData.nextBilling}</h3>
            <p className="text-gray-600">Next Billing</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <span className="text-2xl">💳</span>
            </div>
            <h3 className="text-3xl font-bold text-green-600">{billingData.balance}</h3>
            <p className="text-gray-600">Current Balance</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Billing Period */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Current Billing Period</CardTitle>
          <span className="text-sm text-gray-500">{billingData.currentPeriod}</span>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-gray-500">Active subscription</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{service.amount}</p>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t-2 border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">Total</p>
                <p className="text-2xl font-bold text-blue-600">{billingData.totalSpent}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Invoices */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Invoices</CardTitle>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInvoices.map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.id}</p>
                    <p className="text-sm text-gray-500">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold">{invoice.amount}</p>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      {invoice.status}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
