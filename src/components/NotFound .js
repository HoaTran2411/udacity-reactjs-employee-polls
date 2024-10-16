import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <br></br>
            <br></br>
            <div className='row'>
                <Link to='/'><button type='button' className='btn'>Go back to Home</button></Link>
            </div>
        </div>
    )
}

export default NotFound;
