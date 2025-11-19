'use client'

import { Sidebar } from '@/components/sidebar'
import { PageHeader } from '@/components/page-header'
import { AIAssistant } from '@/components/ai-assistant'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Settings, RefreshCw, CheckCircle, XCircle } from 'lucide-react'
import { useState } from 'react'

export default function ChannelsPage() {
  const [showModal, setShowModal] = useState(false)
  const [editingChannel, setEditingChannel] = useState<any>(null)

  const channels = [
    {
      id: 1,
      name: 'BOSS 直聘',
      type: 'Job Board',
      apiKey: 'boss_api_***********',
      syncEnabled: true,
      lastSync: '2024-01-22 10:30',
      status: 'active',
    },
    {
      id: 2,
      name: '智联招聘',
      type: 'Job Board',
      apiKey: 'zhilian_***********',
      syncEnabled: true,
      lastSync: '2024-01-22 09:15',
      status: 'active',
    },
    {
      id: 3,
      name: '前程无忧',
      type: 'Job Board',
      apiKey: 'not_configured',
      syncEnabled: false,
      lastSync: '-',
      status: 'inactive',
    },
    {
      id: 4,
      name: '拉勾网',
      type: 'Job Board',
      apiKey: 'lagou_***********',
      syncEnabled: true,
      lastSync: '2024-01-22 11:00',
      status: 'active',
    },
    {
      id: 5,
      name: '猎聘',
      type: 'Executive Search',
      apiKey: 'not_configured',
      syncEnabled: false,
      lastSync: '-',
      status: 'inactive',
    },
  ]

  const handleEdit = (channel: any) => {
    setEditingChannel(channel)
    setShowModal(true)
  }

  const handleAddNew = () => {
    setEditingChannel(null)
    setShowModal(true)
  }

  const handleSave = () => {
    alert('渠道配置已保存')
    setShowModal(false)
    setEditingChannel(null)
  }

  const handleSync = (channelName: string) => {
    alert(`正在同步 ${channelName} 的数据...`)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader title="渠道管理" description="配置和管理招聘渠道接入">
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            添加渠道
          </Button>
        </PageHeader>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-foreground">5</div>
                  <p className="text-sm text-muted-foreground">已配置渠道</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-foreground">3</div>
                  <p className="text-sm text-muted-foreground">已激活渠道</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-foreground">245</div>
                  <p className="text-sm text-muted-foreground">今日同步简历</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-foreground">98%</div>
                  <p className="text-sm text-muted-foreground">同步成功率</p>
                </CardContent>
              </Card>
            </div>

            {/* Channels List */}
            <Card>
              <CardHeader>
                <CardTitle>渠道列表</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channels.map((channel) => (
                    <div
                      key={channel.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                          channel.status === 'active' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-900/30'
                        }`}>
                          {channel.status === 'active' ? (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          ) : (
                            <XCircle className="h-6 w-6 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {channel.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {channel.type} • API Key: {channel.apiKey}
                          </p>
                          {channel.lastSync !== '-' && (
                            <p className="text-xs text-muted-foreground">
                              最后同步：{channel.lastSync}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">自动同步</span>
                          <label className="relative inline-flex cursor-pointer items-center">
                            <input
                              type="checkbox"
                              defaultChecked={channel.syncEnabled}
                              className="peer sr-only"
                            />
                            <div className="peer h-5 w-9 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-background after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-4"></div>
                          </label>
                        </div>
                        <Badge
                          variant={channel.status === 'active' ? 'default' : 'secondary'}
                        >
                          {channel.status === 'active' ? '已激活' : '未配置'}
                        </Badge>
                        {channel.status === 'active' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSync(channel.name)}
                          >
                            <RefreshCw className="mr-1 h-3 w-3" />
                            同步
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(channel)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Channel Configuration Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-lg">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  {editingChannel ? '编辑渠道' : '添加新渠道'}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowModal(false)
                    setEditingChannel(null)
                  }}
                >
                  ✕
                </Button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    渠道名称 *
                  </label>
                  <input
                    type="text"
                    defaultValue={editingChannel?.name || ''}
                    placeholder="例如：BOSS 直聘"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    渠道类型 *
                  </label>
                  <select
                    defaultValue={editingChannel?.type || 'Job Board'}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option>Job Board</option>
                    <option>Executive Search</option>
                    <option>Social Media</option>
                    <option>Internal Referral</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    API Key *
                  </label>
                  <input
                    type="password"
                    defaultValue={editingChannel?.apiKey || ''}
                    placeholder="输入 API Key"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    请从渠道平台获取 API Key
                  </p>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">启用自动同步</p>
                    <p className="text-xs text-muted-foreground">
                      每小时自动同步岗位和简历数据
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      defaultChecked={editingChannel?.syncEnabled || false}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-secondary after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-background after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-5"></div>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowModal(false)
                      setEditingChannel(null)
                    }}
                  >
                    取消
                  </Button>
                  <Button onClick={handleSave}>保存</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <AIAssistant page="channels" />
    </div>
  )
}
