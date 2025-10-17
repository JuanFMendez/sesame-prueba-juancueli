//metodo para obtener un nombre y apellidos y capitalizarlos. Maximo de letras o ...
export function truncarYCapitalizarNombre(str: string, maxLength: number): string {
    
    if (!str) return ''

    const palabras = str.split(' ')
    const palabrasCapitalizadas: string[] = []

    palabras.forEach(palabra => {
        const primeraLetra = palabra.charAt(0).toUpperCase()
        const resto = palabra.slice(1).toLowerCase()
        palabrasCapitalizadas.push(primeraLetra + resto)
    })

    //separamos cada palabra del array de strings por un espacio
    const capitalizado = palabrasCapitalizadas.join(' ')

    //caracteres maximos y tres puntos o devolvemos texto completo
    return capitalizado.length > maxLength ? capitalizado.slice(0, maxLength) + '…' : capitalizado
}
