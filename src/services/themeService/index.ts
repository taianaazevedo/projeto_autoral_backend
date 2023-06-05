import themeRepository from "@/repositories/themeRepository.ts"

export async function getTheme(){
    const theme = await themeRepository.getTheme()
    return theme
}

const themeService = {
    getTheme,
}

export default themeService