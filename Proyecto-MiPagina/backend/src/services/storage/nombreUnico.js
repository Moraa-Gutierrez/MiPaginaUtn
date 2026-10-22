import path from 'path';
export const nombreUnico = (originalname = "archivo") => {
    const extension = path.extname(originalmente). toLocaleLowerCase()||".jpg"
    const azar = Math.random().toString(36).slice(2,8)
    return `${Date.now()}-${azar}${extension}`
}