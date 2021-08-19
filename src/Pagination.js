import React from 'react'

function Pagination({ gotoNextPage, gotoPrePage }) {
    return (
        <div className="pagination">
            {gotoPrePage && <button onClick={gotoPrePage} >Pre</button>}
            {gotoNextPage && <button onClick={gotoNextPage} >next</button>}
        </div>
    )
}

export default Pagination
