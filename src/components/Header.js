
const Header = ({ handleDarkMode }) => {
    return (
        <div className="note-footer">
            <h1>Notes</h1>
            <button className="save toggle"
                onClick={() =>
                    handleDarkMode(
                        (previousMode) => !previousMode
                    )
                }
            > Toggle Mode</button>
        </div>
    )
}

export default Header;