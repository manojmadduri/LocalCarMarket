import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign, Calendar, Percent } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface PaymentCalculatorProps {
  vehiclePrice: string;
}

interface PaymentResult {
  vehiclePrice: number;
  downPayment: number;
  tradeInValue: number;
  loanAmount: number;
  interestRate: number;
  loanTermMonths: number;
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  downPaymentPercent: string;
  aprEstimate: number;
}

export default function PaymentCalculator({ vehiclePrice }: PaymentCalculatorProps) {
  const [downPayment, setDownPayment] = useState("");
  const [tradeInValue, setTradeInValue] = useState("");
  const [interestRate, setInterestRate] = useState("5.99");
  const [loanTermMonths, setLoanTermMonths] = useState("60");
  const [result, setResult] = useState<PaymentResult | null>(null);

  const calculatePaymentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/calculate-payment", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        throw new Error("Failed to calculate payment");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
    onError: (error) => {
      console.error("Payment calculation error:", error);
    }
  });

  const handleCalculate = () => {
    calculatePaymentMutation.mutate({
      vehiclePrice: parseFloat(vehiclePrice.replace(/[^0-9.]/g, "")),
      downPayment: parseFloat(downPayment) || 0,
      tradeInValue: parseFloat(tradeInValue) || 0,
      interestRate: parseFloat(interestRate),
      loanTermMonths: parseInt(loanTermMonths)
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          Payment Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="downPayment" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Down Payment
            </Label>
            <Input
              id="downPayment"
              type="number"
              placeholder="0"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tradeInValue" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Trade-in Value
            </Label>
            <Input
              id="tradeInValue"
              type="number"
              placeholder="0"
              value={tradeInValue}
              onChange={(e) => setTradeInValue(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate" className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Interest Rate (APR)
            </Label>
            <Input
              id="interestRate"
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanTerm" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Loan Term
            </Label>
            <Select value={loanTermMonths} onValueChange={setLoanTermMonths}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="36">36 months</SelectItem>
                <SelectItem value="48">48 months</SelectItem>
                <SelectItem value="60">60 months</SelectItem>
                <SelectItem value="72">72 months</SelectItem>
                <SelectItem value="84">84 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleCalculate} 
          className="w-full"
          disabled={calculatePaymentMutation.isPending}
        >
          {calculatePaymentMutation.isPending ? "Calculating..." : "Calculate Payment"}
        </Button>

        {/* Results */}
        {result && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Payment Breakdown</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle Price:</span>
                  <span className="font-semibold">{formatCurrency(result.vehiclePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Down Payment:</span>
                  <span className="font-semibold">{formatCurrency(result.downPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trade-in Value:</span>
                  <span className="font-semibold">{formatCurrency(result.tradeInValue)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-semibold">{formatCurrency(result.loanAmount)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-semibold">{result.interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Term:</span>
                  <span className="font-semibold">{result.loanTermMonths} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Interest:</span>
                  <span className="font-semibold">{formatCurrency(result.totalInterest)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Total Payments:</span>
                  <span className="font-semibold">{formatCurrency(result.totalPayments)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-100 rounded text-center">
              <div className="text-sm text-blue-700">Estimated Monthly Payment</div>
              <div className="text-2xl font-bold text-blue-900">
                {formatCurrency(result.monthlyPayment)}/mo
              </div>
            </div>

            <div className="mt-3 text-xs text-gray-500 text-center">
              * This is an estimate. Actual rates may vary based on credit score and other factors.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}