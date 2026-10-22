import { useMemo, useState } from 'react'
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, ChevronDown, CircleHelp,
  CreditCard, Download, LayoutDashboard, Menu, MoreHorizontal, Search,
  Settings, ShoppingBag, Users, X, CalendarDays, Package, TrendingUp,
  LogOut, Check, Clock3, Filter, Eye, UserPlus
} from 'lucide-react'
import {
  Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis, BarChart, Bar
} from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 18000, orders: 140 },
  { month: 'Feb', revenue: 22500, orders: 180 },
  { month: 'Mar', revenue: 19500, orders: 160 },
  { month: 'Apr', revenue: 27800, orders: 225 },
  { month: 'May', revenue: 24500, orders: 205 },
  { month: 'Jun', revenue: 32400, orders: 270 },
  { month: 'Jul', revenue: 29800, orders: 245 },
  { month: 'Aug', revenue: 38200, orders: 315 },
  { month: 'Sep', revenue: 34600, orders: 290 },
  { month: 'Oct', revenue: 42100, orders: 350 },
  { month: 'Nov', revenue: 39400, orders: 330 },
  { month: 'Dec', revenue: 48250, orders: 405 },
]

const initialUsers = [
  { id: 1, name: 'Olivia Martin', email: 'olivia.martin@example.com', role: 'Admin', status: 'Active', spent: '$2,450.00', initials: 'OM', color: 'lavender' },
  { id: 2, name: 'Jackson Lee', email: 'jackson.lee@example.com', role: 'Customer', status: 'Active', spent: '$1,890.00', initials: 'JL', color: 'mint' },
  { id: 3, name: 'Isabella Chen', email: 'isabella.chen@example.com', role: 'Editor', status: 'Pending', spent: '$1,250.00', initials: 'IC', color: 'peach' },
  { id: 4, name: 'William Kim', email: 'william.kim@example.com', role: 'Customer', status: 'Active', spent: '$980.00', initials: 'WK', color: 'blue' },
  { id: 5, name: 'Sofia Davis', email: 'sofia.davis@example.com', role: 'Customer', status: 'Inactive', spent: '$720.00', initials: 'SD', color: 'pink' },
]

const trafficData = [
  { name: 'Direct', value: 38, color: '#7165f3' },
  { name: 'Social', value: 28, color: '#2dbb9b' },
  { name: 'Referral', value: 20, color: '#f5a544' },
  { name: 'Search', value: 14, color: '#61a8fa' },
]

const navGroups = [
  { title: 'OVERVIEW', items: [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Analytics', icon: Activity },
    { label: 'Users', icon: Users, count: '5' },
  ]},
  { title: 'MANAGEMENT', items: [
    { label: 'Products', icon: Package },
    { label: 'Orders', icon: ShoppingBag, count: '8' },
    { label: 'Payments', icon: CreditCard },
  ]},
]

function money(value) {
  return '$' + value.toLocaleString('en-US')
}

