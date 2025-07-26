import React from 'react';
import FloatingLabelInput from './FloatingLabelInput';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const BillToSection = ({ billTo, handleInputChange, selectedCurrency, setSelectedCurrency }) => {
  return (
    <div className="mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Select Currency</h3>
        <RadioGroup
          value={selectedCurrency}
          onValueChange={setSelectedCurrency}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="INR" id="inr" />
            <Label htmlFor="inr">INR (₹)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="USD" id="usd" />
            <Label htmlFor="usd">USD ($)</Label>
          </div>
        </RadioGroup>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Bill To</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingLabelInput
          id="billToName"
          label="Customer Name"
          value={billTo.name}
          onChange={handleInputChange}
          name="name"
        />
        <FloatingLabelInput
          id="billToPhone"
          label="Phone Number"
          value={billTo.phone}
          onChange={handleInputChange}
          name="phone"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <FloatingLabelInput
          id="billToEmail"
          label="Email Address"
          type="email"
          value={billTo.email || ''}
          onChange={handleInputChange}
          name="email"
          placeholder="customer@example.com"
        />
        <FloatingLabelInput
          id="billToGst"
          label="GST Number (Optional)"
          value={billTo.gst || ''}
          onChange={handleInputChange}
          name="gst"
          placeholder="22AAAAA0000A1Z5 (Optional)"
        />
      </div>
      <FloatingLabelInput
        id="billToAddress"
        label="Billing Address"
        value={billTo.address}
        onChange={handleInputChange}
        name="address"
        className="mt-4"
        placeholder="Street, City, State, PIN Code"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <FloatingLabelInput
          id="billToCity"
          label="City"
          value={billTo.city || ''}
          onChange={handleInputChange}
          name="city"
        />
        <FloatingLabelInput
          id="billToState"
          label="State"
          value={billTo.state || ''}
          onChange={handleInputChange}
          name="state"
        />
        <FloatingLabelInput
          id="billToPincode"
          label="PIN Code"
          value={billTo.pincode || ''}
          onChange={handleInputChange}
          name="pincode"
          pattern="[0-9]{6}"
        />
      </div>
    </div>
  );
};

export default BillToSection;