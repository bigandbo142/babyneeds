import React from 'react';

function HomeHeader() {
    return (
        <div>
            <h2>Buy best stuffs</h2>
            <p>for your baby</p>
            <form>
                <input
                    type="search"
                    placeholder="What does your baby need..." />
                <button>Search</button>
            </form>
        </div>
    )
}

export default HomeHeader;