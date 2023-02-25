import icons from '~/icons'

const iconComponents = icons.map((icon) => {
  return { name: icon, component: require(`~/icons/${icon}.svg?inline`) }
}).reduce((val, { name, component }) => {
  val[name] = { component }
  return val
}, {})

export default {
  icons: {
    iconfont: 'mdi',
    values: iconComponents,
  },
  defaultAssets: false,
  theme: {
    light: true,
    options: { customProperties: true },
    themes: {
      light: {
        brand: '#193F66',
        primary: '#27325E',
        secondary: '#1FC1C3',
        brand2: '#75DDDD',
        brand3: '#4368FA',
        background: '#F7F7F7',
        info: {
          lighten5: '#F8FAFC',
          lighten4: '#F1F5F9',
          lighten3: '#E2E8F0',
          lighten2: '#CBD5E1',
          lighten1: '#94A3B8',
          base: '#64748B',
          darken1: '#475569',
          darken2: '#334155',
          darken3: '#1E293B',
          darken4: '#0F172A',
          darken5: '#848DB0',
        },
        success: {
          lighten5: '#ECFDF5',
          lighten4: '#D1FAE5',
          lighten3: '#A7F3D0',
          lighten2: '#6EE7B7',
          lighten1: '#34D399',
          base: '#10B981',
          darken1: '#059669',
          darken2: '#047857',
          darken3: '#065F46',
          darken4: '#064E3B',
        },
        warning: {
          lighten5: '#FFFBEB',
          lighten4: '#FEF3C7',
          lighten3: '#FDE68A',
          lighten2: '#FCD34D',
          base: '#F59E0B',
          darken1: '#D97706',
          darken2: '#B45309',
          darken3: '#92400E',
          darken4: '#78350F',
        },
        error: {
          lighten5: '#FEF2F2',
          lighten4: '#FEE2E2',
          lighten3: '#FECACA',
          lighten2: '#FCA5A5',
          lighten1: '#F87171',
          base: '#EF4444',
          darken1: '#DC2626',
          darken2: '#B91C1C',
          darken3: '#991B1B',
          darken4: '#991B1B',
        },
        neutral: {
          lighten2: '#EDF0F3',
          lighten1: '#DADFE6',
          base: '#C4C9D0',
          darken1: '#8C929A',
        },
      },
    },
  },
}
