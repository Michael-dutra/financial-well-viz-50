import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function FinancialPlanMockup() {
  const [incomeOpen, setIncomeOpen] = useState(false);
  const [expensesOpen, setExpensesOpen] = useState(false);
  const [monthlyIncomeNeeded, setMonthlyIncomeNeeded] = useState([7500]);

  // --- Sample Data (replace with real client data) ---
  const liabilitiesData = [
    { name: "Mortgage", value: 380000 },
    { name: "LOC", value: 20000 },
  ];
  const assetsData = [
    { name: "Real Estate", value: 1200000 },
    { name: "Investments", value: 650000 },
    { name: "Business", value: 800000 },
    { name: "Cash", value: 60000 },
  ];
  const incomeBreakdown = [
    { name: "John's Salary", value: 90000 },
    { name: "Mary's Salary", value: 75000 },
    { name: "Business Income", value: 30000 },
  ];
  
  const expenseBreakdown = [
    { name: "Mortgage", value: 2400 },
    { name: "Utilities", value: 350 },
    { name: "Insurance", value: 800 },
    { name: "Food & Groceries", value: 1200 },
    { name: "Transportation", value: 900 },
    { name: "Entertainment", value: 600 },
    { name: "Other", value: 1250 },
  ];

  const totalIncome = incomeBreakdown.reduce((s, i) => s + i.value, 0);
  const totalExpenses = expenseBreakdown.reduce((s, e) => s + e.value, 0);

  // Estate (illustrative): future values & estimated tax due
  const estateTaxRows = [
    { asset: "RRSP/RRIF", fv: 550000, estTax: 275000 },
    { asset: "Non-Registered Investments", fv: 820000, estTax: 123000 },
    { asset: "Secondary Property", fv: 950000, estTax: 142500 },
    { asset: "Private Corp Shares", fv: 1200000, estTax: 180000 },
  ];

  const COLORS = ["hsl(var(--financial-blue))", "hsl(var(--financial-green))", "hsl(var(--financial-amber))", "hsl(var(--financial-purple))", "hsl(var(--financial-red))"];

  const totalAssets = assetsData.reduce((s, a) => s + a.value, 0);
  const totalLiabilities = liabilitiesData.reduce((s, l) => s + l.value, 0);
  const netWorth = totalAssets - totalLiabilities;
  const estateTotals = estateTaxRows.reduce(
    (acc, r) => ({ fv: acc.fv + r.fv, tax: acc.tax + r.estTax }),
    { fv: 0, tax: 0 }
  );

  // Monthly conversions
  const monthlyIncome = Math.round(totalIncome / 12);
  const monthlyExpenses = Math.round(totalExpenses / 12);
  const monthlySurplus = monthlyIncome - monthlyExpenses;

  // Calculate retirement progress based on slider value
  const currentRetirementCapacity = 5400; // Estimated monthly income they can generate at 60
  const retirementProgress = Math.min((currentRetirementCapacity / monthlyIncomeNeeded[0]) * 100, 100);

  const monthlyIncomeBreakdown = incomeBreakdown.map(item => ({
    ...item,
    value: Math.round(item.value / 12)
  }));

  const monthlyExpenseBreakdown = expenseBreakdown.map(item => ({
    ...item,
    value: Math.round(item.value / 12)
  }));

  // Secondary will savings calc
  const secondaryWillSavings = Math.round(0.015 * 1200000);

  // Insurance coverage data
  const insuranceData = [
    {
      type: "Term Life",
      current: 500000,
      recommended: 1000000,
      gap: 500000,
      unit: "$",
      reasons: [
        "Cover mortgage balance (~$380,000)",
        "Provide education funding for 2 children", 
        "Income bridge for Mary if John passes"
      ]
    },
    {
      type: "Critical Illness", 
      current: 0,
      recommended: 250000,
      gap: 250000,
      unit: "$",
      reasons: [
        "Lump-sum buffer during treatment/recovery",
        "Offset lost income during illness",
        "Provide flexibility for medical/travel costs"
      ]
    },
    {
      type: "Disability",
      current: 3000,
      recommended: 5000, 
      gap: 2000,
      unit: "$",
      suffix: "/month",
      reasons: [
        "Replace ~60–70% of income if unable to work",
        "Maintain household expenses during disability",
        "Protect retirement contributions"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-financial bg-clip-text text-transparent">
            Financial Plan Overview
          </h1>
          <p className="text-muted-foreground text-lg">Comprehensive financial assessment and recommendations</p>
        </div>

        <div className="grid gap-6">
          {/* Briefing Summary */}
          <Card className="shadow-card bg-gradient-card border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-foreground">Client Briefing Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Executive Summary */}
              <div className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  <strong>John and Mary Smith, both age 45, Ontario residents with two children.</strong> Goals include funding education, retiring at 60 with $90,000 annual income, and purchasing a cottage in 10 years. Current financial health shows strong net worth with targeted optimization opportunities across multiple areas.
                </p>
              </div>

              {/* Category Recommendations */}
              <div className="grid gap-4">
                
                {/* Insurance Card */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-foreground flex items-center gap-2">
                      🛡️ Insurance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Critical gap: Only $500K life insurance vs. recommended $1M ($500K shortfall)</li>
                      <li>• Add $250K critical illness coverage (currently $0) for income protection</li>
                      <li>• Review disability coverage to ensure $2,000/month gap is addressed</li>
                      <li>• Estimated cost for full recommended coverage: ~$200/month</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Retirement Card */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-foreground flex items-center gap-2">
                      🎯 Retirement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Current trajectory: $5,400/month at age 60 vs. target $7,500/month</li>
                      <li>• Gap of $2,100/month requires additional $850/month in savings</li>
                      <li>• Prioritize maximizing RRSP room: John $18K, Mary $12K annually</li>
                      <li>• Consider corporate investment strategies to optimize tax-deferred growth</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Estate Planning Card */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-foreground flex items-center gap-2">
                      📋 Estate Planning
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Current estate value $3.52M with potential $720,500 final tax bill</li>
                      <li>• Secondary will strategy could save ~$18,000 in probate fees</li>
                      <li>• Joint ownership restructuring potential savings: $180,000</li>
                      <li>• Priority actions: Update beneficiaries, implement income splitting strategies</li>
                    </ul>
                  </CardContent>
                </Card>

              </div>

            </CardContent>
          </Card>

          {/* Net Worth with Asset & Liability Breakdown */}
          <Card className="shadow-financial bg-financial-blue-light/20 border-financial-blue/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-foreground">Net Worth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-financial-blue mb-6">
                Net Worth: ${netWorth.toLocaleString()}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Assets */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Asset Breakdown</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={assetsData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={2}
                        label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                      >
                        {assetsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val, name) => [`$${val.toLocaleString()}`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="text-center text-muted-foreground font-medium">
                    Total Assets: ${totalAssets.toLocaleString()}
                  </p>
                </div>

                {/* Liabilities */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Liability Breakdown</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={liabilitiesData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={2}
                        label={({ name, value }) => `${name}: $${value.toLocaleString()}`}
                      >
                        {liabilitiesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val, name) => [`$${val.toLocaleString()}`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="text-center text-muted-foreground font-medium">
                    Total Liabilities: ${totalLiabilities.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cash Flow */}
          <Card className="shadow-card bg-gradient-card border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-foreground">Cash Flow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Monthly Net Income with Dropdown */}
              <Collapsible open={incomeOpen} onOpenChange={setIncomeOpen}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground font-medium">Monthly Net Income</span>
                      {incomeOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                    <span className="text-xl font-bold text-financial-green">${monthlyIncome.toLocaleString()}</span>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="bg-background border border-border rounded-lg p-3 space-y-2 shadow-sm z-10 relative">
                    {monthlyIncomeBreakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 px-3 bg-muted/20 rounded">
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                        <span className="text-sm font-medium text-foreground">${item.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Monthly Expenses with Dropdown */}
              <Collapsible open={expensesOpen} onOpenChange={setExpensesOpen}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg hover:bg-muted/40 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground font-medium">Monthly Expenses</span>
                      {expensesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </div>
                    <span className="text-xl font-bold text-financial-red">${monthlyExpenses.toLocaleString()}</span>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="bg-background border border-border rounded-lg p-3 space-y-2 shadow-sm z-10 relative">
                    {monthlyExpenseBreakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 px-3 bg-muted/20 rounded">
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                        <span className="text-sm font-medium text-foreground">${item.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="flex justify-between items-center p-4 bg-financial-green-light/30 rounded-lg border border-financial-green/20">
                <span className="text-foreground font-semibold">Monthly Surplus</span>
                <span className="text-2xl font-bold text-financial-green">${monthlySurplus.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Insurance */}
          <Card className="shadow-card bg-gradient-card border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-foreground">Insurance Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {insuranceData.map((insurance, index) => {
                  const chartData = [
                    {
                      name: "Current",
                      value: insurance.current,
                      fill: "hsl(var(--financial-green))"
                    },
                    {
                      name: "Recommended", 
                      value: insurance.recommended,
                      fill: "hsl(var(--financial-blue))"
                    },
                    {
                      name: "Gap",
                      value: insurance.gap,
                      fill: "hsl(var(--financial-red))"
                    }
                  ];

                  return (
                    <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Insurance Details Card */}
                      <Card className="border-financial-amber/30 bg-financial-amber/5">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-xl text-foreground">{insurance.type}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                              Current: <span className="font-medium text-foreground">
                                {insurance.unit}{insurance.current.toLocaleString()}{insurance.suffix || ""}
                              </span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Recommendation: <span className="font-medium text-financial-amber">
                                {insurance.unit}{insurance.recommended.toLocaleString()}{insurance.suffix || ""}
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground mb-2">Reason for Recommendation</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {insurance.reasons.map((reason, idx) => (
                                <li key={idx}>• {reason}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Coverage Analysis Chart */}
                      <Card className="border-financial-blue/30 bg-financial-blue/5">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg text-foreground">Coverage Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                              <XAxis 
                                dataKey="name" 
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                              />
                              <YAxis hide />
                              <Tooltip 
                                formatter={(value) => [
                                  `${insurance.unit}${value.toLocaleString()}${insurance.suffix || ""}`,
                                  ""
                                ]}
                                labelStyle={{ display: 'none' }}
                                contentStyle={{
                                  backgroundColor: 'hsl(var(--background))',
                                  border: '1px solid hsl(var(--border))',
                                  borderRadius: '8px'
                                }}
                              />
                              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                          
                          {/* Summary Values */}
                          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                            <div>
                              <p className="text-xs text-muted-foreground">CURRENT</p>
                              <p className="text-sm font-bold text-financial-green">
                                {insurance.unit}{insurance.current.toLocaleString()}{insurance.suffix || ""}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">NEED</p> 
                              <p className="text-sm font-bold text-financial-blue">
                                {insurance.unit}{insurance.recommended.toLocaleString()}{insurance.suffix || ""}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">GAP</p>
                              <p className="text-sm font-bold text-financial-red">
                                {insurance.unit}{insurance.gap.toLocaleString()}{insurance.suffix || ""}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Retirement */}
          <Card className="shadow-card bg-gradient-card border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-foreground">Retirement Readiness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-financial-blue">15</p>
                  <p className="text-sm text-muted-foreground">Years to Retirement</p>
                </div>
                <div className="text-center p-4 bg-muted/30 rounded-lg">
                  <p className="text-2xl font-bold text-financial-blue">60</p>
                  <p className="text-sm text-muted-foreground">Retirement Age</p>
                </div>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="text-center mb-3">
                    <p className="text-2xl font-bold text-financial-blue">${monthlyIncomeNeeded[0].toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Monthly Income Needed</p>
                  </div>
                  <div className="space-y-2">
                    <Slider
                      value={monthlyIncomeNeeded}
                      onValueChange={setMonthlyIncomeNeeded}
                      max={10000}
                      min={0}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$0</span>
                      <span>$10k</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-foreground font-medium">Progress towards retirement goal</p>
                  <p className="text-sm text-muted-foreground">{Math.round(retirementProgress)}%</p>
                </div>
                <Progress value={retirementProgress} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  On track to fund ~{Math.round(retirementProgress)}% of lifestyle needs by age 60.
                </p>
              </div>

              {/* Guaranteed Income Sources */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-foreground">Guaranteed Income Sources</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex justify-between items-center p-3 bg-financial-green-light/20 rounded-lg border border-financial-green/20">
                    <span className="text-foreground font-medium">CPP (estimated)</span>
                    <span className="text-lg font-bold text-financial-green">$1,200/mo</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-financial-green-light/20 rounded-lg border border-financial-green/20">
                    <span className="text-foreground font-medium">OAS (estimated)</span>
                    <span className="text-lg font-bold text-financial-green">$700/mo</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Total guaranteed: $1,900/month | Gap to fill: ${(monthlyIncomeNeeded[0] - 1900).toLocaleString()}/month</p>
              </div>

              {/* Action Items */}
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Ensure John continues directing annual bonus into tax-efficient accounts like his TFSA.</li>
                <li>• Mary should maintain consistent RRSP contributions to maximize future retirement income.</li>
                <li>• Review corporate savings strategies to integrate business cash flow into retirement plans.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Business */}
          <Card className="shadow-card bg-gradient-card border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-foreground">Business Planning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">Estimated future value of private company: <span className="font-bold text-financial-blue">$1,200,000</span></p>
              <p className="text-sm text-muted-foreground">• Shareholders: John (60%), Mary (40%)</p>
              
              {/* Key Savings Opportunities */}
              <div className="grid gap-4 mt-6">
                {/* LCGE Savings Mini Card */}
                <div className="p-4 bg-financial-green/10 border border-financial-green/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">Lifetime Capital Gains Exemption (LCGE)</h4>
                      <p className="text-sm text-muted-foreground mt-1">Potential tax savings on company sale</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-financial-green">$625,000</p>
                      <p className="text-xs text-muted-foreground">($312,500 per person)</p>
                    </div>
                  </div>
                </div>

                {/* Secondary Will Savings Mini Card */}
                <div className="p-4 bg-financial-blue/10 border border-financial-blue/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">Secondary Will Strategy</h4>
                      <p className="text-sm text-muted-foreground mt-1">Probate fee savings on private company shares</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-financial-blue">~${secondaryWillSavings.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">1.5% of company value</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Recommendations */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">• Review shareholders' agreement for succession and liquidity planning</p>
              </div>
            </CardContent>
          </Card>

          {/* Estate */}
          <Card className="shadow-card bg-gradient-card border-0">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-foreground">Estate Planning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Projected values at age 100 (illustrative) and estimated tax owing on taxable assets.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 font-semibold text-foreground">Taxable Asset</th>
                      <th className="text-right py-3 font-semibold text-foreground">Future Value</th>
                      <th className="text-right py-3 font-semibold text-foreground">Estimated Tax Owing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estateTaxRows.map((r) => (
                      <tr key={r.asset} className="border-b border-border/50">
                        <td className="py-3 text-foreground">{r.asset}</td>
                        <td className="text-right py-3 font-medium text-foreground">${r.fv.toLocaleString()}</td>
                        <td className="text-right py-3 font-medium text-financial-red">${r.estTax.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-border font-semibold">
                      <td className="py-3 text-foreground">Totals</td>
                      <td className="text-right py-3 text-financial-blue">${estateTotals.fv.toLocaleString()}</td>
                      <td className="text-right py-3 text-financial-red">${estateTotals.tax.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Consider a secondary will (where applicable) for private company shares.</li>
                <li>• Explore charitable bequests/donor-advised funds to align giving and tax.</li>
                <li>• Review trust options for minor/young-adult beneficiaries.</li>
              </ul>
              <p className="text-xs text-muted-foreground italic">Assumptions: simple future value growth and current tax regime; for education only.</p>
            </CardContent>
          </Card>

          {/* Overall Summary */}
          <Card className="shadow-financial bg-financial-blue-light/20 border-financial-blue/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-foreground">Overall Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Strengths</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• John's stable salary of $90,000 and Mary's salary of $75,000 provide reliable income.</li>
                  <li>• Strong business asset valued at ~$800,000 with growth potential and LCGE eligibility.</li>
                  <li>• Positive annual cash surplus ($105,000) supports both retirement savings and education funding.</li>
                  <li>• Diversified assets across real estate, investments, and corporate holdings.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Top Action Items (Next 90 Days)</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-foreground mb-1">High Priority Actions:</p>
                    <ul className="ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>1. Increase life insurance coverage to $1M (address $500K gap)</li>
                      <li>2. Add $250K critical illness coverage</li>
                      <li>3. Review disability coverage to ensure $2,000/month gap is addressed</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">Financial Optimization:</p>
                    <ul className="ml-4 space-y-1 text-muted-foreground text-sm">
                      <li>1. Increase retirement savings by $850/month to close income gap</li>
                      <li>2. Update all beneficiary designations across accounts</li>
                      <li>3. Implement secondary will strategy to save $18,000 in probate fees</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 border rounded text-sm">
                    <p className="font-medium text-foreground">Next Review: Schedule comprehensive review in 6 months to assess progress and adjust for any life changes.</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Roadmap</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 0–6 months: implement insurance and savings changes; mortgage renewal review.</li>
                  <li>• 6–18 months: investment rebalancing; education funding alignment.</li>
                  <li>• 18–36 months: estate optimization and succession planning check-in.</li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Advisor Note:</span> This summary is designed for clarity and action. Detailed schedules and tax assumptions are available on request.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}