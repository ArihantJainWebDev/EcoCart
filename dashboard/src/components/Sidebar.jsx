import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import '../styles/sidebar.css'

const Sidebar = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className="sidebar">
            <div className="sort-filter">

                <h2>🔧 Filters & Sorting</h2>
                <div className="filter-group">
                    <label>Sort By:</label>
                    <select name="sort" onChange={handleChange} value={filters.sort}>
                        <option value="">None</option>
                        <option value="ecoHigh">Eco Score ↑</option>
                        <option value="ecoLow">Eco Score ↓</option>
                        <option value="carbonLow">Carbon ↓</option>
                    </select>
                </div>

                {/* Chemical Filter */}
                <div className="filter-group">
                    <label>Chemicals:</label>
                    <select name="chemicals" onChange={handleChange}>
                        <option value="">All</option>
                        <option value="Mild">Mild</option>
                        <option value="Medium">Medium</option>
                        <option value="Harsh">Harsh</option>
                    </select>
                </div>

                {/* Platform Filter */}
                <div className="filter-group">
                    <label>Platform:</label>
                    <select name="platform" onChange={handleChange}>
                        <option value="">All</option>
                        <option value="Amazon">Amazon</option>
                        <option value="Flipkart">Flipkart</option>
                    </select>
                </div>
            </div>

            {/* Lottie */}
            <div className="lottie-box">
                <DotLottieReact
                    src="https://lottie.host/ae7c024f-7deb-40dd-b02a-bd11a69751b1/AuOngCpPig.lottie"
                    loop
                    autoplay
                    className='lottie-animation'
                />
            </div>
        </div>
    )
}

export default Sidebar