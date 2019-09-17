import React from 'react'
import PropTypes from 'prop-types'
import { css, cx } from 'emotion'
import CoverField from './CoverField'
import RecordTitle from './RecordTitle'
import calculateCardHeight from './utils/calculateCardHeight'

const defaultEmptyNameRenderer = ({ placeholder }) => (
    <RecordTitle variant={'empty'}>
        {placeholder}
    </RecordTitle>
)

class RecordGalleryCard extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        coverAttachments: PropTypes.arrayOf(
            PropTypes.string.isRequired
        ),
        coverFitTypeId: PropTypes.oneOf(['crop', 'fit']),
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
        fieldRenderer: PropTypes.func,
        emptyNameRenderer: PropTypes.func,
        emptyNamePlaceholder: PropTypes.string
    }

    static defaultProps = {
        visibleFieldOrder: [],
        coverHeight: 180,
        coverEnabled: false,
        coverFitTypeId: 'crop',
        emptyNamePlaceholder: 'Untitled'
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
            emptyNamePlaceholder,
            onClick
        } = this.props

        const emptyNameRenderer = this.props.emptyNameRenderer || defaultEmptyNameRenderer

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
                        box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 2px 0px;;
                    `,
                    onClick ? css`
                    &:hover {
                        box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 2px 0px;
                    }
                    &:active {
                        box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 2px 0px;;
                    }
                    ` : null
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
                {name ? (
                    <RecordTitle>
                        {name}
                    </RecordTitle>
                ) : emptyNameRenderer({
                    placeholder: emptyNamePlaceholder
                })}
                {fields.map((field, index) => {

                    const height = fieldHeightGetter({ field })

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
                                className={css`
                                    font-size: 13px;
                                    display: flex;
                                    align-items: center;
                                `}
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

RecordGalleryCard.calculateCardHeight = calculateCardHeight

export default RecordGalleryCard