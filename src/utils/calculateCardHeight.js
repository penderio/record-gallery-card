import sum from 'lodash/sum'

const PRIMARY_FIELD_HEIGHT = 32
const FIELD_WRAP_HEIGHT = 31 // spacing around a field
const CARD_BOTTOM_PADDING = 10
const COVER_HEIGHT = 180

export default ({fields, visibleFieldOrder, fieldHeightGetter, coverHeight, coverEnabled}) => {

    const fieldsById = fields.reduce((result, field) => {
        result[field.id] = field
        return result
    }, {})

    const fieldHeights = visibleFieldOrder.map(id => {
        const field = fieldsById[id]
        if (!field) throw new Error(`Field with id ${id} not found`)
        return fieldHeightGetter({field}) + FIELD_WRAP_HEIGHT
    })

    return sum([
        coverEnabled ? (coverHeight || COVER_HEIGHT) : 0,
        PRIMARY_FIELD_HEIGHT,
        ...fieldHeights,
        CARD_BOTTOM_PADDING
    ])
}