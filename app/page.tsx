"use client"

import React from 'react'

export default function HomePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-6">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9,22 9,12 15,12 15,22" />
          </svg>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="m22 21-3-3m0 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
          </svg>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <h1 className="text-lg font-medium text-gray-900">招聘管理工作台</h1>
            </div>
          </div>
        </header>

        {/* Sub Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
                <span className="font-medium text-gray-900">Baiao</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
                </svg>
                <span>全局视野工作台</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm font-medium">张</span>
                </div>
                <span className="text-sm text-gray-700">张经理</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Greeting Section */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-lg font-medium">张</span>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">张经理, 下午好</h2>
                <p className="text-sm text-gray-500">人力资源部 · 招聘经理 · 北京市朝阳区</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <input 
                  type="text" 
                  placeholder="搜索候选人姓名、职位等信息" 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">搜索</button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">新建面试</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 mt-4">
            <button className="px-4 py-2 text-sm font-medium text-blue-500 border-b-2 border-blue-500">任务</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">流程</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">其它</button>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex gap-6">
              {/* Left Content */}
              <div className="flex-1">
                {/* Stats Cards */}
                <div className="grid grid-cols-5 gap-4 mb-6">
                  <div className="bg-white p-4 border-l-4 border-orange-500 rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">简历筛选</div>
                    <div className="text-2xl font-semibold text-gray-900">870</div>
                    <div className="text-xs text-gray-400 mt-1">待处理简历 45</div>
                  </div>

                  <div className="bg-white p-4 border-l-4 border-blue-500 rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">初试</div>
                    <div className="text-2xl font-semibold text-gray-900">20</div>
                    <div className="text-xs text-gray-400 mt-1">本周已安排 12</div>
                  </div>

                  <div className="bg-white p-4 border-l-4 border-teal-500 rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">复试</div>
                    <div className="text-2xl font-semibold text-gray-900">36</div>
                    <div className="text-xs text-gray-400 mt-1">本周已安排 8</div>
                  </div>

                  <div className="bg-white p-4 border-l-4 border-purple-500 rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">Offer</div>
                    <div className="text-2xl font-semibold text-gray-900">8</div>
                    <div className="text-xs text-gray-400 mt-1">待发放 3</div>
                  </div>

                  <div className="bg-white p-4 border-l-4 border-green-500 rounded-lg shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">入职</div>
                    <div className="text-2xl font-semibold text-gray-900">5</div>
                    <div className="text-xs text-gray-400 mt-1">本月入职 5</div>
                  </div>
                </div>

                {/* Schedule Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-5 bg-orange-500 rounded" />
                      <h3 className="font-medium text-gray-900">我的面试安排</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">更新时间</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <button className="text-sm text-gray-600 hover:text-gray-900">回到今天</button>
                      <button className="text-sm text-gray-600 hover:text-gray-900">快速查看</button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                        创建面试
                      </button>
                    </div>
                  </div>

                  {/* Calendar Week View */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex-1 grid grid-cols-7 gap-2">
                      {[
                        { day: "周一", date: "26" },
                        { day: "周二", date: "27" },
                        { day: "周三", date: "28" },
                        { day: "周四", date: "29", active: true },
                        { day: "周五", date: "30" },
                        { day: "周六", date: "1" },
                        { day: "周日", date: "2" },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className={`text-center p-2 rounded-lg cursor-pointer ${
                            item.active ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                          }`}
                        >
                          <div className="text-xs mb-1">{item.day}</div>
                          <div className="text-lg font-medium">{item.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schedule Items */}
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 w-24">09:00 - 10:00</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-teal-100 text-teal-600 px-2 py-1 rounded">已完成</span>
                          <span className="font-medium text-gray-900">高级产品经理 - 王安</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          电话面试 · 视频 · 面试 北京市朝阳区北京朝阳区朝阳大悦城
                        </div>
                      </div>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">面试</span>
                    </div>

                    <div className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 w-24">14:00 - 16:00</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-teal-100 text-teal-600 px-2 py-1 rounded">已完成</span>
                          <span className="font-medium text-gray-900">2023级校招产品经理 - 集体面试</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          视频 · 面试 北京市朝阳区北京朝阳区朝阳大悦城
                        </div>
                      </div>
                      <span className="text-sm text-blue-500">2 通过</span>
                    </div>

                    <div className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 w-24">16:30 - 19:00</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">进行中</span>
                          <span className="font-medium text-gray-900">高级产品经理 - 终面</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          视频 · 面试 北京市朝阳区北京朝阳区朝阳大悦城
                        </div>
                      </div>
                      <button className="text-sm text-blue-500 hover:underline">取消预约</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="w-80 space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-semibold text-gray-900">0</span>
                    <span className="text-sm text-gray-600">待跟进的候选人</span>
                  </div>
                  <div className="text-xs text-gray-400">已完成跟进 0</div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-semibold text-gray-900">42%</span>
                    <span className="text-sm text-gray-600">面试通过率</span>
                  </div>
                  <div className="text-xs text-gray-400">本月数据统计</div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-semibold text-gray-900">5</span>
                    <span className="text-sm text-gray-600">待反馈的面试</span>
                  </div>
                  <div className="text-xs text-gray-400">需要填写评价 5</div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-semibold text-gray-900">5</span>
                    <span className="text-sm text-gray-600">待确认的入职</span>
                  </div>
                  <div className="text-xs text-gray-400">本月待入职 5</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-blue-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-semibold text-orange-500">2</span>
                    <span className="text-sm text-gray-700">待发放Offer</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-4 cursor-pointer hover:underline">查看详情 &gt;</div>
                  <div className="flex justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-200 to-blue-200 rounded-full flex items-center justify-center">
                      <span className="text-4xl">💼</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}