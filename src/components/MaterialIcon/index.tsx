import React from 'react';
// Importar ícones do Material UI que correspondem aos emojis usados na documentação
import {
  Rocket as RocketIcon,
  Book as BookIcon,
  Link as LinkIcon,
  Lightbulb as LightbulbIcon,
  Handshake as HandshakeIcon,
  Bolt as BoltIcon,
  Refresh as RefreshIcon,
  AutoAwesome as SparklesIcon,
  BarChart as ChartIcon,
  GpsFixed as TargetIcon,
  Build as BuildIcon,
  Assignment as AssignmentIcon,
  PlayArrow as PlayIcon,
  Computer as ComputerIcon,
  PhoneAndroid as PhoneIcon,
  Star as StarIcon,
  Favorite as HeartIcon,
  Flag as FlagIcon,
  Hub as HubIcon,
  Speed as SpeedIcon,
  Timeline as TimelineIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  CheckCircle as CheckIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Public as PublicIcon,
  Code as CodeIcon,
  DataObject as DataIcon,
  Storage as StorageIcon,
  CloudDownload as DownloadIcon,
  CloudUpload as UploadIcon,
  Sync as SyncIcon,
  Transform as TransformIcon,
  Webhook as WebhookIcon,
  Api as ApiIcon,
  IntegrationInstructions as IntegrationIcon,
  Schedule as ScheduleIcon,
  NotificationsActive as NotificationIcon,
  Security as SecurityIcon,
  Monitor as MonitoringIcon,
  BugReport as BugIcon,
  Description as DocsIcon,
  QuestionMark as QuestionIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Launch as LaunchIcon,
  OpenInNew as OpenIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  KeyboardArrowRight as ArrowRightIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  ViewList as ListIcon,
  ViewModule as GridIcon,
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Done as DoneIcon,
  ContentCopy as CopyIcon,
  Share as ShareIcon,
  GetApp as GetAppIcon,
  Publish as PublishIcon,
  CloudQueue as CloudIcon,
  DeviceHub as DeviceIcon,
  Extension as ExtensionIcon,
  Category as CategoryIcon,
  Label as LabelIcon,
  LocalOffer as OfferIcon,
  SmartToy as RobotIcon,
  Stop as StopIcon,
} from '@mui/icons-material';

// Interface para as props do componente
interface MaterialIconProps {
  /** Nome do ícone do Material Design */
  icon: string;
  /** Tamanho do ícone */
  size?: number;
  /** Cor do ícone */
  color?: string;
  /** Classe CSS personalizada */
  className?: string;
  /** Estilo inline */
  style?: React.CSSProperties;
  /** Função onClick */
  onClick?: () => void;
}

// Mapeamento de emojis para nomes de ícones Material Design
const emojiToIconMap: Record<string, string> = {
  // Ação e tecnologia
  '🚀': 'rocket_launch',
  '⚡': 'bolt',
  '🔄': 'refresh',
  '✨': 'auto_awesome',
  '🔗': 'link',
  '🛠️': 'build',
  '🔧': 'settings',
  '⚙️': 'settings',
  
  // Documentação e informação
  '📚': 'menu_book',
  '📋': 'assignment',
  '📊': 'bar_chart',
  '📈': 'trending_up',
  '📉': 'trending_down',
  '📝': 'edit',
  '📄': 'description',
  '📁': 'folder',
  '📂': 'folder_open',
  '🗂️': 'folder_special',
  '🗃️': 'storage',
  
  // Interface e mídia
  '🎬': 'play_arrow',
  '🎯': 'gps_fixed',
  '🎨': 'palette',
  '🖥️': 'computer',
  '💻': 'laptop_mac',
  '📱': 'phone_android',
  '🌟': 'star',
  '💡': 'lightbulb',
  
  // Pessoas e relacionamento
  '🤝': 'handshake',
  '👥': 'group',
  '👤': 'person',
  '❤️': 'favorite',
  '💙': 'favorite',
  '💚': 'favorite',
  
  // Localização e países
  '🇧🇷': 'flag',
  '🌍': 'public',
  '🌎': 'language',
  '🌏': 'travel_explore',
  
  // Status e feedback
  '✅': 'check_circle',
  '❌': 'cancel',
  '⚠️': 'warning',
  '🔴': 'error',
  '🟢': 'check_circle',
  '🟡': 'warning',
  '🔵': 'info',
  
  // Ferramentas e utilitários
  '🔍': 'search',
  '📦': 'inventory_2',
  '📤': 'upload',
  '📥': 'download',
  '💾': 'save',
  '🗑️': 'delete',
  '🔀': 'sync',
  '🔁': 'sync',
  
  // Desenvolvimento
  '🔌': 'extension',
  '🌐': 'language',
  '📡': 'router',
  '🔒': 'lock',
  '🔓': 'lock_open',
  
  // Navegação
  '🏠': 'home',
  '🔙': 'arrow_back',
  '▶️': 'play_arrow',
  '▲': 'keyboard_arrow_up',
  '▼': 'keyboard_arrow_down',
  '◀️': 'keyboard_arrow_left',
  '➡️': 'keyboard_arrow_right',
  
  // Outros
  '🎉': 'celebration',
  '🎊': 'party_mode',
  '🔥': 'whatshot',
  '💫': 'auto_awesome',
  '⭐': 'star',
  '🌈': 'gradient',
  '🎪': 'festival',
  '🎭': 'theater_comedy',
  '🤖': 'smart_toy',
  '⏹️': 'stop',
  '⏸️': 'pause',
  '⏯️': 'pause',
  '🔇': 'volume_off',
  '🔊': 'volume_up',
  '🎵': 'music_note',
  '🎶': 'library_music',
  '📺': 'tv',
  '📻': 'radio',
  '📞': 'phone',
  '📧': 'email',
  '📬': 'mail',
  '📭': 'mail_outline',
  '📮': 'markunread_mailbox',
  '📯': 'campaign',
  '📰': 'newspaper',
  '💰': 'attach_money',
  '💸': 'money_off',
  '💳': 'credit_card',
  '🛒': 'shopping_cart',
  '🛍️': 'shopping_bag',
  '🎁': 'card_giftcard',
  '🏆': 'emoji_events',
  '🥇': 'military_tech',
  '🏅': 'workspace_premium',
  '🎖️': 'military_tech',
  '🏵️': 'local_florist',
  '🎗️': 'volunteer_activism',
  '🎟️': 'confirmation_number',
  '🎫': 'local_activity',
  '🗓️': 'event',
  '📅': 'calendar_today',
  '📆': 'date_range',
  '🕐': 'schedule',
  '⏰': 'alarm',
  '⏲️': 'timer',
  '⏱️': 'timer',
  '🧭': 'explore',
  '🗺️': 'map',
  '🗾': 'terrain',
  '🏔️': 'landscape',
  '⛰️': 'terrain',
  '🌋': 'volcano',
  '🏕️': 'nature',
  '🏖️': 'beach_access',
  '🏜️': 'landscape',
  '🏞️': 'park',
  '🏟️': 'stadium',
  '🏛️': 'account_balance',
  '🏗️': 'construction',
  '🏘️': 'location_city',
  '🏚️': 'home',
  '🏡': 'cottage',
  '🏢': 'business',
  '🏣': 'business_center',
  '🏤': 'local_post_office',
  '🏥': 'local_hospital',
  '🏦': 'account_balance',
  '🏧': 'atm',
  '🏨': 'hotel',
  '🏩': 'love_hotel',
  '🏪': 'store',
  '🏫': 'school',
  '🏬': 'local_mall',
  '🏭': 'factory',
  '🏮': 'lantern',
  '🏯': 'castle',
  '🏰': 'castle',
};

