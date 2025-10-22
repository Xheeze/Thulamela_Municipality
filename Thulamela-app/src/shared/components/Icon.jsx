
// Icon components using heroicons
import { 
  DocumentArrowUpIcon,
  CalendarDaysIcon,
  ChatBubbleBottomCenterTextIcon,
  UserIcon,
  DocumentCheckIcon,
  ClockIcon,
  QrCodeIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  HomeModernIcon,
  BanknotesIcon,
  TruckIcon,
  BuildingLibraryIcon,
  UsersIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

export const Icons = {
  Upload: DocumentArrowUpIcon,
  Calendar: CalendarDaysIcon,
  Feedback: ChatBubbleBottomCenterTextIcon,
  Profile: UserIcon,
  Document: DocumentCheckIcon,
  Queue: ClockIcon,
  Ticket: QrCodeIcon,
  Settings: Cog6ToothIcon,
  Dashboard: ChartBarIcon,
  Staff: UserGroupIcon,
  Tenders: DocumentCheckIcon,
  Employment: BriefcaseIcon,
  Planning: HomeModernIcon,
  Finance: BanknotesIcon,
  Traffic: TruckIcon,
  Facilities: BuildingOfficeIcon,
  Community: UsersIcon,
  Education: AcademicCapIcon
}

export default function Icon({ name, size = 24, color = 'currentColor', style = {}, className = '', ...props }) {
  const IconComponent = Icons[name]
  if (!IconComponent) return null
  return (
    <IconComponent
      className={className}
      style={{ width: size, height: size, color, ...style }}
      aria-label={name}
      {...props}
    />
  )
}