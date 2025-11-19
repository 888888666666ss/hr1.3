'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, CalendarIcon, MapPin, CheckCircle } from 'lucide-react'

export default function AttendancePage() {
  const [checkInTime, setCheckInTime] = useState<string | null>(null)
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null)

  const handleCheckIn = () => {
    const now = new Date()
    setCheckInTime(now.toLocaleTimeString('zh-CN', { hour12: false }))
  }

  const handleCheckOut = () => {
    const now = new Date()
    setCheckOutTime(now.toLocaleTimeString('zh-CN', { hour12: false }))
  }

  const attendanceRecords = [
    { date: '2024-01-22', checkIn: '09:05', checkOut: '18:30', status: 'normal', hours: '9.5' },
    { date: '2024-01-19', checkIn: '09:00', checkOut: '18:25', status: 'normal', hours: '9.5' },
    { date: '2024-01-18', checkIn: '09:15', checkOut: '18:20', status: 'late', hours: '9' },
    { date: '2024-01-17', checkIn: '08:58', checkOut: '18:35', status: 'normal', hours: '9.5' },
    { date: '2024-01-16', checkIn: '09:02', checkOut: '18:28', status: 'normal', hours: '9.5' },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader
        title="考勤打卡"
        description="每日考勤打卡和考勤记录查看"
      />

      <div className="flex-1 space-y-6 p-6">
        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>本月出勤</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">20天</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>迟到次数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">1次</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>加班时长</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12小时</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>请假天数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2天</div>
            </CardContent>
          </Card>
        </div>

        {/* Check In/Out Card */}
        <Card>
          <CardHeader>
            <CardTitle>今日打卡</CardTitle>
            <CardDescription>
              {new Date().toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center gap-12 py-8">
              <div className="text-center space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <Clock className="h-12 w-12 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">上班打卡</span>
                </div>
                {checkInTime ? (
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">{checkInTime}</div>
                    <Badge variant="default" className="gap-1">
                      <CheckCircle className="h-3 w-3" />
                      已打卡
                    </Badge>
                  </div>
                ) : (
                  <Button size="lg" onClick={handleCheckIn}>
                    <Clock className="mr-2 h-5 w-5" />
                    上班打卡
                  </Button>
                )}
              </div>

              <div className="h-24 w-px bg-border" />

              <div className="text-center space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <Clock className="h-12 w-12 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">下班打卡</span>
                </div>
                {checkOutTime ? (
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">{checkOutTime}</div>
                    <Badge variant="default" className="gap-1">
                      <CheckCircle className="h-3 w-3" />
                      已打卡
                    </Badge>
                  </div>
                ) : (
                  <Button 
                    size="lg" 
                    onClick={handleCheckOut}
                    disabled={!checkInTime}
                    variant={checkInTime ? 'default' : 'secondary'}
                  >
                    <Clock className="mr-2 h-5 w-5" />
                    下班打卡
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>打卡地点: 公司总部 (北京市朝阳区)</span>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Records */}
        <Card>
          <CardHeader>
            <CardTitle>考勤记录</CardTitle>
            <CardDescription>最近的考勤打卡记录</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceRecords.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <CalendarIcon className="h-5 w-5 text-muted-foreground mb-1" />
                      <span className="text-sm font-medium">{record.date}</span>
                    </div>
                    <div className="h-10 w-px bg-border" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">上班:</span>
                        <span className="font-medium">{record.checkIn}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">下班:</span>
                        <span className="font-medium">{record.checkOut}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">工时</div>
                      <div className="font-medium">{record.hours}h</div>
                    </div>
                    <Badge variant={record.status === 'normal' ? 'default' : 'secondary'}>
                      {record.status === 'normal' ? '正常' : '迟到'}
                    </Badge>
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
