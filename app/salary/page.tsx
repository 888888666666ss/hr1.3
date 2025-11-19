'use client'

import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Eye, Upload } from 'lucide-react'

const salaryRecords = [
  {
    month: '2024年1月',
    baseSalary: 20000,
    bonus: 5000,
    allowance: 1000,
    deductions: 2500,
    netSalary: 23500,
    status: 'paid',
  },
  {
    month: '2023年12月',
    baseSalary: 20000,
    bonus: 3000,
    allowance: 1000,
    deductions: 2400,
    netSalary: 21600,
    status: 'paid',
  },
  {
    month: '2023年11月',
    baseSalary: 20000,
    bonus: 2000,
    allowance: 1000,
    deductions: 2300,
    netSalary: 20700,
    status: 'paid',
  },
]

export default function SalaryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        title="薪酬管理"
        description="查看工资明细和历史记录"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Current Month Salary */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>本月工资</CardTitle>
                <CardDescription>2024年1月</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-1.5 h-4 w-4" />
                  查看详情
                </Button>
                <Button size="sm">
                  <Download className="mr-1.5 h-4 w-4" />
                  下载工资条
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-5">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">基本工资</div>
                <div className="text-2xl font-bold">¥20,000</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">绩效奖金</div>
                <div className="text-2xl font-bold text-green-600">+¥5,000</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">各项补贴</div>
                <div className="text-2xl font-bold text-green-600">+¥1,000</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">五险一金</div>
                <div className="text-2xl font-bold text-red-600">-¥2,500</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">实发工资</div>
                <div className="text-3xl font-bold text-primary">¥23,500</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Salary Records */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>历史工资记录</CardTitle>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                导入工资数据
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salaryRecords.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-center gap-8 flex-1">
                    <div className="font-medium w-32">{record.month}</div>
                    <div className="flex gap-6 text-sm">
                      <div>
                        <span className="text-muted-foreground">基本: </span>
                        <span className="font-medium">¥{record.baseSalary.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">奖金: </span>
                        <span className="font-medium text-green-600">¥{record.bonus.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">补贴: </span>
                        <span className="font-medium text-green-600">¥{record.allowance.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">扣款: </span>
                        <span className="font-medium text-red-600">¥{record.deductions.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">实发</div>
                      <div className="text-xl font-bold text-primary">
                        ¥{record.netSalary.toLocaleString()}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
