import React, {Component} from 'react'
import {render} from 'react-dom'
import {css, injectGlobal} from 'emotion'

import RecordGalleryCard from '../../src'

injectGlobal`
    * {
        box-sizing: border-box;
    }
    body {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    }
`

const log = (name) => (args) => {
    alert(`
name: ${name}
see logs for more info
    `)
    console.log({
        name,
        args
    })
}

class Viewport extends React.Component {

    render() {

        return (
            <div
                className={css`
                    background-color: #e9ebee;
                    padding: 20px;
                `}
            >
                {this.props.children}
            </div>
        )
    }
}

class Demo extends Component {
    render() {
        return <div>
            <h1>RecordGalleryCard Demo</h1>
            <h3>
                No fields & no cover field
            </h3>
            <Viewport>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard/>
                </div>
            </Viewport>
            <h3>
                Cover field & no fields
            </h3>
            <Viewport>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard
                        enableCoverField={true}
                    />
                </div>
            </Viewport>
            <h3>
                All fields
            </h3>
            <Viewport>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard
                        enableCoverField={true}
                        title={'Spock Must Die!'}
                        fields={[{
                            id: 'fld1',
                            name: 'Name',
                            typeId: 'singleLineText',
                            options: {
                                defaultValue: null
                            }
                        }, {
                            id: 'fld2',
                            name: 'Published',
                            typeId: 'checkbox'
                        }, {
                            id: 'fld3',
                            name: 'Attachments',
                            typeId: 'attachment'
                        }, {
                            id: 'fld4',
                            name: 'Revenue',
                            typeId: 'number',
                            options: {
                                numberFormat: 'decimal',
                                allowNegativeNumbers: false,
                                precision: 2
                            }
                        }, {
                            id: 'fld5',
                            name: 'Squad',
                            typeId: 'linkToAnotherRecord'
                        }, {
                            id: 'fld6',
                            name: 'Colors',
                            typeId: 'multipleSelect',
                            options: {
                                options: [{
                                    id: 'opt1',
                                    colorId: 'blue.base',
                                    name: 'Blue'
                                }, {
                                    id: 'opt2',
                                    colorId: 'green.base',
                                    name: 'Green'
                                }, {
                                    id: 'opt3',
                                    colorId: 'red.base',
                                    name: 'Red'
                                }, {
                                    id: 'opt4',
                                    colorId: 'yellow.base',
                                    name: 'Yellow'
                                }, {
                                    id: 'opt5',
                                    colorId: 'indigo.base',
                                    name: 'Indigo'
                                }, {
                                    id: 'opt6',
                                    colorId: 'purple.base',
                                    name: 'Purple'
                                }]
                            }
                        }]}
                        getValue={({fieldId}) => {
                            const values = {
                                'fld1': {
                                    text: 'Luke Skywalker'
                                },
                                'fld2': {
                                    checked: true
                                },
                                'fld3': {
                                    attachments: [{
                                        id: '1',
                                        mimeType: 'video/ogg',
                                        filename: 'Video',
                                        thumbnails: null,
                                        url: 'https://www.w3schools.com/html/mov_bbb.ogg'
                                    }, {
                                        id: '2',
                                        mimeType: 'audio/mpeg',
                                        filename: 'Audio',
                                        thumbnails: null,
                                        url: 'https://dl.airtable.com/AILblIU3RJfJTtudwUE8_%E0%B8%97%E0%B8%B8%E0%B8%81%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%A0%E0%B8%97'
                                    }, {
                                        id: '3',
                                        mimeType: 'image/jpeg',
                                        filename: `Image`,
                                        thumbnails: {
                                            small: 'https://placekitten.com/200/300',
                                            medium: 'https://placekitten.com/200/300',
                                            large: 'https://placekitten.com/200/300',
                                        },
                                        url: 'https://placekitten.com/200/300'
                                    }, {
                                        id: '4',
                                        mimeType: 'image/gif',
                                        filename: 'GIF',
                                        thumbnails: {
                                            small: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif',
                                            medium: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif',
                                            large: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif',
                                        },
                                        url: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif'
                                    }]
                                },
                                'fld4': {
                                    number: 32.25
                                },
                                'fld5': {
                                    records: [{
                                        id: 'rec1',
                                        name: 'Luke Skywalker'
                                    }, {
                                        id: 'rec2',
                                        name: 'Leia Organa'
                                    }, {
                                        id: 'rec3',
                                        name: 'Han Solo'
                                    }, {
                                        id: 'rec4',
                                        name: 'Jar Jar Binks'
                                    }]
                                },
                                'fld6': {
                                    optionIds: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6']
                                }
                            }
                            return values[fieldId]
                        }}
                    />
                </div>
            </Viewport>
        </div>
    }
}

render(<Demo/>, document.querySelector('#demo'))
