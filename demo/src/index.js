import React, {Component} from 'react'
import {render} from 'react-dom'
import sample from 'lodash/sample'
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

const generateAttachment = (i) => {

    const cat = sample(['wanderlust', 'water', 'canada', 'mountain', 'beach'])

    return {
        id: `att${i}`,
        type: 'image/jpeg',
        filename: `${cat} ${i}`,
        thumbnails: {
            small: {
                url: `https://source.unsplash.com/random/400x360?${cat}`
            },
            medium: {
                url: `https://source.unsplash.com/random/400x360?${cat}`
            },
            large: {
                url: `https://source.unsplash.com/random/400x360?${cat}`
            },
        },
        url: `https://source.unsplash.com/random/400x360?${cat}`
    }
}

const COVER_FIELD_VALUE = [
    generateAttachment(1),
    generateAttachment(2),
    generateAttachment(3),
    generateAttachment(4),
    generateAttachment(5),
]

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
                    <RecordGalleryCard
                        primaryFieldId={'fld1'}
                        coverFitTypeId={'cover'}
                        coverFieldId={null}
                        fields={[{
                            id: 'fld1',
                            name: 'Name',
                            typeId: 'singleLineText'
                        }, {
                            id: 'fld2',
                            name: 'Attachments',
                            typeId: 'attachment'
                        }]}
                        valueGetter={({fieldId}) => {

                            const cells = {
                                fld1: 'Luke Skywalker',
                                fld2: COVER_FIELD_VALUE
                            }

                            return cells[fieldId]
                        }}

                    />
                </div>
            </Viewport>
            <h3>
                Cover field with no attachments
            </h3>
            <Viewport>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard
                        coverFitTypeId={'cover'}
                        coverFieldId={'fld2'}
                        primaryFieldId={'fld1'}
                        fields={[{
                            id: 'fld1',
                            name: 'Name',
                            typeId: 'singleLineText'
                        }, {
                            id: 'fld2',
                            name: 'Attachments',
                            typeId: 'attachment'
                        }]}
                        valueGetter={({fieldId}) => {

                            const cells = {
                                fld1: 'Luke Skywalker',
                                fld2: null
                            }

                            return cells[fieldId]
                        }}
                    />
                </div>
            </Viewport>
            <h3>
                Cover field with one attachment
            </h3>
            <Viewport>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard
                        coverFitTypeId={'cover'}
                        coverFieldId={'fld2'}
                        primaryFieldId={'fld1'}
                        fields={[{
                            id: 'fld1',
                            name: 'Name',
                            typeId: 'singleLineText'
                        }, {
                            id: 'fld2',
                            name: 'Attachments',
                            typeId: 'attachment'
                        }]}
                        valueGetter={({fieldId}) => {

                            const cells = {
                                fld1: 'Luke Skywalker',
                                fld2: [
                                    generateAttachment(1)
                                ]
                            }

                            return cells[fieldId]
                        }}
                    />
                </div>
            </Viewport>
            <h3>
                Cover field with coverFitTypeId set to fit
            </h3>
            <Viewport>
                <div
                    className={css`
                        width: 240px;
                    `}
                >
                    <RecordGalleryCard
                        coverFitTypeId={'fit'}
                        coverFieldId={'fld2'}
                        primaryFieldId={'fld1'}
                        fields={[{
                            id: 'fld1',
                            name: 'Name',
                            typeId: 'singleLineText'
                        }, {
                            id: 'fld2',
                            name: 'Attachments',
                            typeId: 'attachment'
                        }]}
                        valueGetter={({fieldId}) => {

                            const cells = {
                                fld1: 'Luke Skywalker',
                                fld2: [
                                    generateAttachment(1)
                                ]
                            }

                            return cells[fieldId]
                        }}
                    />
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
                        coverFitTypeId={'cover'}
                        coverFieldId={'fld2'}
                        primaryFieldId={'fld1'}
                        fields={[{
                            id: 'fld1',
                            name: 'Name',
                            typeId: 'singleLineText'
                        }, {
                            id: 'fld2',
                            name: 'Attachments',
                            typeId: 'attachment'
                        }]}
                        valueGetter={({fieldId}) => {

                            const cells = {
                                fld1: 'Luke Skywalker',
                                fld2: COVER_FIELD_VALUE
                            }

                            return cells[fieldId]
                        }}
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
                        coverFitTypeId={'cover'}
                        coverFieldId={'fld10'}
                        primaryFieldId={'fld1'}
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
                                numberFormatId: 'decimal',
                                allowNegativeNumbers: false,
                                precisionId: '2'
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
                                coloredOptions: true,
                                optionOrder: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6'],
                                options: {
                                    'opt1': {
                                        id: 'opt1',
                                        colorId: 'blue.base',
                                        name: 'Blue'
                                    },
                                    'opt2': {
                                        id: 'opt2',
                                        colorId: 'green.base',
                                        name: 'Green'
                                    },
                                    'opt3': {
                                        id: 'opt3',
                                        colorId: 'red.base',
                                        name: 'Red'
                                    },
                                    'opt4': {
                                        id: 'opt4',
                                        colorId: 'yellow.base',
                                        name: 'Yellow'
                                    },
                                    'opt5': {
                                        id: 'opt5',
                                        colorId: 'indigo.base',
                                        name: 'Indigo'
                                    },
                                    'opt6': {
                                        id: 'opt6',
                                        colorId: 'purple.base',
                                        name: 'Purple'
                                    }
                                }
                            }
                        }, {
                            id: 'fld7',
                            name: 'Color',
                            typeId: 'singleSelect',
                            options: {
                                coloredOptions: true,
                                optionOrder: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6'],
                                options: {
                                    'opt1': {
                                        id: 'opt1',
                                        colorId: 'blue.base',
                                        name: 'Blue'
                                    },
                                    'opt2': {
                                        id: 'opt2',
                                        colorId: 'green.base',
                                        name: 'Green'
                                    },
                                    'opt3': {
                                        id: 'opt3',
                                        colorId: 'red.base',
                                        name: 'Red'
                                    },
                                    'opt4': {
                                        id: 'opt4',
                                        colorId: 'yellow.base',
                                        name: 'Yellow'
                                    },
                                    'opt5': {
                                        id: 'opt5',
                                        colorId: 'indigo.base',
                                        name: 'Indigo'
                                    },
                                    'opt6': {
                                        id: 'opt6',
                                        colorId: 'purple.base',
                                        name: 'Purple'
                                    }
                                }
                            }
                        }, {
                            id: 'fld8',
                            name: 'Notes',
                            typeId: 'longText'
                        }, {
                            id: 'fld9',
                            name: 'Description',
                            typeId: 'singleLineText'
                        }, {
                            id: 'fld10',
                            name: 'Attachments',
                            typeId: 'attachment'
                        }]}
                        fieldVisibility={['fld1', 'fld2', 'fld3', 'fld4', 'fld5', 'fld6', 'fld7', 'fld8', 'fld9', 'fld10']}
                        valueGetter={({fieldId}) => {

                            const cells = {
                                'fld1': 'Luke Skywalker',
                                'fld2': true,
                                'fld3': [{
                                    id: 'att1',
                                    type: 'video/ogg',
                                    filename: 'Video',
                                    thumbnails: null,
                                    url: 'https://www.w3schools.com/html/mov_bbb.ogg'
                                }, {
                                    id: 'att2',
                                    type: 'audio/mpeg',
                                    filename: 'Audio',
                                    thumbnails: null,
                                    url: 'https://dl.airtable.com/AILblIU3RJfJTtudwUE8_%E0%B8%97%E0%B8%B8%E0%B8%81%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%A0%E0%B8%97'
                                }, generateAttachment(3), {
                                    id: 'att4',
                                    type: 'image/gif',
                                    filename: 'GIF',
                                    thumbnails: {
                                        small: {
                                            url: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif'
                                        },
                                        medium: {
                                            url: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif'
                                        },
                                        large: {
                                            url: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif'
                                        },
                                    },
                                    url: 'https://media.giphy.com/media/1wqqlaQ7IX3TXibXZE/giphy.gif'
                                }],
                                'fld4': 32.25,
                                'fld5': [{
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
                                }],
                                'fld6': ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6'],
                                'fld7': 'opt5',
                                'fld8': `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
                                'fld9': 'Greatest Jedi the galaxy has ever known.',
                                'fld10': COVER_FIELD_VALUE
                            }

                            return cells[fieldId]
                        }}
                    />
                </div>
            </Viewport>
        </div>
    }
}

render(<Demo/>, document.querySelector('#demo'))
