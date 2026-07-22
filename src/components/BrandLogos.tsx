/* Simplified brand logos as inline SVGs for the integrations bar */

const size = { width: 32, height: 32 };

export const SalesforceLogo = () => (
  <svg {...size} viewBox="0 0 24 24" fill="none">
    <path d="M10 4.5a4.5 4.5 0 014.2 2.9A3.8 3.8 0 0118 6.5a3.8 3.8 0 013.8 3.8 3.8 3.8 0 01-3.8 3.8h-.2a3.2 3.2 0 01-3 4.4 3.2 3.2 0 01-2.4-1.1 3.5 3.5 0 01-2.9 1.6 3.5 3.5 0 01-3.2-2.1A3 3 0 012.2 14 3 3 0 012 11a3 3 0 013-3h.3A4.5 4.5 0 0110 4.5z" fill="#00A1E0"/>
  </svg>
);

export const HubSpotLogo = () => (
  <svg {...size} viewBox="0 0 24 24" fill="none">
    <path d="M16.5 7.5V5a1.5 1.5 0 10-3 0v2.5a4.5 4.5 0 00-2.2 1.5L5.7 5.4a1.7 1.7 0 10-1 1.2l5.5 3.5a4.5 4.5 0 000 3.8l-1.8 1.8a1.5 1.5 0 101 1l1.8-1.8a4.5 4.5 0 107.3-6.9zM15 16a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#FF7A59"/>
  </svg>
);

export const JiraLogo = () => (
  <svg {...size} viewBox="0 0 24 24" fill="none">
    <path d="M21.2 11.3L13 3l-1 1-7.2 7.3a1 1 0 000 1.4L12 20l7.2-7.3a1 1 0 000-1.4zM12 14.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#2684FF"/>
  </svg>
);

export const BambooHRLogo = () => (
  <svg {...size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3c-1 0-2 .8-2 2v6c0 1 .5 2 2 3s2-2 2-3V5c0-1.2-1-2-2-2z" fill="#73C41D"/>
    <path d="M8 8c-.8 0-1.5.8-1.5 2v4c0 1 .3 1.8 1.5 2.5S10 15 10 14v-4c0-1.2-.7-2-2-2zm8 0c-.8 0-1.5.8-1.5 2v4c0 1 .3 1.8 1.5 2.5s2-1.5 2-2.5v-4c0-1.2-.7-2-2-2z" fill="#73C41D" opacity=".7"/>
    <ellipse cx="12" cy="19" rx="6" ry="2" fill="#73C41D" opacity=".3"/>
  </svg>
);

export const HiBobLogo = () => (
  <svg {...size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="#E94E1B"/>
    <text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="800" fontFamily="system-ui">hi</text>
  </svg>
);

export const TeamsLogo = () => (
  <svg {...size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="14" height="14" rx="2" fill="#5B5FC7"/>
    <path d="M7 10h6M7 13h4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="18" cy="8" r="3" fill="#5B5FC7" opacity=".7"/>
    <rect x="16" y="12" width="5" height="6" rx="1.5" fill="#5B5FC7" opacity=".7"/>
  </svg>
);

export const SlackLogo = () => (
  <svg {...size} viewBox="0 0 24 24" fill="none">
    <path d="M6 14.5a1.5 1.5 0 01-1.5 1.5A1.5 1.5 0 013 14.5 1.5 1.5 0 014.5 13H6v1.5zm.75 0A1.5 1.5 0 018.25 13a1.5 1.5 0 011.5 1.5v3.75a1.5 1.5 0 01-1.5 1.5 1.5 1.5 0 01-1.5-1.5V14.5z" fill="#E01E5A"/>
    <path d="M9.5 6a1.5 1.5 0 01-1.5-1.5A1.5 1.5 0 019.5 3 1.5 1.5 0 0111 4.5V6H9.5zm0 .75a1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5H5.75a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011.5-1.5H9.5z" fill="#36C5F0"/>
    <path d="M18 9.5a1.5 1.5 0 011.5-1.5A1.5 1.5 0 0121 9.5a1.5 1.5 0 01-1.5 1.5H18V9.5zm-.75 0a1.5 1.5 0 01-1.5 1.5 1.5 1.5 0 01-1.5-1.5V5.75a1.5 1.5 0 011.5-1.5 1.5 1.5 0 011.5 1.5V9.5z" fill="#2EB67D"/>
    <path d="M14.5 18a1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5 1.5 1.5 0 01-1.5-1.5V18h1.5zm0-.75a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011.5-1.5h3.75a1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5H14.5z" fill="#ECB22E"/>
  </svg>
);

export const WorkdayLogo = () => (
  <svg {...size} viewBox="0 0 24 24" fill="none">
    <path d="M4 14a8 8 0 0116 0" stroke="#F38B00" strokeWidth="2.4" strokeLinecap="round"/>
    <path d="M7.6 14a4.4 4.4 0 018.8 0" stroke="#0875E1" strokeWidth="2.4" strokeLinecap="round"/>
    <circle cx="12" cy="17" r="2" fill="#0875E1"/>
  </svg>
);

export const SAPLogo = () => (
  <svg {...size} viewBox="0 0 24 24" fill="none">
    <path d="M2 7h20l-5.5 10H2V7z" fill="#0FAAFF"/>
    <text x="9.5" y="13.8" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="800" fontFamily="system-ui">SAP</text>
  </svg>
);

export const ADPLogo = () => (
  <svg {...size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="7" width="20" height="10" rx="2.5" fill="#D0271D"/>
    <text x="12" y="14.4" textAnchor="middle" fill="#fff" fontSize="6.5" fontWeight="800" fontFamily="system-ui">ADP</text>
  </svg>
);

export const GoogleWorkspaceLogo = () => (
  <svg {...size} viewBox="0 0 24 24" fill="none">
    <path d="M12 11v4h6.3a6.5 6.5 0 01-2.8 3.4L12 11z" fill="#4285F4"/>
    <path d="M5.3 14.7A7 7 0 0112 5c1.7 0 3.2.6 4.4 1.6L14 9a4 4 0 00-6.5 3l-2.2 2.7z" fill="#EA4335"/>
    <path d="M12 19a7 7 0 005.5-2.6L15.1 14A4 4 0 0112 15a4 4 0 01-3.7-2.3L5.3 14.7A7 7 0 0012 19z" fill="#34A853"/>
    <path d="M5.3 9.3A7 7 0 005 12c0 .9.2 1.8.5 2.7l3-2.3A4 4 0 018 12c0-.5.1-1 .2-1.4l-2.9-1.3z" fill="#FBBC05"/>
  </svg>
);
