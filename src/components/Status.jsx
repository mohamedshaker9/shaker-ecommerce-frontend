
function Status({text, icon:Icon, color, bg }) {
    return (
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${bg}`}>
            <Icon className={`w-4 h-4 ${color}`} />
            <span className={`text-sm font-medium ${color}`}>{text}</span>
        </div>
    )
}

export default Status;