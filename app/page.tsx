"use client"

import React from 'react'

export default function HomePage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc', 
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Navigation Header */}
      <header style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e2e8f0',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }} />
            <div style={{ width: '8px', height: '8px', backgroundColor: '#eab308', borderRadius: '50%' }} />
            <div style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }} />
          </div>
          <h1 style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            color: '#1f2937', 
            margin: 0 
          }}>
            招聘管理工作台
          </h1>
        </div>
        <div style={{ 
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          张经理
        </div>
      </header>

      {/* Main Content */}
      <div style={{ padding: '2rem' }}>
        {/* Welcome Section */}
        <div style={{ 
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#ddd6fe',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#7c3aed'
            }}>
              张
            </div>
            <div>
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                color: '#1f2937', 
                margin: 0,
                marginBottom: '0.25rem'
              }}>
                张经理，下午好！
              </h2>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280', 
                margin: 0 
              }}>
                人力资源部 · 招聘经理 · 北京市朝阳区
              </p>
            </div>
          </div>
          
          {/* Search Section */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input 
              type="text"
              placeholder="搜索候选人姓名、职位等信息"
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
            <button style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.375rem',
              border: 'none',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              搜索
            </button>
            <button style={{
              backgroundColor: 'white',
              color: '#374151',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.375rem',
              border: '1px solid #d1d5db',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              新建面试
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {[
            { title: '简历筛选', value: '870', subtitle: '待处理简历 45', color: '#f97316' },
            { title: '初试', value: '20', subtitle: '本周已安排 12', color: '#3b82f6' },
            { title: '复试', value: '36', subtitle: '本周已安排 8', color: '#06b6d4' },
            { title: 'Offer', value: '8', subtitle: '待发放 3', color: '#8b5cf6' },
            { title: '入职', value: '5', subtitle: '本月入职 5', color: '#22c55e' }
          ].map((stat, index) => (
            <div key={index} style={{
              backgroundColor: 'white',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              borderLeft: `4px solid ${stat.color}`
            }}>
              <div style={{ 
                fontSize: '0.75rem', 
                color: '#6b7280', 
                marginBottom: '0.5rem' 
              }}>
                {stat.title}
              </div>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: '600', 
                color: '#1f2937', 
                marginBottom: '0.5rem' 
              }}>
                {stat.value}
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                color: '#9ca3af' 
              }}>
                {stat.subtitle}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Interview Schedule */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '4px', 
                  height: '20px', 
                  backgroundColor: '#f97316',
                  borderRadius: '2px'
                }} />
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  margin: 0 
                }}>
                  我的面试安排
                </h3>
              </div>
              <button style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                创建面试
              </button>
            </div>

            {/* Calendar Week View */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)', 
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              {[
                { day: '周一', date: '26' },
                { day: '周二', date: '27' },
                { day: '周三', date: '28' },
                { day: '周四', date: '29', active: true },
                { day: '周五', date: '30' },
                { day: '周六', date: '1' },
                { day: '周日', date: '2' }
              ].map((item, index) => (
                <div key={index} style={{
                  textAlign: 'center',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: item.active ? '#3b82f6' : '#f8fafc',
                  color: item.active ? 'white' : '#374151',
                  cursor: 'pointer'
                }}>
                  <div style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>{item.day}</div>
                  <div style={{ fontSize: '1.125rem', fontWeight: '600' }}>{item.date}</div>
                </div>
              ))}
            </div>

            {/* Interview List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  time: '09:00 - 10:00',
                  status: '已完成',
                  statusColor: '#059669',
                  title: '高级产品经理 - 王安',
                  detail: '电话面试 · 视频 · 面试'
                },
                {
                  time: '14:00 - 16:00',
                  status: '已完成',
                  statusColor: '#059669',
                  title: '2023级校招产品经理 - 集体面试',
                  detail: '视频 · 面试 · 2 通过'
                },
                {
                  time: '16:30 - 19:00',
                  status: '进行中',
                  statusColor: '#d97706',
                  title: '高级产品经理 - 终面',
                  detail: '视频 · 面试'
                }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '0.375rem'
                }}>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280',
                    minWidth: '120px'
                  }}>
                    {item.time}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      marginBottom: '0.25rem'
                    }}>
                      <span style={{
                        fontSize: '0.75rem',
                        color: 'white',
                        backgroundColor: item.statusColor,
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem'
                      }}>
                        {item.status}
                      </span>
                      <span style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '500', 
                        color: '#1f2937' 
                      }}>
                        {item.title}
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280' 
                    }}>
                      {item.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { value: '0', label: '待跟进的候选人', subtitle: '已完成跟进 0' },
              { value: '42%', label: '面试通过率', subtitle: '本月数据统计' },
              { value: '5', label: '待反馈的面试', subtitle: '需要填写评价 5' },
              { value: '5', label: '待确认的入职', subtitle: '本月待入职 5' }
            ].map((item, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ 
                    fontSize: '1.75rem', 
                    fontWeight: '600', 
                    color: '#1f2937' 
                  }}>
                    {item.value}
                  </span>
                  <span style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280' 
                  }}>
                    {item.label}
                  </span>
                </div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: '#9ca3af' 
                }}>
                  {item.subtitle}
                </div>
              </div>
            ))}
            
            {/* Special Offer Card */}
            <div style={{
              background: 'linear-gradient(135deg, #fed7aa, #dbeafe)',
              padding: '1.5rem',
              borderRadius: '0.5rem'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <span style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: '600', 
                  color: '#ea580c' 
                }}>
                  2
                </span>
                <span style={{ 
                  fontSize: '0.875rem', 
                  color: '#374151' 
                }}>
                  待发放Offer
                </span>
              </div>
              <div style={{ 
                fontSize: '0.75rem', 
                color: '#6b7280',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}>
                查看详情 &gt;
              </div>
              <div style={{ 
                textAlign: 'center', 
                marginTop: '1rem',
                fontSize: '2rem'
              }}>
                💼
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}