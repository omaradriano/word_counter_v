// Se usa en las props del toast
export interface Stats {
    stats: {
        time: number
        writtenwords: number,
        wpm: number
        close?: ()=>void,
        mode?: ToastMode
    }
}

// No se usa. Sirve para modificar la clase del toast para saber si es una prueba satifactoria o denegada
export type ToastMode = 'succesful' | 'denied'