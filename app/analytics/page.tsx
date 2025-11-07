import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <h1 className="ml-4 text-xl font-medium text-gray-900">招聘数据分析</h1>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recruitment Channels */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">招聘渠道</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-sm text-gray-600">人事服务部数据</div>
              <div className="text-2xl font-semibold">招聘网站</div>
              <div className="mt-1 flex gap-4 text-sm">
                <span className="text-gray-600">累计入职人数</span>
                <span className="font-medium">1500</span>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-600">占比</span>
                <span className="font-medium">45%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-20 text-xs text-gray-600">校招网站</div>
                <div className="flex-1 bg-gray-200 rounded">
                  <div className="h-4 bg-purple-500 rounded" style={{width: '45%'}}></div>
                </div>
                <div className="w-16 text-right text-xs font-medium">45%</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 text-xs text-gray-600">社交媒体</div>
                <div className="flex-1 bg-gray-200 rounded">
                  <div className="h-4 bg-cyan-500 rounded" style={{width: '30%'}}></div>
                </div>
                <div className="w-16 text-right text-xs font-medium">30%</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 text-xs text-gray-600">其他</div>
                <div className="flex-1 bg-gray-200 rounded">
                  <div className="h-4 bg-pink-500 rounded" style={{width: '25%'}}></div>
                </div>
                <div className="w-16 text-right text-xs font-medium">25%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recruitment Achievement */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">招聘达成</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-sm text-gray-600">招聘完成率</div>
              <div className="text-3xl font-semibold">65%</div>
              <div className="mt-1 flex gap-4 text-sm">
                <div>
                  <span className="text-gray-600">累计入职人数</span>
                  <span className="ml-2 font-medium">1300</span>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-gray-600">累计需求人数</span>
                  <span className="ml-2 font-medium">2000</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recruitment Quality */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">招聘质量</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-sm text-gray-600">累计已邀约人数</div>
              <div className="text-3xl font-semibold">48</div>
              <div className="mt-1 text-sm text-gray-600">
                <span>占比</span>
                <span className="ml-2 font-medium">20%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Internal Referrals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">内部推荐</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-sm text-gray-600">招聘完成率</div>
              <div className="text-3xl font-semibold">65%</div>
              <div className="mt-1 flex gap-4 text-sm">
                <div>
                  <span className="text-gray-600">人员推荐量</span>
                  <span className="ml-2 font-medium">240</span>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-gray-600">人员到岗数</span>
                  <span className="ml-2 font-medium">156</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Offers Issued */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">发放Offer数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-3xl font-semibold">340</div>
              <div className="mt-1 flex gap-4 text-sm">
                <div>
                  <span className="text-gray-600">到岗offer</span>
                  <span className="ml-2 font-medium">80</span>
                </div>
              </div>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-gray-600">未到岗offer</span>
                  <span className="ml-2 font-medium">260</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirmed Employees */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">累计转正人数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-3xl font-semibold">326</div>
              <div className="mt-1 text-sm">
                <span className="text-gray-600">转正占比</span>
                <span className="ml-2 font-medium">80%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}