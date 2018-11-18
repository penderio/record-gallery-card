import React from 'react'
import PropTypes from 'prop-types'
import {css, cx} from 'emotion'
import CoverField from './CoverField'
import RecordTitle from './RecordTitle'

const PRIMARY_FIELD_HEIGHT = 32
const FIELD_WRAP_HEIGHT = 31 // spacing around a field
const CARD_BOTTOM_PADDING = 10

const THUMBNAIL_SHAPE = PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    url: PropTypes.string.isRequired
})

export default class RecordGalleryCard extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        coverAttachments: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                filename: PropTypes.string.isRequired,
                size: PropTypes.number,
                type: PropTypes.oneOf([
                    'image/jpeg',
                    'image/jpg',
                    'image/png',
                    'image/gif',
                    'audio/mpeg',
                    'video/mp4',
                    'video/ogg'
                ]).isRequired,
                thumbnails: PropTypes.shape({
                    small: THUMBNAIL_SHAPE,
                    medium: THUMBNAIL_SHAPE,
                    large: THUMBNAIL_SHAPE,
                })
            })
        ),
        coverFitTypeId: PropTypes.oneOf(['cover', 'fit']),
        coverEnabled: PropTypes.bool,
        coverHeight: PropTypes.number,
        fields: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            })
        ),
        visibleFieldOrder: PropTypes.arrayOf(
            PropTypes.string.isRequired
        ),
        fieldHeightGetter: PropTypes.func,
        fieldRenderer: PropTypes.func
    }

    static defaultProps = {
        visibleFieldOrder: [],
        coverHeight: 180,
        coverEnabled: false,
        coverFitTypeId: 'cover'
    }

    render() {

        const {
            id,
            name,
            fieldRenderer,
            fieldHeightGetter,
            coverAttachments,
            coverEnabled,
            coverFitTypeId,
            coverHeight,
            visibleFieldOrder,
            onClick
        } = this.props

        const fieldsById = this.props.fields.reduce((result, field) => {
            result[field.id] = field
            return result
        }, {})

        const fields = visibleFieldOrder.map(id => {
            return fieldsById[id]
        })

        return (
            <div
                className={cx(
                    css`
                        background-color: #fff;
                        user-select: none;
                        width: 100%;
                        cursor: pointer;
                        border-radius: 6px;
                        overflow: hidden;
                        padding-bottom: 10px;
                        box-shadow: 0 0 0 1px rgba(114,121,133,.3);
                    `,
                    onClick ? css`
                    &:hover {
                        box-shadow: 0 0 0 1px rgba(114,121,133,.5);
                    }` : null
                )}
                onClick={e => {

                    if (onClick) {
                        onClick({
                            e,
                            id
                        })
                    }
                }}
            >
                {coverEnabled ? (
                    <CoverField
                        coverFitTypeId={coverFitTypeId}
                        attachments={coverAttachments}
                        height={coverHeight}
                    />
                ) : null}
                <RecordTitle>
                    {name}
                </RecordTitle>
                {fields.map((field, index) => {

                    const height = fieldHeightGetter({field})

                    return (
                        <div
                            key={field.id}
                            className={css`
                                padding-left: 16px;
                                padding-right: 16px;
                                padding-top: 8px;
                                padding-bottom: 4px;
                            `}
                        >
                            <div
                                className={css`
                                    margin-bottom: 4px;
                                    display: flex;
                                    align-items: center;
                                    color: #000;
                                `}
                            >
                                <div
                                    className={css`
                                        flex: 1 1 auto;
                                        min-width: 0;
                                        min-height: 0;
                                        font-weight: 600;
                                        max-width: 100%;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        font-size: 12px;
                                    `}
                                >
                                    {field.name}
                                </div>
                            </div>
                            <div
                                style={{
                                    height
                                }}
                            >
                                {fieldRenderer({
                                    id,
                                    field,
                                    index,
                                    props: {
                                        id: field.id,
                                        contextId: 'recordGalleryCard',
                                        roleId: 'readOnly'
                                    }
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}