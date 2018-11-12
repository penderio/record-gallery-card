import React from 'react'
import {css} from 'emotion'

const RecordTitle = ({children}) => (
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
                font-weight: 600;
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #000;
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