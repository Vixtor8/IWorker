const brandPrimary = '#30391F' 
const brandPrimaryDisabled = `${brandPrimary}a8`
const brandPrimaryTap = '464646'
const brandSecondary = '#668A4C'
const brandSecondaryTap = '#EAB607'
const brandSuccess = '#95be05'
const brandBackground = '#ACCC7B'
const flashStyle = { paddingTop: 50, fontSize: 20 }
const flashTextStyle = { fontSize: 18 }

const navigationTheme = {
  dark: false,
  colors: {
    primary: brandSecondary,
    background: brandBackground,
    card: brandPrimary,
    text: '#ffffff',
    border: `${brandPrimary}99`,
    notification: `${brandSecondaryTap}ff` 
  }
}

export { navigationTheme, brandPrimary, brandPrimaryTap, brandSecondary, brandSecondaryTap, brandSuccess, brandBackground, flashStyle, flashTextStyle, brandPrimaryDisabled }
