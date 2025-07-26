import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';

const Template10 = ({ data }) => {
  const { billTo, shipTo, invoice, yourCompany, items, taxPercentage, taxAmount, subTotal, grandTotal, notes, selectedCurrency, logo } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 max-w-4xl mx-auto">
        {/* Header with Company Logo Space */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            {logo ? (
              <img 
                src={logo} 
                alt="Company Logo" 
                className="w-24 h-24 object-contain mb-4 rounded-lg"
              />
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">{yourCompany.name?.charAt(0) || 'C'}</span>
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-800">{yourCompany.name}</h1>
            <p className="text-gray-600">{yourCompany.address}</p>
            <p className="text-gray-600">{yourCompany.phone}</p>
            {yourCompany.email && <p className="text-gray-600">{yourCompany.email}</p>}
            {yourCompany.website && <p className="text-gray-600">{yourCompany.website}</p>}
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-bold text-purple-600 mb-2">INVOICE</h2>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-sm text-gray-600">Invoice Number</p>
              <p className="font-bold text-lg">{invoice.number}</p>
              <p className="text-sm text-gray-600 mt-2">Invoice Date</p>
              <p className="font-semibold">{invoice.date}</p>
              <p className="text-sm text-gray-600 mt-2">Due Date</p>
              <p className="font-semibold">{invoice.paymentDate}</p>
            </div>
          </div>
        </div>

        {/* Bill To / Ship To Section */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-purple-600 text-lg mb-3 border-b border-purple-200 pb-2">BILL TO</h3>
            <p className="font-semibold text-gray-800">{billTo.name}</p>
            <p className="text-gray-600">{billTo.address}</p>
            <p className="text-gray-600">{billTo.phone}</p>
            {billTo.email && <p className="text-gray-600">{billTo.email}</p>}
            {billTo.gst && <p className="text-gray-600">GST: {billTo.gst}</p>}
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-blue-600 text-lg mb-3 border-b border-blue-200 pb-2">SHIP TO</h3>
            <p className="font-semibold text-gray-800">{shipTo.name || billTo.name}</p>
            <p className="text-gray-600">{shipTo.address || billTo.address}</p>
            <p className="text-gray-600">{shipTo.phone || billTo.phone}</p>
            {shipTo.email && <p className="text-gray-600">{shipTo.email}</p>}
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <th className="p-4 text-left">Item Description</th>
                <th className="p-4 text-center">HSN/SAC</th>
                <th className="p-4 text-center">Qty</th>
                <th className="p-4 text-right">Rate</th>
                <th className="p-4 text-right">Tax %</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-4">
                    <div className="font-semibold text-gray-800">{item.name}</div>
                    {item.description && (
                      <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                    )}
                  </td>
                  <td className="p-4 text-center text-gray-600">{item.hsn || '-'}</td>
                  <td className="p-4 text-center font-semibold">{item.quantity}</td>
                  <td className="p-4 text-right font-semibold">
                    {formatCurrency(item.amount, selectedCurrency)}
                  </td>
                  <td className="p-4 text-center text-gray-600">{item.taxRate || taxPercentage}%</td>
                  <td className="p-4 text-right font-bold text-purple-600">
                    {formatCurrency(item.total, selectedCurrency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end mb-8">
          <div className="w-80">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">{formatCurrency(subTotal, selectedCurrency)}</span>
                </div>
                {taxPercentage > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax ({taxPercentage}%):</span>
                    <span className="font-semibold">{formatCurrency(taxAmount, selectedCurrency)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold text-gray-800">Total:</span>
                    <span className="text-xl font-bold text-purple-600">
                      {formatCurrency(grandTotal, selectedCurrency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        {notes && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3">Notes & Terms:</h3>
            <p className="text-gray-600 leading-relaxed">{notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Thank you for your business!</p>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template10;