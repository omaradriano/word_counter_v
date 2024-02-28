import { MutableRefObject, useEffect, useRef, useState } from "react";
// import Stats from './Stats';
import Icon from './Icon';
import ToastStats from "./ToastStats";
import { Stats } from '../types/myTypes'

const Wordcounter: React.FC = () => {

    /**
     * Calculo del tiempo transcurrido en la sesion de escritura
     */
    const timerCounter = useRef<any>(null);
    const [timer, setTimer] = useState<number>(0)
    const trackSeconds = useRef<number>(0)

    const trackTimeout = useRef<any>(null);     //ref to track the typingtimeout

    /**
     * @abstract Controla las palabras que hay dentro del textarea como array de texto
     */
    const [words, setWords] = useState<string[]>([])
    /**
     * @abstract Almacena el array de la sesion
     */
    let sessionArray = useRef<string[]>([])

    /**
     * @abstract Almacena un objeto con las estadisticas de la sesion
     */
    const [stats, setStats] = useState<Stats>() //Guardar las estadisticas

    // State que mantiene la actividad del toast
    const [activeToast, setActiveToast] = useState<boolean>(true)

    /**
     * @abstract Contador que se usa para calcular el tiempo de la sesion
     */
    function startTyping() {
        if (!timerCounter.current) {
            timerCounter.current = setInterval(() => {
                trackSeconds.current = Number((trackSeconds.current + 0.1).toFixed(2))
                setTimer((timer: number) => {
                    return Number((timer + 0.1).toFixed(2))
                })
            }, 100)
        }
        console.log('Typing');
    }

    /**
     * @abstract Cambia el estado del toast a false, por lo que funciona para cerrarlo. 
     */
    function closeToast() {
        setActiveToast(false)
    }

    /**
     * @returns Devuelve un arreglo de palabras escritas en el textarea
     */
    function getArrayOfWords(words: string) {
        let wordsarray = words.trim().split(" ").filter((elem => {
            if (elem !== " ") return elem
        }))
        return wordsarray
    }

    /**
     * @returns Devuelve la diferencia exacta entre dos array
     */
    function getArrayDifference(oldArray: string[] = [], newArray: string[]) {
        return newArray.slice(oldArray.length)
    }

    /**
     * @returns Devuelve las palabras por minuto
     */
    function getWPM(arrayDifference: string[], time: number, timeDifference: number) {
        // console.log(`wpm
        //             arraydif: ${arrayDifference}
        //             time: ${Number(time.toFixed(2)) - timeDifference}
        //             time diff: ${timeDifference}`);
        return parseFloat((arrayDifference.length / ((Number(time.toFixed(2)) - timeDifference) / (60))).toFixed(2))
    }

    /**
     * 1. Elimina el typingTimeoutRef e inicia otro para activar stopped typing
     * 2. Actualiza el estado de ~words~ para aumentar el contador de las palabras escritas
     * 3. detiene el setInterval que calcula los segundos que se ha escrito
    */
    async function stopTyping(e: any) {
        const target = e.target as HTMLInputElement
        if (trackTimeout.current) clearTimeout(trackTimeout.current)
        if (target) {
            setWords((prev: string[]) => {
                prev = getArrayOfWords(target.value)
                //Se debe de guardar todo el array de palabras en cada momento
                trackTimeout.current = setTimeout(() => {
                    try {
                        // Dan fin a la sesion y limpian los contadores
                        clearInterval(timerCounter.current) //Detiene el contador de tiempo
                        timerCounter.current = null //Establece el contador de tiempo en null para que pueda volver a iniciar
                        // console.log(trackSeconds.current);

                        if (!sessionArray.current) sessionArray.current = prev
                        let wordsDiff = getArrayDifference(sessionArray.current, prev)
                        sessionArray.current = prev
                        // console.log('Temp words or actual in case if it is the first: ', wordsDiff);

                        let wordsperminute = getWPM(wordsDiff, trackSeconds.current, 2)
                        if (wordsperminute === Infinity) throw new Error('Fallo en el calculo.')
                        if (wordsperminute >= 300) throw new Error('Fallo en el calculo.')
                        if (prev.length === 0) throw new Error('No hay palabras para calcular')
                        if (trackSeconds.current === 0) throw new Error('Sin suficiente tiempo para calcular')
                        if (wordsDiff.length === 0) throw new Error('No se han escrito palabras')
                        // console.log('wpm: ', wordsperminute);
                        let finalData: Stats = {
                            stats: {
                                time: Number((trackSeconds.current - 2).toFixed(2)),
                                wpm: wordsperminute,
                                writtenwords: wordsDiff.length,
                                mode: "succesful",
                                close: closeToast
                            }
                        }
                        setStats(finalData)

                        // Muestra el fin de la sesion
                        // console.log('Final Words ', prev);
                        console.log('Stopped typing :(');

                        setTimer(0)
                        trackSeconds.current = 0
                    } catch (error) {
                        console.log(error);
                        let finalData: Stats = {
                            stats: {
                                time: Number((trackSeconds.current - 2).toFixed(2)),
                                wpm: 0,
                                writtenwords: 0,
                                mode: "denied",
                                close: closeToast
                            }
                        }
                        setStats(finalData)
                        setTimer(0)
                        trackSeconds.current = 0
                    } finally {
                        setActiveToast(true)
                    }
                }, 2000);
                return prev
            })
        };
    }

    return (
        <>
            <div className="container-fluid d-flex flex-column align-items-center dark-mode pt-3" style={{ height: 'calc(100vh - 65px)' }}>
                <h3 className="text-light">Word counter</h3>
                <textarea
                    placeholder="Ingresa un texto..."
                    className="mb-3 wordCounter"
                    name="words"
                    id="words"
                    onKeyDown={startTyping}
                    onKeyUp={stopTyping}
                    autoFocus
                />
                {/* <p className="text-light">Contador: {String(words).length === 0 ? `${words} palabra` : `${words} palabras`}</p> */}
                <div className="stats">
                    <p className="text-light">Palabras totales: {words.length}</p>
                    <p className="text-light">Timer: {timer}</p>
                </div>
                <button className="btn btn-success" onClick={() => {
                    try {
                        let textarea = document.getElementById('words') as HTMLTextAreaElement
                        if (textarea) {
                            textarea.value = ''
                            sessionArray.current = []
                            console.log('Contenido del textarea borrado');
                        } else {
                            throw new Error('No existe un text area')
                        }
                    } catch (error: any) {
                        console.log(error);
                    }
                }}>Limpiar texto</button>
            </div >

            {
                activeToast && stats ?
                    <ToastStats
                        stats={stats.stats}
                    /> : null
            }
        </>
    )
}

export default Wordcounter