function Sidebar({ active, setActive, open, setOpen }) {
  return (
    <>
      {open && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Activity size={21} strokeWidth={2.8} /></div>
          <span>codeved<span className="brand-x">x</span></span>
          <button className="mobile-close" aria-label="Close menu" onClick={() => setOpen(false)}><X size={20} /></button>
        </div>
        <div className="workspace">
          <div className="workspace-logo">C</div>
          <div className="workspace-copy"><strong>CodeVedX Studio</strong><span>Free workspace</span></div>
          <ChevronDown size={16} className="muted-icon" />
        </div>
        <nav className="navigation">
          {navGroups.map(group => (
            <div className="nav-group" key={group.title}>
              <p className="nav-heading">{group.title}</p>
              {group.items.map(item => {
                const Icon = item.icon
                return <button key={item.label} className={`nav-item ${active === item.label ? 'nav-active' : ''}`} onClick={() => { setActive(item.label); setOpen(false) }}>
                  <Icon size={18} strokeWidth={1.9} /><span>{item.label}</span>
                  {item.count && <span className="nav-count">{item.count}</span>}
                </button>
              })}
            </div>
          ))}
          <div className="nav-group">
            <p className="nav-heading">PREFERENCES</p>
            <button className={`nav-item ${active === 'Settings' ? 'nav-active' : ''}`} onClick={() => { setActive('Settings'); setOpen(false) }}><Settings size={18} /><span>Settings</span></button>
            <button className={`nav-item ${active === 'Help & Support' ? 'nav-active' : ''}`} onClick={() => { setActive('Help & Support'); setOpen(false) }}><CircleHelp size={18} /><span>Help & Support</span></button>
          </div>
        </nav>
        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon"><TrendingUp size={18} /></div>
            <strong>Unlock more insights</strong>
            <p>Get more from your business with advanced analytics.</p>
            <button onClick={() => alert('Upgrade plan demo — connect your own billing flow here.')}>Explore plans <ArrowUpRight size={14} /></button>
          </div>
          <button className="profile-row" onClick={() => alert('Profile menu demo')}>
            <div className="avatar avatar-profile">DK</div>
            <div className="profile-copy"><strong>Deva Sathish</strong><span>Administrator</span></div>
            <MoreHorizontal size={18} className="muted-icon" />
          </button>
        </div>
      </aside>
    </>
  )
}

function StatCard({ title, value, change, positive, icon: Icon, tone, note }) {
  return <article className="stat-card">
    <div className="stat-top"><span>{title}</span><span className={`stat-icon ${tone}`}><Icon size={19} /></span></div>
    <div className="stat-value">{value}</div>
    <div className="stat-bottom">
      <span className={`change-pill ${positive ? 'positive' : 'negative'}`}>{positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{change}</span>
      <span className="stat-note">{note}</span>
    </div>
  </article>
}

function App() {
  const [active, setActive] = useState('Dashboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [period, setPeriod] = useState('Last 12 months')
  const [chartMode, setChartMode] = useState('Revenue')
  const [users, setUsers] = useState(initialUsers)
  const [userFilter, setUserFilter] = useState('All users')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAddUser, setShowAddUser] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [toast, setToast] = useState('')

  const filteredUsers = useMemo(() => users.filter(user => {
    const matchesSearch = `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = userFilter === 'All users' || user.status === userFilter
    return matchesSearch && matchesFilter
  }), [users, query, userFilter])

  function notify(message) {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  function addUser(event) {
    event.preventDefault()
    if (!newName.trim() || !newEmail.trim()) return
    const initials = newName.trim().split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase()
    setUsers(current => [{ id: Date.now(), name: newName.trim(), email: newEmail.trim(), role: 'Customer', status: 'Active', spent: '$0.00', initials, color: 'blue' }, ...current])
    setNewName('')
    setNewEmail('')
    setShowAddUser(false)
    notify('New user added successfully')
  }

  function exportUsers() {
    const header = ['Name', 'Email', 'Role', 'Status', 'Total spent']
    const rows = filteredUsers.map(u => [u.name, u.email, u.role, u.status, u.spent])
    const csv = [header, ...rows].map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'codevedx-users.csv'
    link.click()
    URL.revokeObjectURL(url)
    notify('User list exported as CSV')
  }

  const pageTitle = active === 'Dashboard' ? 'Dashboard overview' : active
  const pageDescription = active === 'Dashboard'
    ? 'Here’s what’s happening with your store today.'
    : `Manage your ${active.toLowerCase()} and keep everything running smoothly.`

  return <div className="app-shell">
    <Sidebar active={active} setActive={setActive} open={menuOpen} setOpen={setMenuOpen} />
    <main className="main-area">
      <header className="topbar">
        <div className="topbar-left">
          <button className="menu-button" aria-label="Open navigation" onClick={() => setMenuOpen(true)}><Menu size={21} /></button>
          <div className="breadcrumb">Workspace <span>/</span> <strong>{active}</strong></div>
        </div>
        <div className="topbar-actions">
          <label className="search-box"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search users..." aria-label="Search users" /><kbd>⌘ K</kbd></label>
          <div className="notification-wrap">
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => setShowNotifications(v => !v)}><Bell size={19} /><i /></button>
            {showNotifications && <div className="notification-popover">
              <div className="popover-heading"><strong>Notifications</strong><span className="small-tag">3 new</span></div>
              <div className="notification-item"><span className="notification-dot purple-dot" /><div><strong>New order received</strong><p>Order #ORD-2048 was placed.</p><small>8 minutes ago</small></div></div>
              <div className="notification-item"><span className="notification-dot green-dot" /><div><strong>Weekly report is ready</strong><p>Your store report is ready to view.</p><small>1 hour ago</small></div></div>
              <div className="notification-item"><span className="notification-dot orange-dot" /><div><strong>New user registered</strong><p>Isabella Chen joined your store.</p><small>3 hours ago</small></div></div>
            </div>}
          </div>
          <div className="topbar-avatar">DK</div>
        </div>
      </header>

      <div className="page-content">
        <section className="page-heading">
          <div><div className="eyebrow"><span className="eyebrow-dot" /> LIVE OVERVIEW</div><h1>{pageTitle}</h1><p>{pageDescription}</p></div>
          <div className="heading-actions"><button className="secondary-button" onClick={exportUsers}><Download size={16} /> Export</button><button className="primary-button" onClick={() => setShowAddUser(true)}><UserPlus size={17} /> Add user</button></div>
        </section>

        {active !== 'Dashboard' && active !== 'Users' ? <section className="section-placeholder">
          <div className="placeholder-icon"><LayoutDashboard size={28} /></div><h2>{active}</h2><p>This section is ready for you to extend as part of your CodeVedX project.</p><button className="primary-button" onClick={() => setActive('Dashboard')}>Back to dashboard</button>
        </section> : <>
          <section className="stats-grid">
            <StatCard title="Total Revenue" value="$48,250" change="12.8%" positive icon={CreditCard} tone="purple-tone" note="vs. last month" />
            <StatCard title="Total Orders" value="2,420" change="8.2%" positive icon={ShoppingBag} tone="blue-tone" note="vs. last month" />
            <StatCard title="Total Customers" value={String(users.length + 1240)} change="4.6%" positive icon={Users} tone="green-tone" note="vs. last month" />
            <StatCard title="Conversion Rate" value="3.24%" change="1.3%" positive={false} icon={TrendingUp} tone="orange-tone" note="vs. last month" />
          </section>

          <section className="charts-grid">
            <article className="panel revenue-panel">
              <div className="panel-heading">
                <div><h2>Revenue analytics</h2><p>Track your revenue performance over time</p></div>
                <div className="panel-controls"><div className="segmented-control"><button className={chartMode === 'Revenue' ? 'segment-active' : ''} onClick={() => setChartMode('Revenue')}>Revenue</button><button className={chartMode === 'Orders' ? 'segment-active' : ''} onClick={() => setChartMode('Orders')}>Orders</button></div>
                  <label className="select-wrap"><CalendarDays size={14} /><select value={period} onChange={e => setPeriod(e.target.value)} aria-label="Chart time period"><option>Last 12 months</option><option>Last 6 months</option><option>Last 3 months</option></select><ChevronDown size={14} /></label></div>
              </div>
              <div className="chart-summary"><strong>{chartMode === 'Revenue' ? '$48,250.00' : '405 orders'}</strong><span className="summary-change"><ArrowUpRight size={15} /> 12.8%</span><span className="summary-caption">compared to previous period</span></div>
              <div className="revenue-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData.slice(period === 'Last 3 months' ? -3 : period === 'Last 6 months' ? -6 : 0)} margin={{ top: 10, right: 8, left: -14, bottom: 0 }}>
                    <defs><linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7867f6" stopOpacity={0.2} /><stop offset="95%" stopColor="#7867f6" stopOpacity={0.01} /></linearGradient></defs>
                    <CartesianGrid strokeDasharray="3 5" vertical={false} stroke="#ececf4" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9295a8', fontSize: 11 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9295a8', fontSize: 11 }} tickFormatter={value => chartMode === 'Revenue' ? `$${value / 1000}k` : value} />
                    <Tooltip formatter={(value) => chartMode === 'Revenue' ? [money(value), 'Revenue'] : [value, 'Orders']} contentStyle={{ border: '1px solid #eeeeF5', borderRadius: 12, fontSize: 12, boxShadow: '0 8px 24px #2222' }} />
                    <Area type="monotone" dataKey={chartMode === 'Revenue' ? 'revenue' : 'orders'} stroke="#7867f6" strokeWidth={2.5} fill="url(#revenueFill)" activeDot={{ r: 5, strokeWidth: 0 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="chart-footer"><span><i className="legend-dot" /> {chartMode} this year</span><span><i className="legend-dot legend-muted" /> Previous year</span><span className="footer-insight"><TrendingUp size={14} /> Trending upward</span></div>
            </article>

            <article className="panel traffic-panel">
              <div className="panel-heading"><div><h2>Traffic sources</h2><p>Where your visitors come from</p></div><button className="more-button" aria-label="Traffic options" onClick={() => notify('Traffic report options')}><MoreHorizontal size={20} /></button></div>
              <div className="traffic-total"><strong>24,892</strong><span><ArrowUpRight size={14} /> 9.4%</span><small>total visitors</small></div>
              <div className="traffic-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={trafficData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={84} paddingAngle={4} stroke="none">{trafficData.map(item => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip formatter={value => [`${value}%`, 'Visitors']} /></PieChart></ResponsiveContainer><div className="donut-label"><strong>100%</strong><span>Traffic</span></div></div>
              <div className="traffic-legend">{trafficData.map(item => <div key={item.name} className="traffic-legend-row"><span><i style={{ background: item.color }} />{item.name}</span><strong>{item.value}%</strong></div>)}</div>
            </article>
          </section>

          <section className="panel users-panel">
            <div className="panel-heading users-heading">
              <div><h2>{active === 'Users' ? 'All users' : 'Recent users'}</h2><p>Manage your customers and team members</p></div>
              <div className="users-tools"><label className="filter-select"><Filter size={15} /><select value={userFilter} onChange={e => setUserFilter(e.target.value)} aria-label="Filter users"><option>All users</option><option>Active</option><option>Pending</option><option>Inactive</option></select><ChevronDown size={14} /></label><button className="secondary-button compact-button" onClick={exportUsers}><Download size={15} /> Export CSV</button></div>
            </div>
            <div className="table-wrap"><table><thead><tr><th><input type="checkbox" aria-label="Select all users" onChange={e => notify(e.target.checked ? 'All visible users selected' : 'Selection cleared')} /></th><th>USER</th><th>ROLE</th><th>STATUS</th><th>TOTAL SPENT</th><th className="table-action-heading">ACTION</th></tr></thead><tbody>
              {filteredUsers.map(user => <tr key={user.id}><td><input type="checkbox" aria-label={`Select ${user.name}`} /></td><td><div className="user-cell"><div className={`avatar avatar-${user.color}`}>{user.initials}</div><div><strong>{user.name}</strong><span>{user.email}</span></div></div></td><td><span className="role-text">{user.role}</span></td><td><span className={`status-pill status-${user.status.toLowerCase()}`}><i />{user.status}</span></td><td className="spent-cell">{user.spent}</td><td><button className="row-action" aria-label={`View ${user.name}`} onClick={() => notify(`Viewing ${user.name}'s profile`)}><Eye size={16} /></button><button className="row-action" aria-label={`More actions for ${user.name}`} onClick={() => { if (window.confirm(`Remove ${user.name} from this demo table?`)) { setUsers(current => current.filter(item => item.id !== user.id)); notify('User removed') } }}><MoreHorizontal size={17} /></button></td></tr>)}
              {filteredUsers.length === 0 && <tr><td colSpan="6" className="empty-state">No users match your search or filter.</td></tr>}
            </tbody></table></div>
            <div className="table-footer"><span>Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users</span><div><button disabled className="pagination-button">Previous</button><button className="pagination-button current-page">1</button><button className="pagination-button" onClick={() => notify('You are viewing all demo users')}>Next</button></div></div>
          </section>
          <footer className="page-footer"><span>© 2026 CodeVedX Studio. Built for learning.</span><span><i className="online-dot" /> All systems operational</span></footer>
        </>}
      </div>
    </main>

    {showAddUser && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setShowAddUser(false) }}><form className="user-modal" onSubmit={addUser}>
      <div className="modal-heading"><div><h2>Add a new user</h2><p>Enter the details to add them to the user list.</p></div><button type="button" className="icon-button" aria-label="Close dialog" onClick={() => setShowAddUser(false)}><X size={19} /></button></div>
      <label className="form-label">Full name<input autoFocus value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Alex Johnson" required /></label>
      <label className="form-label">Email address<input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="alex@example.com" required /></label>
      <div className="modal-actions"><button type="button" className="secondary-button" onClick={() => setShowAddUser(false)}>Cancel</button><button type="submit" className="primary-button"><UserPlus size={16} /> Add user</button></div>
    </form></div>}
    {toast && <div className="toast"><span><Check size={16} /></span>{toast}</div>}
  </div>
}

export default App
