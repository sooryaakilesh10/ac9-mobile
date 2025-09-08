import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  profilePicture: string;
  isCheckedIn: boolean;
  lastCheckIn?: string;
  checkInMethod?: 'location' | 'wifi';
}

interface Leave {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
}

interface Complaint {
  id: string;
  type: string;
  description: string;
  status: 'submitted' | 'in-progress' | 'resolved';
  submittedDate: string;
  image?: string;
}

interface AppState {
  user: User;
  leaves: Leave[];
  complaints: Complaint[];
  notifications: Array<{
    id: string;
    type: 'info' | 'warning' | 'error' | 'success';
    message: string;
    timestamp: string;
  }>;
  integrations: {
    slack: boolean;
    github: boolean;
    googleCalendar: boolean;
  };
}

type AppAction =
  | { type: 'CHECK_IN'; method: 'location' | 'wifi' }
  | { type: 'CHECK_OUT' }
  | { type: 'ADD_LEAVE'; leave: Omit<Leave, 'id' | 'appliedDate' | 'status'> }
  | { type: 'ADD_COMPLAINT'; complaint: Omit<Complaint, 'id' | 'submittedDate' | 'status'> }
  | { type: 'TOGGLE_INTEGRATION'; service: keyof AppState['integrations'] }
  | { type: 'UPDATE_PROFILE'; updates: Partial<User> };

const initialState: AppState = {
  user: {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Engineering',
    role: 'Senior Frontend Developer',
    profilePicture: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
    isCheckedIn: false,
  },
  leaves: [
    {
      id: '1',
      type: 'Annual Leave',
      startDate: '2025-01-20',
      endDate: '2025-01-22',
      reason: 'Family vacation',
      status: 'approved',
      appliedDate: '2025-01-10',
    },
    {
      id: '2',
      type: 'Sick Leave',
      startDate: '2025-01-15',
      endDate: '2025-01-15',
      reason: 'Medical appointment',
      status: 'pending',
      appliedDate: '2025-01-12',
    },
  ],
  complaints: [
    {
      id: '1',
      type: 'Food Quality',
      description: 'The lunch menu needs more vegetarian options',
      status: 'in-progress',
      submittedDate: '2025-01-10',
    },
  ],
  notifications: [
    {
      id: '1',
      type: 'info',
      message: 'Your leave request has been approved',
      timestamp: '2025-01-12T10:30:00Z',
    },
    {
      id: '2',
      type: 'warning',
      message: 'Remember to check in for today',
      timestamp: '2025-01-12T09:00:00Z',
    },
    {
      id: '3',
      type: 'success',
      message: 'Your complaint has been resolved',
      timestamp: '2025-01-11T16:45:00Z',
    },
    {
      id: '4',
      type: 'info',
      message: 'New company policy update available',
      timestamp: '2025-01-11T14:20:00Z',
    },
    {
      id: '5',
      type: 'warning',
      message: 'Upcoming deadline for quarterly review',
      timestamp: '2025-01-11T11:15:00Z',
    },
    {
      id: '6',
      type: 'info',
      message: 'Team meeting scheduled for tomorrow',
      timestamp: '2025-01-10T18:30:00Z',
    },
    {
      id: '7',
      type: 'success',
      message: 'Your GitHub integration is now active',
      timestamp: '2025-01-10T15:22:00Z',
    },
  ],
  integrations: {
    slack: true,
    github: false,
    googleCalendar: true,
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'CHECK_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isCheckedIn: true,
          lastCheckIn: new Date().toISOString(),
          checkInMethod: action.method,
        },
      };
    case 'CHECK_OUT':
      return {
        ...state,
        user: {
          ...state.user,
          isCheckedIn: false,
        },
      };
    case 'ADD_LEAVE':
      return {
        ...state,
        leaves: [
          ...state.leaves,
          {
            ...action.leave,
            id: Date.now().toString(),
            appliedDate: new Date().toISOString(),
            status: 'pending',
          },
        ],
      };
    case 'ADD_COMPLAINT':
      return {
        ...state,
        complaints: [
          ...state.complaints,
          {
            ...action.complaint,
            id: Date.now().toString(),
            submittedDate: new Date().toISOString(),
            status: 'submitted',
          },
        ],
      };
    case 'TOGGLE_INTEGRATION':
      return {
        ...state,
        integrations: {
          ...state.integrations,
          [action.service]: !state.integrations[action.service],
        },
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.updates,
        },
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children, initialUser }: { children: ReactNode; initialUser?: User }) {
  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    user: initialUser || initialState.user
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}