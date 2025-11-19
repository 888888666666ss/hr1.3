import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Users, Briefcase, Target } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title="数据后台"
          description="人力资源数据分析和可视化"
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <Users className="h-8 w-8 text-primary" />
                    <span className="text-xs text-green-600">+12%</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">487</div>
                  <p className="text-sm text-muted-foreground">在职员工</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <Briefcase className="h-8 w-8 text-blue-600" />
                    <span className="text-xs text-green-600">+8%</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">24</div>
                  <p className="text-sm text-muted-foreground">活跃岗位</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <Target className="h-8 w-8 text-green-600" />
                    <span className="text-xs text-green-600">+15%</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">85%</div>
                  <p className="text-sm text-muted-foreground">招聘成功率</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                    <span className="text-xs text-red-600">+2%</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    2.5%
                  </div>
                  <p className="text-sm text-muted-foreground">离职率</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Placeholder */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>招聘趋势</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex h-64 items-center justify-center rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground">
                      [图表占位 - 月度招聘数据趋势]
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>部门人员分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex h-64 items-center justify-center rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground">
                      [图表占位 - 各部门人员占比]
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>绩效分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex h-64 items-center justify-center rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground">
                      [图表占位 - 员工绩效等级分布]
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>招聘渠道效果</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex h-64 items-center justify-center rounded-lg bg-muted/30">
                    <p className="text-sm text-muted-foreground">
                      [图表占位 - 各招聘渠道转化率]
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <AIAssistant page="analytics" />
    </div>
  )
}
