import React, { useState } from 'react';
import { Code, GitBranch, Rocket, Activity, Database, Shield, Settings, Play, Pause, RotateCcw, AlertTriangle, CheckCircle, Clock, Zap, Server, Monitor, Terminal, Package, Users, Eye, ExternalLink } from 'lucide-react';

interface Pipeline {
  id: string;
  name: string;
  status: 'running' | 'success' | 'failed' | 'pending';
  branch: string;
  commit: string;
  author: string;
  duration: string;
  timestamp: string;
  environment: 'development' | 'staging' | 'production';
}

interface Service {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
  version: string;
  cpu: number;
  memory: number;
  requests: number;
  errors: number;
}

interface Environment {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'deploying';
  url: string;
  version: string;
  lastDeployed: string;
  deployedBy: string;
}

const DeveloperPlatform = () => {
  const [activeTab, setActiveTab] = useState<'pipelines' | 'services' | 'environments' | 'monitoring'>('pipelines');
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState('staging');
  const [selectedBranch, setSelectedBranch] = useState('main');

  // Mock data
  const pipelines: Pipeline[] = [
    {
      id: '1',
      name: 'company-hub-frontend',
      status: 'success',
      branch: 'main',
      commit: 'a1b2c3d',
      author: 'Sarah Johnson',
      duration: '3m 24s',
      timestamp: '2025-01-13T10:30:00Z',
      environment: 'production'
    },
    {
      id: '2',
      name: 'company-hub-api',
      status: 'running',
      branch: 'feature/auth-improvements',
      commit: 'e4f5g6h',
      author: 'Mike Chen',
      duration: '1m 45s',
      timestamp: '2025-01-13T11:15:00Z',
      environment: 'staging'
    },
    {
      id: '3',
      name: 'company-hub-mobile',
      status: 'failed',
      branch: 'develop',
      commit: 'i7j8k9l',
      author: 'Emma Davis',
      duration: '2m 12s',
      timestamp: '2025-01-13T09:45:00Z',
      environment: 'development'
    },
    {
      id: '4',
      name: 'company-hub-backend',
      status: 'pending',
      branch: 'hotfix/security-patch',
      commit: 'm0n1o2p',
      author: 'Alex Rodriguez',
      duration: '-',
      timestamp: '2025-01-13T11:30:00Z',
      environment: 'staging'
    }
  ];

  const services: Service[] = [
    {
      id: '1',
      name: 'Frontend App',
      status: 'healthy',
      uptime: '99.9%',
      version: 'v1.2.3',
      cpu: 45,
      memory: 62,
      requests: 1247,
      errors: 2
    },
    {
      id: '2',
      name: 'API Gateway',
      status: 'healthy',
      uptime: '99.8%',
      version: 'v2.1.0',
      cpu: 38,
      memory: 71,
      requests: 3456,
      errors: 8
    },
    {
      id: '3',
      name: 'Auth Service',
      status: 'warning',
      uptime: '98.5%',
      version: 'v1.5.2',
      cpu: 72,
      memory: 85,
      requests: 892,
      errors: 23
    },
    {
      id: '4',
      name: 'Database',
      status: 'healthy',
      uptime: '99.9%',
      version: 'v14.2',
      cpu: 28,
      memory: 54,
      requests: 2134,
      errors: 1
    },
    {
      id: '5',
      name: 'File Storage',
      status: 'critical',
      uptime: '95.2%',
      version: 'v3.0.1',
      cpu: 89,
      memory: 94,
      requests: 567,
      errors: 45
    }
  ];

  const environments: Environment[] = [
    {
      id: '1',
      name: 'Production',
      status: 'active',
      url: 'https://company-hub.com',
      version: 'v1.2.3',
      lastDeployed: '2025-01-13T10:30:00Z',
      deployedBy: 'Sarah Johnson'
    },
    {
      id: '2',
      name: 'Staging',
      status: 'deploying',
      url: 'https://staging.company-hub.com',
      version: 'v1.2.4-rc.1',
      lastDeployed: '2025-01-13T11:15:00Z',
      deployedBy: 'Mike Chen'
    },
    {
      id: '3',
      name: 'Development',
      status: 'active',
      url: 'https://dev.company-hub.com',
      version: 'v1.3.0-dev',
      lastDeployed: '2025-01-13T09:20:00Z',
      deployedBy: 'Emma Davis'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'healthy':
      case 'active':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'running':
      case 'deploying':
        return <Clock className="text-blue-600" size={16} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-600" size={16} />;
      case 'failed':
      case 'critical':
        return <AlertTriangle className="text-red-600" size={16} />;
      case 'inactive':
        return <Pause className="text-gray-600" size={16} />;
      default:
        return <Clock className="text-gray-600" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
      case 'healthy':
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'running':
      case 'deploying':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDeploy = () => {
    // In a real app, this would trigger deployment
    setShowDeployModal(false);
    console.log(`Deploying ${selectedBranch} to ${selectedEnvironment}`);
  };

  const handleRestartService = (serviceId: string) => {
    // In a real app, this would restart the service
    console.log(`Restarting service ${serviceId}`);
  };

  const handleRetryPipeline = (pipelineId: string) => {
    // In a real app, this would retry the pipeline
    console.log(`Retrying pipeline ${pipelineId}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-amber-200/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-64 left-20 w-12 h-12 bg-orange-200/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-8 w-24 h-24 bg-yellow-300/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-20 left-12 w-14 h-14 bg-amber-300/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Geometric Patterns */}
        <div className="absolute top-20 right-4 w-8 h-8 border-2 border-yellow-300/40 rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-32 left-6 w-6 h-6 border-2 border-amber-400/30 rotate-12 animate-spin" style={{ animationDuration: '12s' }}></div>
        
        {/* Wave Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-100/50 to-transparent">
          <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="rgba(251, 191, 36, 0.1)"></path>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 pb-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Developer Platform</h1>
            <p className="text-gray-600 mt-1">Deploy, monitor, and manage applications</p>
          </div>
          <button
            onClick={() => setShowDeployModal(true)}
            className="flex items-center space-x-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <Rocket size={18} />
            <span>Deploy</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-100/80 backdrop-blur-sm rounded-lg p-1 shadow-lg overflow-x-auto">
          <button
            onClick={() => setActiveTab('pipelines')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'pipelines' 
                ? 'bg-white text-yellow-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <GitBranch size={16} />
            <span>Pipelines</span>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'services' 
                ? 'bg-white text-yellow-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Server size={16} />
            <span>Services</span>
          </button>
          <button
            onClick={() => setActiveTab('environments')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'environments' 
                ? 'bg-white text-yellow-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Package size={16} />
            <span>Environments</span>
          </button>
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'monitoring' 
                ? 'bg-white text-yellow-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Monitor size={16} />
            <span>Monitoring</span>
          </button>
        </div>

        {/* Pipelines Tab */}
        {activeTab === 'pipelines' && (
          <div className="space-y-4">
            {/* Pipeline Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-green-50/80 backdrop-blur-sm rounded-xl border border-green-200 text-center shadow-lg">
                <CheckCircle className="text-green-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-green-600">
                  {pipelines.filter(p => p.status === 'success').length}
                </p>
                <p className="text-sm text-gray-600">Successful</p>
              </div>
              <div className="p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200 text-center shadow-lg">
                <Clock className="text-blue-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-blue-600">
                  {pipelines.filter(p => p.status === 'running').length}
                </p>
                <p className="text-sm text-gray-600">Running</p>
              </div>
              <div className="p-4 bg-red-50/80 backdrop-blur-sm rounded-xl border border-red-200 text-center shadow-lg">
                <AlertTriangle className="text-red-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-red-600">
                  {pipelines.filter(p => p.status === 'failed').length}
                </p>
                <p className="text-sm text-gray-600">Failed</p>
              </div>
              <div className="p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200 text-center shadow-lg">
                <Pause className="text-gray-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-gray-600">
                  {pipelines.filter(p => p.status === 'pending').length}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>

            {/* Pipeline List */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Recent Pipelines</h2>
              {pipelines.map((pipeline) => (
                <div key={pipeline.id} className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Code className="text-gray-600" size={20} />
                      <div>
                        <h3 className="font-semibold text-gray-900">{pipeline.name}</h3>
                        <p className="text-sm text-gray-600">
                          {pipeline.branch} • {pipeline.commit} • by {pipeline.author}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(pipeline.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(pipeline.status)}`}>
                        {pipeline.status.charAt(0).toUpperCase() + pipeline.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>Duration: {pipeline.duration}</span>
                      <span>Environment: {pipeline.environment}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{new Date(pipeline.timestamp).toLocaleTimeString()}</span>
                      {pipeline.status === 'failed' && (
                        <button
                          onClick={() => handleRetryPipeline(pipeline.id)}
                          className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-700"
                        >
                          <RotateCcw size={14} />
                          <span>Retry</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            {/* Service Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-green-50/80 backdrop-blur-sm rounded-xl border border-green-200 text-center shadow-lg">
                <CheckCircle className="text-green-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-green-600">
                  {services.filter(s => s.status === 'healthy').length}
                </p>
                <p className="text-sm text-gray-600">Healthy</p>
              </div>
              <div className="p-4 bg-yellow-50/80 backdrop-blur-sm rounded-xl border border-yellow-200 text-center shadow-lg">
                <AlertTriangle className="text-yellow-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-yellow-600">
                  {services.filter(s => s.status === 'warning').length}
                </p>
                <p className="text-sm text-gray-600">Warning</p>
              </div>
              <div className="p-4 bg-red-50/80 backdrop-blur-sm rounded-xl border border-red-200 text-center shadow-lg">
                <AlertTriangle className="text-red-600 mx-auto mb-2" size={20} />
                <p className="text-2xl font-bold text-red-600">
                  {services.filter(s => s.status === 'critical').length}
                </p>
                <p className="text-sm text-gray-600">Critical</p>
              </div>
            </div>

            {/* Service List */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Service Status</h2>
              {services.map((service) => (
                <div key={service.id} className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Server className="text-gray-600" size={20} />
                      <div>
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-600">
                          {service.version} • Uptime: {service.uptime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(service.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(service.status)}`}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">CPU</span>
                        <span className="font-medium">{service.cpu}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            service.cpu > 80 ? 'bg-red-500' : 
                            service.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${service.cpu}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Memory</span>
                        <span className="font-medium">{service.memory}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            service.memory > 80 ? 'bg-red-500' : 
                            service.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${service.memory}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>Requests: {service.requests.toLocaleString()}</span>
                      <span className={service.errors > 10 ? 'text-red-600' : ''}>
                        Errors: {service.errors}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRestartService(service.id)}
                      className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-700"
                    >
                      <RotateCcw size={14} />
                      <span>Restart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Environments Tab */}
        {activeTab === 'environments' && (
          <div className="space-y-4">
            {/* Environment List */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Deployment Environments</h2>
              {environments.map((env) => (
                <div key={env.id} className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Package className="text-gray-600" size={20} />
                      <div>
                        <h3 className="font-semibold text-gray-900">{env.name}</h3>
                        <p className="text-sm text-gray-600">
                          {env.version} • Deployed by {env.deployedBy}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(env.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(env.status)}`}>
                        {env.status.charAt(0).toUpperCase() + env.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span>Last deployed: {new Date(env.lastDeployed).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a
                        href={env.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink size={14} />
                        <span>Visit</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <div className="space-y-4">
            {/* System Overview */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Activity className="text-green-600" size={20} />
                  <h3 className="font-semibold text-gray-900">System Health</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Overall Status</span>
                    <span className="text-green-600 font-medium">Healthy</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Uptime</span>
                    <span className="font-medium">99.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-medium">245ms</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Zap className="text-yellow-600" size={20} />
                  <h3 className="font-semibold text-gray-900">Performance</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Requests/min</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Error Rate</span>
                    <span className="font-medium">0.02%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Throughput</span>
                    <span className="font-medium">2.4 MB/s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
              <div className="space-y-2">
                <div className="p-3 bg-yellow-50/90 backdrop-blur-sm rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="text-yellow-600" size={16} />
                    <span className="text-sm font-medium text-yellow-800">High CPU usage on Auth Service</span>
                  </div>
                  <p className="text-xs text-yellow-700 mt-1">CPU usage at 72% for the last 10 minutes</p>
                </div>
                <div className="p-3 bg-red-50/90 backdrop-blur-sm rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="text-red-600" size={16} />
                    <span className="text-sm font-medium text-red-800">File Storage service critical</span>
                  </div>
                  <p className="text-xs text-red-700 mt-1">Memory usage at 94%, immediate attention required</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50/90 backdrop-blur-sm rounded-xl border border-blue-200 hover:bg-blue-100/90 transition-colors text-left">
                <div className="flex items-center space-x-2 mb-2">
                  <Terminal className="text-blue-600" size={20} />
                  <span className="font-semibold text-gray-900">View Logs</span>
                </div>
                <p className="text-sm text-gray-600">Access application and system logs</p>
              </button>
              <button className="p-4 bg-purple-50/90 backdrop-blur-sm rounded-xl border border-purple-200 hover:bg-purple-100/90 transition-colors text-left">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="text-purple-600" size={20} />
                  <span className="font-semibold text-gray-900">Metrics Dashboard</span>
                </div>
                <p className="text-sm text-gray-600">View detailed performance metrics</p>
              </button>
            </div>
          </div>
        )}

        {/* Deploy Modal */}
        {showDeployModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Deploy Application</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Environment</label>
                  <select
                    value={selectedEnvironment}
                    onChange={(e) => setSelectedEnvironment(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    <option value="development">Development</option>
                    <option value="staging">Staging</option>
                    <option value="production">Production</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    <option value="main">main</option>
                    <option value="develop">develop</option>
                    <option value="feature/auth-improvements">feature/auth-improvements</option>
                    <option value="hotfix/security-patch">hotfix/security-patch</option>
                  </select>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-0.5" size={16} />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Deployment Warning</p>
                      <p className="text-xs text-yellow-700 mt-1">
                        {selectedEnvironment === 'production' 
                          ? 'This will deploy to production. Please ensure all tests pass.'
                          : `This will deploy to ${selectedEnvironment} environment.`
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowDeployModal(false)}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeploy}
                    className="flex-1 py-3 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Rocket size={16} />
                    <span>Deploy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperPlatform;