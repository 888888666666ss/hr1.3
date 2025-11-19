import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, MapPin, Calendar, Sparkles } from 'lucide-react'

export default function EmployeeDetailPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="员工详情" description="张伟 - 前端技术专家">
          <Button variant="outline">编辑信息</Button>
          <Button>查看绩效</Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-6xl space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">
                    张
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-foreground">张伟</h2>
                      <Badge variant="default">在职</Badge>
                    </div>
                    <p className="mb-4 text-lg text-muted-foreground">
                      前端技术专家 • 技术部
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>zhangwei@company.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>138-0000-0001</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>北京</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>入职日期：2020-03-15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>AI 档案总结</CardTitle>
                    <Sparkles className="h-5 w-5 text-primary" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-medium text-foreground">
                        工作表现
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        张伟是一位优秀的前端技术专家，在公司工作近4年时间。技术能力突出，曾主导多个重点项目的前端架构设计。具有良好的团队协作精神和技术分享意愿，多次在团队内部进行技术分享。
                      </p>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium text-foreground">
                        核心技能
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'React',
                          'TypeScript',
                          '前端架构',
                          '性能优化',
                          '团队管理',
                          'CI/CD',
                        ].map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium text-foreground">
                        发展建议
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        建议在后续工作中加强后端技术学习，提升全栈能力。同时可以考虑培养团队管理能力，为未来晋升技术管理岗做准备。
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>工作经历</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-l-2 border-primary pl-4">
                      <div className="mb-1 flex items-center justify-between">
                        <h4 className="font-medium text-foreground">
                          前端技术专家
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          2022-01 至今
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        负责前端架构设计和技术选型，带领团队完成多个重点项目
                      </p>
                    </div>
                    <div className="border-l-2 border-border pl-4">
                      <div className="mb-1 flex items-center justify-between">
                        <h4 className="font-medium text-foreground">
                          高级前端工程师
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          2020-03 - 2021-12
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        参与核心业务系统开发，负责前端组件库建设
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>基本信息</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">员工编号</span>
                      <span className="text-foreground">EMP-2020-001</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">部门</span>
                      <span className="text-foreground">技术部</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">直属上级</span>
                      <span className="text-foreground">技术总监</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">工作年限</span>
                      <span className="text-foreground">4 年</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>绩效概览</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">最近评分</span>
                      <span className="font-medium text-foreground">A</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">年度评分</span>
                      <span className="font-medium text-foreground">A</span>
                    </div>
                    <Button className="w-full" variant="outline">
                      查看完整绩效
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>快速操作</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full" variant="outline">
                      查看考勤记录
                    </Button>
                    <Button className="w-full" variant="outline">
                      查看薪资信息
                    </Button>
                    <Button className="w-full" variant="outline">
                      培训记录
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      <AIAssistant page="employees" />
    </div>
  )
}
