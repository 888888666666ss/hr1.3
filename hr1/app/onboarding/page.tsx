import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock } from 'lucide-react'

export default function OnboardingPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="入职管理" description="管理新员工入职流程" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {[
              {
                name: '李四',
                position: '产品经理',
                startDate: '2024-02-01',
                progress: 75,
                status: 'in-progress',
              },
              {
                name: '赵六',
                position: '后端工程师',
                startDate: '2024-02-05',
                progress: 100,
                status: 'completed',
              },
            ].map((item, index) => (
              <Card key={index}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {item.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.position} • 入职日期：{item.startDate}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-2 w-40 rounded-full bg-secondary">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {item.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        item.status === 'completed' ? 'default' : 'secondary'
                      }
                    >
                      {item.status === 'completed' ? (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      ) : (
                        <Clock className="mr-1 h-3 w-3" />
                      )}
                      {item.status === 'completed' ? '已完成' : '进行中'}
                    </Badge>
                    <Button variant="outline" size="sm">
                      查看详情
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      <AIAssistant page="onboarding" />
    </div>
  )
}
