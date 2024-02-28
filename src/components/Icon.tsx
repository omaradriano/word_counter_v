import React from "react"

type MaterialIcons = 'material-icons'

interface IconComponent {
    iconName: string
    readonly className?: MaterialIcons
    customIconClassName?: string
}

const Icon: React.FC<IconComponent> = ({iconName, className = 'material-icons', customIconClassName=''}) => {
    let style = `${className} ${customIconClassName}`
    return(
        <span className={style}>{iconName}</span>
    )    
}

export default Icon