import React from 'react';
import FloatingLabelInput from './FloatingLabelInput';
import { Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { formatCurrency, getCurrencySymbol } from '../utils/formatCurrency.js';

const ItemDetails = ({ items, handleItemChange, addItem, removeItem, currencyCode: propCurrencyCode }) => {
  let currencyCode = propCurrencyCode;
  if (!currencyCode) {
    console.warn("Warning: currencyCode prop not provided to ItemDetails. Defaulting to 'INR'.");
    currencyCode = 'INR';
  }
  const currencySymbol = getCurrencySymbol(currencyCode);

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Item Details</h2>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-4 relative">
            {/* Item Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Item #{index + 1}</span>
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeItem(index)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>

            {/* Main Item Info - 2 rows */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3">
              <FloatingLabelInput
                id={`itemName${index}`}
                label="Item Name"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                placeholder="Enter item name"
              />
              <FloatingLabelInput
                id={`itemDescription${index}`}
                label="Description"
                value={item.description}
                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                placeholder="Item description (optional)"
              />
            </div>

            {/* Quantity, Unit, Rate, Total - Compact Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
              <FloatingLabelInput
                id={`itemQuantity${index}`}
                label="Qty"
                type="number"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
              />
              <FloatingLabelInput
                id={`itemUnit${index}`}
                label="Unit"
                value={item.unit || 'pcs'}
                onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                placeholder="pcs"
              />
              <FloatingLabelInput
                id={`itemAmount${index}`}
                label={`Rate (${currencySymbol})`}
                type="number"
                step="0.01"
                value={item.amount}
                onChange={(e) => handleItemChange(index, 'amount', parseFloat(e.target.value) || 0)}
                min="0"
              />
              <FloatingLabelInput
                id={`itemTotal${index}`}
                label={`Total (${currencySymbol})`}
                type="number"
                value={(item.quantity * item.amount).toFixed(2)}
                disabled
                className="bg-white font-medium"
              />
            </div>

            {/* Additional Details - Collapsible */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <FloatingLabelInput
                id={`itemHsn${index}`}
                label="HSN/SAC (Optional)"
                value={item.hsn || ''}
                onChange={(e) => handleItemChange(index, 'hsn', e.target.value)}
                placeholder="e.g., 8517"
              />
              <FloatingLabelInput
                id={`itemTaxRate${index}`}
                label="Tax % (Optional)"
                type="number"
                value={item.taxRate || ''}
                onChange={(e) => handleItemChange(index, 'taxRate', parseFloat(e.target.value) || 0)}
                placeholder="18"
                min="0"
                max="28"
              />
              <FloatingLabelInput
                id={`itemDiscount${index}`}
                label="Discount % (Optional)"
                type="number"
                value={item.discount || ''}
                onChange={(e) => handleItemChange(index, 'discount', parseFloat(e.target.value) || 0)}
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
          </div>
        ))}
      </div>

      <Button 
        type="button" 
        onClick={addItem} 
        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        + Add New Item
      </Button>
    </div>
  );
};

export default ItemDetails;
