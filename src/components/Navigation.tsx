import Icon from './Icon';

const Navigation = () => {
    return (
        <>
            <nav className="navbar bg-body-tertiary dark-component">
                <div className="container-fluid d-flex flex-row align-items-center justify-content-end">
                    <a className="navbar-brand d-flex align-items-center justify-content-center">
                        <Icon iconName='mail'></Icon>
                    </a>
                    <h5 className='text-light mb-0'>Word counter</h5>
                </div>
            </nav>
        </>
    )
}

export default Navigation