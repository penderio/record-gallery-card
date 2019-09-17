import React from 'react'
import { css } from 'emotion'

const RecordTitle = ({ variant, children }) => (
    <div
        className={css`
            display: flex;
            align-items: center;
            margin-top: 8px;
            padding-left: 16px;
            padding-right: 16px;
            font-size: 16px;
        `}
    >
        <div
            className={css`
                ${variant !== 'empty' ? 'font-weight: 600;' : ''}
                ${variant === 'empty' ? 'font-style: italic;' : ''}
                ${variant === 'empty' ? 'color: rgba(0,0,0,0.75);' : 'color: #000;'}
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                flex: 1 1 auto;
                min-width: 0;
                min-height: 0;
                line-height: 1.5;
            `}
        >
            {children}
        </div>
    </div>
)

export default RecordTitle