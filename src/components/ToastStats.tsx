// Not working yet
import Icon from './Icon';
import { Stats, ToastMode } from '../types/myTypes'

const ToastStats: React.FC<Stats> = ({ stats }: Stats) => {
    const { wpm, writtenwords, time, close, mode } = stats
    return (
        <>
            <div className="toast-container position-fixed end-0 p-3" style={{ bottom: '40px' }
            } >
                <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true" style={{ display: 'block' }}>
                    <div className={`toast-header ${mode}`}>
                        <Icon iconName="done" />
                        <strong className={`me-auto ms-2`}>{mode === 'denied' ? 'Sin resultados' : 'Resume'}</strong>
                        <button type="button" className="btn-close"
                            onClick={() => { if (close) close() }}
                            aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        <p><span className="fw-bold">WPM:</span> {wpm}</p>
                        <p><span className="fw-bold">Time:</span> {time}s</p>
                        <p><span className="fw-bold">Written words:</span> {writtenwords}</p>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ToastStats