import { prisma } from "@/config"

export async function getTheme(){
    return prisma.theme.findMany({})
}

const themeRepository = {
    getTheme,
}

export default themeRepository