// URLs dos ícones Material Design
const getIconSvg = (iconName: string, size: number = 24, color: string = 'currentColor'): string => {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" height="${size}" viewBox="0 -960 960 960" width="${size}" fill="${color}">
      <use href="https://fonts.gstatic.com/s/i/short-term/release/materialsymbols/outlined/default/24px.svg#${iconName}"/>
    </svg>
  `;
};

// Função para obter o SVG do ícone usando Google Material Symbols
const getMaterialIconSvg = (iconName: string): string => {
  // Mapear ícones específicos para seus SVG paths
  const iconPaths: Record<string, string> = {
    rocket_launch: 'M240-160v-160q0-33 23.5-56.5T320-400h120v-80H160v-80h280v-80H160v-80h280v-120q0-33 23.5-56.5T520-920h120q33 0 56.5 23.5T720-840v120h120v80H720v80h120v80H720v80h120q33 0 56.5 23.5T840-320v160H240Zm280-560h120v-120H520v120Zm200 480v-80H600v80h120ZM520-400h120v-320H520v320ZM320-240h120v-80H320v80Z',
    bolt: 'M280-80 160-460h160L280-880l440 360H560l160 440H280Zm200-480Zm-80 320h160l-120-280 80-120H360l120 280-80 120Z',
    refresh: 'M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v240H560v-80h110q-35-45-85-72.5T480-740q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-25 113-118 181.5T480-160Z',
    auto_awesome: 'M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z',
    link: 'M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z',
    menu_book: 'M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640H560v280l-80-40-80 40v-280H240v640Zm0 0v-640 640Zm160-360 80-40 80 40-80-40-80 40Z',
    assignment: 'M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-800h320l240 240v400q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z',
    home: 'M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z',
    search: 'M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z',
    settings: 'M580-40q-25 0-42.5-17.5T520-100v-280q0-25 17.5-42.5T580-440h280q25 0 42.5 17.5T920-380v280q0 25-17.5 42.5T860-40H580Zm140-120q25 0 42.5-17.5T780-220q0-25-17.5-42.5T720-280q-25 0-42.5 17.5T660-220q0 25 17.5 42.5T720-160Zm-320-40q-66 0-113-47t-47-113v-400q0-66 47-113t113-47h400q66 0 113 47t47 113v140h-80v-140q0-33-23.5-56.5T800-840H400q-33 0-56.5 23.5T320-760v400q0 33 23.5 56.5T400-280h140v80H400Z',
    check_circle: 'M280-240q-100 0-170-70T40-480q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm-36-84 184-184-56-56-128 128-56-56-56 56 112 112Zm36-116Z',
    star: 'M233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z',
    favorite: 'M480-120 120-480l360-360 360 360-360 360Zm0-114 246-246-246-246-246 246 246 246Zm0-246Z',
    // Adicionar mais ícones conforme necessário
  };

  return iconPaths[iconName] || iconPaths['star']; // fallback para star
};

const MaterialIcon: React.FC<MaterialIconProps> = ({
  icon,
  size = 24,
  color = 'currentColor',
  className,
  style,
  onClick,
}) => {
  const iconPath = getMaterialIconSvg(icon);
  
  const svgStyle = {
    width: size,
    height: size,
    fill: color,
    display: 'inline-block',
    verticalAlign: 'middle',
    ...style,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 -960 960 960"
      width={size}
      className={className}
      style={svgStyle}
      onClick={onClick}
    >
      <path d={iconPath} />
    </svg>
  );
};

// Componente auxiliar para usar com emojis
export const EmojiIcon: React.FC<{
  emoji: string;
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}> = ({ emoji, ...props }) => {
  const iconName = emojiToIconMap[emoji] || 'star';
  return <MaterialIcon icon={iconName} {...props} />;
};

export default MaterialIcon; 