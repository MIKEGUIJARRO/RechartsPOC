enum COLORS {
    'OrangePrimary' = '#F06000',
    'OrangeDark' = '#BD4C00',
    'OrangeMedium' = '#F9BF99',
    'OrangeLight' = '#FEEFE5',
};

interface ClimateEntitiesI {
    colors: {
        primary: COLORS
        dark: COLORS
        medium: COLORS
        light: COLORS
    }
}

const MaxTemp: ClimateEntitiesI = {
    colors: {
        primary: COLORS.OrangePrimary,
        dark: COLORS.OrangeDark,
        light: COLORS.OrangeLight,
        medium: COLORS.OrangeMedium
    }
}

export { MaxTemp } 